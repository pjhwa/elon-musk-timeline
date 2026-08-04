(function () {
  "use strict";

  const I = window.MuskI18n;
  const events = window.TIMELINE_EVENTS || [];
  const wealth = window.WEALTH_SERIES || [];

  function getTheme() {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    try {
      const s = localStorage.getItem("musk-timeline-theme");
      if (s === "light" || s === "dark") return s;
    } catch (_) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("musk-timeline-theme", theme);
    } catch (_) {}
    const btn = document.getElementById("btn-theme");
    if (btn && I) {
      btn.textContent = theme === "dark" ? I.t(state.lang, "themeLight") : I.t(state.lang, "themeDark");
      btn.setAttribute("title", I.t(state.lang, "themeBtnTitle"));
      btn.setAttribute("aria-label", I.t(state.lang, "themeBtnTitle"));
    }
  }

  const state = {
    lang: I ? I.getLang() : "ko",
    theme: getTheme(),
    era: "all",
    category: "all",
    // auto | headline | detail — auto: headline when all, detail when focused
    depth: "auto",
    selectedId: null,
    filtered: [],
  };

  (function applyQuery() {
    const p = new URLSearchParams(location.search);
    if (p.get("era") && p.get("era") !== "all") state.era = p.get("era");
    if (p.get("cat") && p.get("cat") !== "all") state.category = p.get("cat");
    if (p.get("depth") === "headline" || p.get("depth") === "detail" || p.get("depth") === "auto") {
      state.depth = p.get("depth");
    }
    // legacy priority param
    if (p.get("priority") === "P0") state.depth = "headline";
    if (p.get("priority") === "P0P1" || p.get("priority") === "all") state.depth = "detail";
  })();

  const els = {
    timeline: document.getElementById("timeline"),
    count: document.getElementById("result-count"),
    depthBanner: document.getElementById("depth-banner"),
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
    wealthChart: document.getElementById("wealth-chart"),
    wealthDisclaimer: document.getElementById("wealth-disclaimer"),
  };

  function isFocused() {
    return state.era !== "all" || state.category !== "all";
  }

  /** Effective depth: headline vs full detail */
  function effectiveDepth() {
    if (state.depth === "headline") return "headline";
    if (state.depth === "detail") return "detail";
    return isFocused() ? "detail" : "headline";
  }

  function catClass(cat) {
    return "cat-" + cat;
  }

  function matchesFilters(e) {
    const depth = effectiveDepth();
    if (depth === "headline" && e.priority !== "P0") return false;
    // detail mode: all priorities
    if (state.era !== "all" && e.era !== state.era) return false;
    if (state.category !== "all" && e.category !== state.category) return false;
    return true;
  }

  function getFiltered() {
    return events.filter(matchesFilters).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      const po = { P0: 0, P1: 1, P2: 2 };
      if (po[a.priority] !== po[b.priority]) return po[a.priority] - po[b.priority];
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
    if (els.verified) {
      els.verified.textContent =
        m.lastVerified || (window.TIMELINE_META || {}).lastVerified || "";
    }

    document.querySelectorAll("[data-era]").forEach((b) => {
      b.classList.toggle("active", b.dataset.era === state.era);
    });
    document.querySelectorAll("[data-cat]").forEach((b) => {
      b.classList.toggle("active", b.dataset.cat === state.category);
    });
    document.querySelectorAll("[data-depth]").forEach((b) => {
      b.classList.toggle("active", b.dataset.depth === state.depth);
    });

    const langBtn = document.getElementById("btn-lang");
    if (langBtn) {
      langBtn.textContent = I.t(lang, "langBtn");
      langBtn.title = I.t(lang, "langBtnTitle");
    }

    setTheme(state.theme);

    if (els.wealthDisclaimer && window.WEALTH_DISCLAIMER) {
      els.wealthDisclaimer.textContent =
        window.WEALTH_DISCLAIMER[lang] || window.WEALTH_DISCLAIMER.en;
    }

    renderWealth();
  }

  function renderStats() {
    const p0 = events.filter((e) => e.priority === "P0").length;
    const years = events.map((e) => e.year);
    if (els.statTotal) els.statTotal.textContent = String(events.length);
    if (els.statP0) els.statP0.textContent = String(p0);
    if (els.statSpan) els.statSpan.textContent = `${Math.min(...years)}–${Math.max(...years)}`;
  }

  // linear (default): true magnitude | log: early years readable
  let wealthScale = "linear";

  function formatMultiple(from, to) {
    if (!from || from <= 0 || to <= 0) return null;
    const r = to / from;
    if (r >= 1000) return `×${Math.round(r / 100) * 100}`;
    if (r >= 100) return `×${Math.round(r)}`;
    if (r >= 10) return `×${r.toFixed(0)}`;
    if (r >= 1.05) return `×${r.toFixed(1)}`;
    if (r >= 0.1) return `×${r.toFixed(2)}`;
    return null;
  }

  function pctOfPeak(v, max) {
    if (v <= 0 || max <= 0) return "0%";
    const p = (v / max) * 100;
    if (p < 0.01) return "<0.01%";
    if (p < 1) return `${p.toFixed(2)}%`;
    if (p < 10) return `${p.toFixed(1)}%`;
    return `${Math.round(p)}%`;
  }

  function renderWealth() {
    if (!els.wealthChart || !wealth.length) return;
    const lang = state.lang;
    const max = Math.max(...wealth.map((w) => w.valueUsd));
    const baseline = wealth.find((w) => w.year === 2002)?.valueUsd || wealth[0].valueUsd;

    // Linear: $1T bar = 100%. Early millions become hairlines — that is the point.
    // Floor 1.5% only for non-zero so the bar is clickable, with "true %" label.
    const barH = (v) => {
      if (v <= 0) return 1.5;
      if (wealthScale === "log") {
        const t = Math.log10(v + 1) / Math.log10(max + 1);
        return Math.max(3, t * 100);
      }
      const pct = (v / max) * 100;
      return Math.max(v > 0 ? 1.2 : 1, pct);
    };

    const yTicks =
      wealthScale === "linear"
        ? [
            { pct: 100, label: "$1T" },
            { pct: 50, label: "$500B" },
            { pct: 10, label: "$100B" },
            { pct: 1, label: "$10B" },
          ]
        : [
            { pct: 100, label: "$1T" },
            { pct: 75, label: "~$1B+" },
            { pct: 50, label: "~$1M+" },
          ];

    const ticksHtml = yTicks
      .map(
        (t) =>
          `<div class="wealth-tick" style="bottom:${t.pct}%"><span>${t.label}</span></div>`
      )
      .join("");

    const barsHtml = wealth
      .map((w, i) => {
        const note = w.note[lang] || w.note.en || "";
        const h = barH(w.valueUsd);
        const peakShare = pctOfPeak(w.valueUsd, max);
        const vs2002 = formatMultiple(baseline, w.valueUsd);
        const prev = i > 0 ? wealth[i - 1].valueUsd : null;
        const vsPrev = prev != null ? formatMultiple(prev, w.valueUsd) : null;
        const tip = [
          note,
          lang === "ko" ? `피크 대비 ${peakShare}` : `${peakShare} of peak`,
          vs2002 ? (lang === "ko" ? `2002 대비 ${vs2002}` : `${vs2002} vs 2002`) : "",
        ]
          .filter(Boolean)
          .join(" · ");

        return `
        <button type="button" class="wealth-bar" data-year="${w.year}" title="${escapeHtml(tip)}">
          <span class="wealth-mult">${vs2002 && w.valueUsd > 0 ? escapeHtml(vs2002) : w.valueUsd <= 0 ? "—" : ""}</span>
          <span class="wealth-col-wrap">
            <span class="wealth-col ${w.valueUsd <= 0 ? "is-zero" : h < 4 ? "is-hairline" : ""}" style="height:${h}%"></span>
          </span>
          <span class="wealth-val">${escapeHtml(w.display)}</span>
          <span class="wealth-share">${w.valueUsd > 0 ? peakShare : "—"}</span>
          <span class="wealth-year">${w.year}</span>
        </button>`;
      })
      .join("");

    const scaleLabel =
      lang === "ko"
        ? wealthScale === "linear"
          ? "선형 (실제 크기)"
          : "로그 (초기 구간 확대)"
        : wealthScale === "linear"
          ? "Linear (true scale)"
          : "Log (early years)";

    els.wealthChart.innerHTML = `
      <div class="wealth-scale-row">
        <span class="wealth-scale-label">${scaleLabel}</span>
        <div class="wealth-scale-btns">
          <button type="button" class="chip ${wealthScale === "linear" ? "active" : ""}" data-wscale="linear">${lang === "ko" ? "선형" : "Linear"}</button>
          <button type="button" class="chip ${wealthScale === "log" ? "active" : ""}" data-wscale="log">${lang === "ko" ? "로그" : "Log"}</button>
        </div>
      </div>
      <div class="wealth-plot">
        <div class="wealth-yaxis">${ticksHtml}</div>
        <div class="wealth-bars">${barsHtml}</div>
      </div>
      <p class="wealth-growth-note">${
        lang === "ko"
          ? "막대 높이 = 피크($1T+) 대비 비율 · 상단 배지 = 2002(~$180M) 대비 배수. 선형에서 $22M은 거의 안 보이는 것이 정상입니다."
          : "Bar height = share of peak ($1T+). Top badge = multiple vs 2002 (~$180M). On linear scale, $22M is nearly invisible—by design."
      }</p>`;

    els.wealthChart.querySelectorAll("[data-wscale]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        wealthScale = btn.dataset.wscale;
        renderWealth();
      });
    });

    els.wealthChart.querySelectorAll(".wealth-bar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const y = Number(btn.dataset.year);
        const w = wealth.find((x) => x.year === y);
        openWealthDrawer(w);
      });
    });
  }

  function openWealthDrawer(w) {
    if (!w || !els.drawer) return;
    state.selectedId = null;
    const lang = state.lang;
    const max = Math.max(...wealth.map((x) => x.valueUsd));
    const baseline = wealth.find((x) => x.year === 2002)?.valueUsd || 1;
    const note = w.note[lang] || w.note.en;
    const peakShare = pctOfPeak(w.valueUsd, max);
    const vs2002 = formatMultiple(baseline, w.valueUsd);

    // events near this year
    const nearby = events
      .filter((e) => Math.abs(e.year - w.year) <= 1 && e.priority === "P0")
      .slice(0, 6);

    els.drawerTitle.textContent =
      lang === "ko" ? `순자산 추정 · ${w.year}` : `Net worth estimate · ${w.year}`;

    els.drawerBody.innerHTML = `
      <p class="drawer-date">${w.year}</p>
      <div class="drawer-wealth big">
        <strong class="wealth-big-num">${escapeHtml(w.display)}</strong>
        <p>${escapeHtml(note)}</p>
        <ul class="drawer-facts">
          <li>${lang === "ko" ? "피크 대비" : "Share of peak"}: <strong>${peakShare}</strong></li>
          ${vs2002 ? `<li>${lang === "ko" ? "2002 대비" : "vs 2002"}: <strong>${vs2002}</strong></li>` : ""}
          <li>${lang === "ko" ? "출처" : "Source"}: ${escapeHtml(w.source)}</li>
        </ul>
      </div>
      <p class="drawer-detail">${
        lang === "ko"
          ? "순자산은 Tesla·SpaceX 등 상장·비상장 지분 평가에 연동됩니다. 아래는 같은 시기 전후 핵심 이벤트입니다."
          : "Net worth tracks Tesla/SpaceX and other marks. Key events around this year:"
      }</p>
      <ul class="related-list">
        ${nearby
          .map((e) => {
            const L = I.localizeEvent(e, lang);
            return `<li><button type="button" class="related-link" data-id="${e.id}"><span class="year">${escapeHtml(e.date)}</span> ${escapeHtml(L.title)}</button></li>`;
          })
          .join("")}
      </ul>
      <p class="drawer-detail" style="font-size:0.8rem;margin-top:1rem">${
        lang === "ko"
          ? window.WEALTH_DISCLAIMER.ko
          : window.WEALTH_DISCLAIMER.en
      }</p>
    `;

    els.drawerBody.querySelectorAll(".related-link").forEach((b) => {
      b.addEventListener("click", () => openDrawer(b.dataset.id));
    });

    els.drawer.classList.add("open");
    els.overlay.classList.add("open");
    els.drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function updateDepthBanner() {
    if (!els.depthBanner) return;
    const depth = effectiveDepth();
    const mode =
      depth === "headline"
        ? I.t(state.lang, "depthModeHeadline")
        : I.t(state.lang, "depthModeDetail");
    const hint = I.t(state.lang, "depthHint");
    els.depthBanner.innerHTML = `<strong>${mode}</strong> — ${hint}`;
    els.depthBanner.classList.toggle("is-detail", depth === "detail");
  }

  function renderTimeline() {
    const filtered = getFiltered();
    state.filtered = filtered;
    if (!els.timeline) return;

    els.timeline.innerHTML = "";
    updateDepthBanner();

    const detailCount = filtered.filter((e) => e.priority === "P2").length;
    const showingFn =
      effectiveDepth() === "headline"
        ? I.t(state.lang, "showingHeadline")
        : I.t(state.lang, "showingDetail");
    if (els.count) {
      els.count.textContent =
        typeof showingFn === "function"
          ? effectiveDepth() === "headline"
            ? showingFn(filtered.length)
            : showingFn(filtered.length, detailCount)
          : `${filtered.length}`;
    }

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = I.t(state.lang, "empty");
      els.timeline.appendChild(empty);
      return;
    }

    // Insert wealth markers in detail mode as special items
    const wealthByYear =
      effectiveDepth() === "detail"
        ? Object.fromEntries(wealth.map((w) => [w.year, w]))
        : {};

    let lastEra = null;
    let side = 0;
    let lastYear = null;

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

      // wealth pill when year changes in detail mode
      if (wealthByYear[ev.year] && lastYear !== ev.year) {
        const w = wealthByYear[ev.year];
        const wli = document.createElement("li");
        wli.className = `event-item wealth-item ${side % 2 === 0 ? "left" : "right"}`;
        side += 1;
        const note = w.note[state.lang] || w.note.en;
        wli.innerHTML = `
          <span class="dot cat-company" aria-hidden="true"></span>
          <div class="card wealth-card">
            <div class="card-meta"><span class="year">${w.year}</span><span class="pill">Net worth</span></div>
            <h3>${escapeHtml(w.display)}</h3>
            <p>${escapeHtml(note)}</p>
          </div>`;
        els.timeline.appendChild(wli);
      }
      lastYear = ev.year;

      const L = I.localizeEvent(ev, state.lang);
      const li = document.createElement("li");
      li.className = `event-item ${side % 2 === 0 ? "left" : "right"} pri-${ev.priority.toLowerCase()}`;
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
      pri.className = `pill pri-pill pri-pill-${ev.priority.toLowerCase()}`;
      pri.textContent =
        ev.priority === "P2"
          ? state.lang === "ko"
            ? "상세"
            : "Detail"
          : ev.priority;

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

  function getDeep(ev) {
    const pack = window.DEEP_COPY && window.DEEP_COPY[ev.id];
    if (!pack) return null;
    return pack[state.lang] || pack.en || pack.ko || null;
  }

  function relatedEvents(ev, limit) {
    const n = limit || 5;
    return events
      .filter(
        (e) =>
          e.id !== ev.id &&
          (e.era === ev.era || e.category === ev.category) &&
          Math.abs(e.year - ev.year) <= 4
      )
      .sort((a, b) => {
        const da = Math.abs(a.year - ev.year);
        const db = Math.abs(b.year - ev.year);
        if (da !== db) return da - db;
        const po = { P0: 0, P1: 1, P2: 2 };
        return po[a.priority] - po[b.priority];
      })
      .slice(0, n);
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
    const deep = getDeep(ev);
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

    const maxW = Math.max(...wealth.map((x) => x.valueUsd), 1);
    const w =
      wealth.find((x) => x.year === ev.year) ||
      wealth.filter((x) => x.year <= ev.year).sort((a, b) => b.year - a.year)[0];
    let wealthHtml = "";
    if (w) {
      const peakShare = pctOfPeak(w.valueUsd, maxW);
      const baseline = wealth.find((x) => x.year === 2002)?.valueUsd || 1;
      const vs = formatMultiple(baseline, w.valueUsd);
      wealthHtml = `<div class="drawer-wealth">
        <div class="drawer-wealth-head">
          <span class="pill">${state.lang === "ko" ? "순자산 스냅샷" : "Net worth snapshot"} ~${w.year}</span>
          <strong>${escapeHtml(w.display)}</strong>
        </div>
        <p>${escapeHtml(w.note[state.lang] || w.note.en)}</p>
        <p class="wealth-meta-line">${state.lang === "ko" ? "피크 대비" : "of peak"} ${peakShare}${vs ? ` · 2002 ${vs}` : ""}</p>
        <button type="button" class="btn btn-ghost" id="open-wealth-from-event" style="margin-top:0.5rem">${
          state.lang === "ko" ? "자산 상세 보기" : "Open wealth detail"
        }</button>
      </div>`;
    }

    const bullets = deep && deep.bullets ? deep.bullets : null;
    const bodyText = deep && deep.body ? deep.body : L.detail;
    const contextText = deep && deep.context ? deep.context : null;

    const factsHtml = bullets
      ? `<div class="drawer-section">
          <h3 class="sources-title">${state.lang === "ko" ? "핵심 사실" : "Key facts"}</h3>
          <ul class="drawer-facts">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>`
      : "";

    const contextHtml = contextText
      ? `<div class="drawer-section context-box">
          <h3 class="sources-title">${state.lang === "ko" ? "구조적 맥락" : "Structural context"}</h3>
          <p class="drawer-detail">${escapeHtml(contextText)}</p>
        </div>`
      : "";

    const related = relatedEvents(ev, 6);
    const relatedHtml = related.length
      ? `<div class="drawer-section">
          <h3 class="sources-title">${state.lang === "ko" ? "관련 이벤트" : "Related events"}</h3>
          <ul class="related-list">
            ${related
              .map((e) => {
                const R = I.localizeEvent(e, state.lang);
                return `<li><button type="button" class="related-link" data-id="${e.id}">
                  <span class="year">${escapeHtml(e.date)}</span>
                  <span class="rtitle">${escapeHtml(R.title)}</span>
                  <span class="pill">${escapeHtml(e.priority)}</span>
                </button></li>`;
              })
              .join("")}
          </ul>
        </div>`
      : "";

    // era essay lede if available
    let eraHtml = "";
    const essay =
      window.ERA_ESSAYS &&
      window.ERA_ESSAYS[ev.era] &&
      (window.ERA_ESSAYS[ev.era][state.lang] || window.ERA_ESSAYS[ev.era].en);
    if (essay && essay.lede) {
      const lede = essay.lede.replace(/\*\*(.+?)\*\*/g, "$1");
      eraHtml = `<div class="drawer-section">
        <h3 class="sources-title">${state.lang === "ko" ? "시대 한 줄" : "Era in one line"}</h3>
        <p class="drawer-detail">${escapeHtml(lede)}</p>
        <a class="related-era-link" href="eras.html?era=${encodeURIComponent(ev.era)}&lang=${state.lang}">${
          state.lang === "ko" ? "시대 확대 읽기 →" : "Read era deep-dive →"
        }</a>
      </div>`;
    }

    els.drawerBody.innerHTML = `
      <p class="drawer-date">${escapeHtml(ev.date)}</p>
      <div class="drawer-pills">
        <span class="pill">${escapeHtml(I.catLabel(state.lang, ev.category))}</span>
        <span class="pill">${escapeHtml(I.eraLabel(state.lang, ev.era))}</span>
        <span class="pill">${escapeHtml(ev.priority)}</span>
      </div>
      ${wealthHtml}
      <p class="drawer-summary">${escapeHtml(L.summary)}</p>
      ${factsHtml}
      ${contextHtml}
      <div class="drawer-section">
        <h3 class="sources-title">${state.lang === "ko" ? "상세 설명" : "In depth"}</h3>
        <p class="drawer-detail">${escapeHtml(bodyText)}</p>
        ${
          deep && deep.body && L.detail && deep.body !== L.detail
            ? `<p class="drawer-detail drawer-detail-secondary">${escapeHtml(L.detail)}</p>`
            : ""
        }
      </div>
      ${eraHtml}
      ${relatedHtml}
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
    const wBtn = document.getElementById("open-wealth-from-event");
    if (wBtn && w) wBtn.addEventListener("click", () => openWealthDrawer(w));
    els.drawerBody.querySelectorAll(".related-link").forEach((b) => {
      b.addEventListener("click", () => openDrawer(b.dataset.id));
    });

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
    if (state.depth === "auto") url.searchParams.delete("depth");
    else url.searchParams.set("depth", state.depth);
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

    document.querySelectorAll("[data-depth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.depth = btn.dataset.depth;
        document.querySelectorAll("[data-depth]").forEach((b) => b.classList.toggle("active", b === btn));
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

    const themeBtn = document.getElementById("btn-theme");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        state.theme = state.theme === "dark" ? "light" : "dark";
        setTheme(state.theme);
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
        // expand to detail so deep link works
        state.depth = "detail";
        if (ev.era) {
          /* keep filters if set */
        }
        applyStaticI18n();
        renderTimeline();
      }
      // if still not visible, reset filters
      if (!matchesFilters(ev)) {
        state.era = "all";
        state.category = "all";
        state.depth = "detail";
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
