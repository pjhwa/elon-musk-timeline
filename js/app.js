(function () {
  "use strict";

  const I = window.MuskI18n;
  const events = window.TIMELINE_EVENTS || [];

  const state = {
    lang: I ? I.getLang() : "ko",
    era: "all",
    category: "all",
    priority: "P0P1",
    selectedId: null,
    filtered: [],
  };

  // URL era/cat preselect (era deep-link)
  (function applyQuery() {
    const p = new URLSearchParams(location.search);
    if (p.get("era") && p.get("era") !== "all") state.era = p.get("era");
    if (p.get("cat") && p.get("cat") !== "all") state.category = p.get("cat");
    if (p.get("priority") === "P0" || p.get("priority") === "P0P1") state.priority = p.get("priority");
  })();

  const els = {
    timeline: document.getElementById("timeline"),
    count: document.getElementById("result-count"),
    drawer: document.getElementById("drawer"),
    overlay: document.getElementById("drawer-overlay"),
    drawerBody: document.getElementById("drawer-body"),
    drawerTitle: document.getElementById("drawer-title"),
    methodBox: document.getElementById("method-box"),
    statTotal: document.getElementById("stat-total"),
    statP0: document.getElementById("stat-p0"),
    statSpan: document.getElementById("stat-span"),
    spine: document.getElementById("spine-text"),
    verified: document.getElementById("last-verified"),
  };

  function catClass(cat) {
    return "cat-" + cat;
  }

  function matchesFilters(e) {
    if (state.priority === "P0" && e.priority !== "P0") return false;
    if (state.era !== "all" && e.era !== state.era) return false;
    if (state.category !== "all" && e.category !== state.category) return false;
    return true;
  }

  function getFiltered() {
    return events.filter(matchesFilters).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return String(a.date).localeCompare(String(b.date));
    });
  }

  function applyStaticI18n() {
    const lang = state.lang;
    document.documentElement.lang = lang === "en" ? "en" : "ko";
    document.title =
      lang === "en"
        ? "Elon Musk Life Timeline · Interactive Infographic"
        : "일론 머스크 일대기 · Interactive Timeline";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const val = I.t(lang, key);
      if (val == null) return;
      if (node.dataset.i18nHtml === "1") node.innerHTML = val;
      else node.textContent = val;
    });

    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      const key = node.getAttribute("data-i18n-title");
      const val = I.t(lang, key);
      if (val != null) node.setAttribute("title", val);
    });

    const m = I.meta(lang);
    if (els.spine) els.spine.textContent = m.spine || "";
    if (els.verified) els.verified.textContent = m.lastVerified || (window.TIMELINE_META || {}).lastVerified || "";

    // filter chip active states from state
    document.querySelectorAll("[data-era]").forEach((b) => {
      b.classList.toggle("active", b.dataset.era === state.era);
    });
    document.querySelectorAll("[data-cat]").forEach((b) => {
      b.classList.toggle("active", b.dataset.cat === state.category);
    });
    document.querySelectorAll("[data-priority]").forEach((b) => {
      b.classList.toggle("active", b.dataset.priority === state.priority);
    });

    const langBtn = document.getElementById("btn-lang");
    if (langBtn) {
      langBtn.textContent = I.t(lang, "langBtn");
      langBtn.title = I.t(lang, "langBtnTitle");
    }
  }

  function renderStats() {
    const p0 = events.filter((e) => e.priority === "P0").length;
    const years = events.map((e) => e.year);
    if (els.statTotal) els.statTotal.textContent = String(events.length);
    if (els.statP0) els.statP0.textContent = String(p0);
    if (els.statSpan) els.statSpan.textContent = `${Math.min(...years)}–${Math.max(...years)}`;
  }

  function renderTimeline() {
    const filtered = getFiltered();
    state.filtered = filtered;
    if (!els.timeline) return;

    els.timeline.innerHTML = "";
    const showing = I.t(state.lang, "showing");
    if (els.count) els.count.textContent = typeof showing === "function" ? showing(filtered.length) : `${filtered.length}`;

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = I.t(state.lang, "empty");
      els.timeline.appendChild(empty);
      return;
    }

    let lastEra = null;
    let side = 0;

    filtered.forEach((ev, index) => {
      if (ev.era !== lastEra) {
        lastEra = ev.era;
        const banner = document.createElement("li");
        banner.className = "era-banner";
        banner.setAttribute("aria-hidden", "true");
        const span = document.createElement("span");
        span.textContent = I.eraLabel(state.lang, ev.era);
        banner.appendChild(span);
        els.timeline.appendChild(banner);
        side = 0;
      }

      const L = I.localizeEvent(ev, state.lang);
      const li = document.createElement("li");
      li.className = `event-item ${side % 2 === 0 ? "left" : "right"}`;
      li.dataset.id = ev.id;
      side += 1;

      const colorClass = catClass(ev.category);
      const dot = document.createElement("span");
      dot.className = `dot ${colorClass}`;
      dot.setAttribute("aria-hidden", "true");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `card ${colorClass}`;
      btn.setAttribute("aria-expanded", state.selectedId === ev.id ? "true" : "false");
      btn.dataset.id = ev.id;
      if (state.selectedId === ev.id) btn.classList.add("selected");

      const metaRow = document.createElement("div");
      metaRow.className = "card-meta";

      const year = document.createElement("span");
      year.className = "year";
      year.textContent = ev.date;

      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = I.catLabel(state.lang, ev.category);

      const pri = document.createElement("span");
      pri.className = "pill";
      pri.textContent = ev.priority;

      metaRow.append(year, pill, pri);

      const h3 = document.createElement("h3");
      h3.textContent = L.title;
      if (L.caution) {
        const c = document.createElement("span");
        c.className = "caution-dot";
        c.title = I.t(state.lang, "caution");
        h3.appendChild(c);
      }

      const p = document.createElement("p");
      p.textContent = L.summary;

      btn.append(metaRow, h3, p);
      btn.addEventListener("click", () => openDrawer(ev.id));

      li.append(dot, btn);
      els.timeline.appendChild(li);

      if (index === filtered.length - 1) {
        const clear = document.createElement("div");
        clear.className = "clearfix";
        els.timeline.appendChild(clear);
      }
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openDrawer(id) {
    const ev = events.find((e) => e.id === id);
    if (!ev || !els.drawer) return;

    state.selectedId = id;
    const url = new URL(location.href);
    url.searchParams.set("id", id);
    url.searchParams.set("lang", state.lang);
    history.replaceState(null, "", url.toString());

    const L = I.localizeEvent(ev, state.lang);
    els.drawerTitle.textContent = L.title;

    const sourcesHtml = (ev.sources || [])
      .map(
        (s) => `
      <li>
        <span class="tier-badge tier-${s.tier.toLowerCase()}">Tier ${s.tier}</span>
        <a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)}</a>
      </li>`
      )
      .join("");

    const cautionHtml = L.caution
      ? `<div class="caution-box"><strong>${escapeHtml(I.t(state.lang, "caution"))}</strong>${escapeHtml(L.caution)}</div>`
      : "";

    const idx = state.filtered.findIndex((e) => e.id === id);
    const hasPrev = idx > 0;
    const hasNext = idx >= 0 && idx < state.filtered.length - 1;

    els.drawerBody.innerHTML = `
      <p class="drawer-date">${escapeHtml(ev.date)}</p>
      <div class="drawer-pills">
        <span class="pill">${escapeHtml(I.catLabel(state.lang, ev.category))}</span>
        <span class="pill">${escapeHtml(I.eraLabel(state.lang, ev.era))}</span>
        <span class="pill">${escapeHtml(ev.priority)}</span>
      </div>
      <p class="drawer-summary">${escapeHtml(L.summary)}</p>
      <p class="drawer-detail">${escapeHtml(L.detail)}</p>
      ${cautionHtml}
      <h3 class="sources-title">${escapeHtml(I.t(state.lang, "sources"))}</h3>
      <ul class="source-list">${sourcesHtml}</ul>
      <div class="drawer-nav">
        <button type="button" class="btn" id="nav-prev" ${hasPrev ? "" : "disabled"}>${I.t(state.lang, "prev")}</button>
        <button type="button" class="btn" id="nav-next" ${hasNext ? "" : "disabled"}>${I.t(state.lang, "next")}</button>
      </div>
    `;

    const prevBtn = document.getElementById("nav-prev");
    const nextBtn = document.getElementById("nav-next");
    if (prevBtn && hasPrev) prevBtn.addEventListener("click", () => openDrawer(state.filtered[idx - 1].id));
    if (nextBtn && hasNext) nextBtn.addEventListener("click", () => openDrawer(state.filtered[idx + 1].id));

    els.drawer.classList.add("open");
    els.overlay.classList.add("open");
    els.drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    document.querySelectorAll(".card").forEach((c) => {
      const on = c.dataset.id === id;
      c.classList.toggle("selected", on);
      c.setAttribute("aria-expanded", on ? "true" : "false");
    });
  }

  function closeDrawer() {
    state.selectedId = null;
    els.drawer.classList.remove("open");
    els.overlay.classList.remove("open");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.querySelectorAll(".card.selected").forEach((c) => {
      c.classList.remove("selected");
      c.setAttribute("aria-expanded", "false");
    });
    const url = new URL(location.href);
    url.searchParams.delete("id");
    history.replaceState(null, "", url.toString());
  }

  function syncQueryFilters() {
    const url = new URL(location.href);
    if (state.era === "all") url.searchParams.delete("era");
    else url.searchParams.set("era", state.era);
    if (state.category === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", state.category);
    url.searchParams.set("lang", state.lang);
    url.searchParams.set("priority", state.priority);
    history.replaceState(null, "", url.toString());
  }

  function bindFilters() {
    document.querySelectorAll("[data-era]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.era = btn.dataset.era;
        document.querySelectorAll("[data-era]").forEach((b) => b.classList.toggle("active", b === btn));
        syncQueryFilters();
        renderTimeline();
      });
    });

    document.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.cat;
        document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("active", b === btn));
        syncQueryFilters();
        renderTimeline();
      });
    });

    document.querySelectorAll("[data-priority]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.priority = btn.dataset.priority;
        document.querySelectorAll("[data-priority]").forEach((b) => b.classList.toggle("active", b === btn));
        syncQueryFilters();
        renderTimeline();
      });
    });

    const methodBtn = document.getElementById("btn-method");
    if (methodBtn) {
      methodBtn.addEventListener("click", () => {
        const open = els.methodBox.classList.toggle("open");
        methodBtn.classList.toggle("active", open);
        methodBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    const langBtn = document.getElementById("btn-lang");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        state.lang = state.lang === "ko" ? "en" : "ko";
        I.setLang(state.lang);
        applyStaticI18n();
        renderTimeline();
        if (state.selectedId) openDrawer(state.selectedId);
      });
    }

    const closeBtn = document.getElementById("drawer-close");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (els.overlay) els.overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (!state.filtered.length) return;
      const idx = state.filtered.findIndex((ev) => ev.id === state.selectedId);
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = idx < 0 ? 0 : Math.min(idx + 1, state.filtered.length - 1);
        openDrawer(state.filtered[next].id);
      }
      if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = idx < 0 ? 0 : Math.max(idx - 1, 0);
        openDrawer(state.filtered[prev].id);
      }
    });
  }

  function initFromQuery() {
    const id = new URLSearchParams(location.search).get("id");
    if (id && events.some((e) => e.id === id)) {
      const ev = events.find((e) => e.id === id);
      if (ev && !matchesFilters(ev)) {
        state.priority = "P0P1";
        state.era = "all";
        state.category = "all";
        applyStaticI18n();
        renderTimeline();
      }
      openDrawer(id);
      const card = document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);
      if (card) card.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  function init() {
    if (!events.length || !I) {
      console.error("Timeline data or i18n missing");
      return;
    }
    I.setLang(state.lang);
    applyStaticI18n();
    renderStats();
    bindFilters();
    renderTimeline();
    initFromQuery();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
