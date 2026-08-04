(function () {
  "use strict";

  const I = window.MuskI18n;
  const events = window.TIMELINE_EVENTS || [];
  const essays = window.ERA_ESSAYS || {};
  const ERA_ORDER = ["formative", "internet", "dual-bet", "scale", "platform", "now"];

  let lang = I ? I.getLang() : "ko";
  const params = new URLSearchParams(location.search);
  if (params.get("lang") === "en" || params.get("lang") === "ko") lang = params.get("lang");
  let era = params.get("era") || "dual-bet";
  if (!ERA_ORDER.includes(era)) era = "dual-bet";

  const els = {
    picker: document.getElementById("era-picker"),
    essay: document.getElementById("essay"),
    list: document.getElementById("event-list"),
    actions: document.getElementById("actions"),
    pickerLabel: document.getElementById("picker-label"),
    listLabel: document.getElementById("list-label"),
    langBtn: document.getElementById("btn-lang"),
  };

  function setUrl() {
    const url = new URL(location.href);
    url.searchParams.set("era", era);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.toString());
    if (I) I.setLang(lang);
  }

  function renderPicker() {
    els.picker.innerHTML = "";
    ERA_ORDER.forEach((key) => {
      const lab = (window.ERA_LABELS || {})[key] || {};
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = key === era ? "active" : "";
      btn.innerHTML = `<strong>${lang === "en" ? lab.en : lab.ko}</strong><span class="r">${lab.range || ""}</span>`;
      btn.addEventListener("click", () => {
        era = key;
        setUrl();
        render();
      });
      els.picker.appendChild(btn);
    });
  }

  function renderEssay() {
    const pack = essays[era] && essays[era][lang] ? essays[era][lang] : essays[era] && essays[era].en;
    if (!pack) {
      els.essay.innerHTML = "<p>Essay missing.</p>";
      return;
    }
    const body = (pack.body || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    els.essay.innerHTML = `
      <h1>${escapeHtml(pack.title)}</h1>
      <p class="lede">${pack.lede}</p>
      <div class="body">${body}</div>
      <div class="takeaway">
        <strong>${lang === "ko" ? "한 줄 구조" : "Structural takeaway"}</strong>
        ${escapeHtml(pack.takeaway)}
      </div>
    `;
    // lede may contain **bold** — convert simply
    const lede = els.essay.querySelector(".lede");
    if (lede) lede.innerHTML = escapeHtml(pack.lede).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderActions() {
    const timelineUrl = `index.html?era=${encodeURIComponent(era)}&lang=${lang}&priority=P0P1`;
    const posterUrl = `poster.html?lang=${lang}`;
    els.actions.innerHTML = `
      <a href="${timelineUrl}">${lang === "ko" ? "이 시대만 타임라인에서 보기" : "Open this era on the timeline"}</a>
      <a href="${posterUrl}">${lang === "ko" ? "1장 포스터" : "One-page poster"}</a>
    `;
  }

  function renderList() {
    const list = events
      .filter((e) => e.era === era)
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority === "P0" ? -1 : 1;
        return a.year - b.year;
      });

    els.list.innerHTML = "";
    list.forEach((ev) => {
      const L = I.localizeEvent(ev, lang);
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="meta">
          <span>${escapeHtml(ev.date)}</span>
          <span>${escapeHtml(I.catLabel(lang, ev.category))}</span>
          <span>${escapeHtml(ev.priority)}</span>
        </div>
        <h3>${escapeHtml(L.title)}</h3>
        <p>${escapeHtml(L.summary)}</p>
        <p style="margin-top:0.45rem">${escapeHtml(L.detail)}</p>
        ${
          L.caution
            ? `<p style="margin-top:0.4rem;color:#fbbf24;font-size:0.8rem">${escapeHtml(L.caution)}</p>`
            : ""
        }
        <a class="more" href="index.html?id=${encodeURIComponent(ev.id)}&lang=${lang}">${
        lang === "ko" ? "타임라인에서 출처 보기 →" : "View sources on timeline →"
      }</a>
      `;
      els.list.appendChild(li);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderChrome() {
    document.documentElement.lang = lang === "en" ? "en" : "ko";
    document.title =
      lang === "en" ? "Elon Musk · Era deep-dives" : "일론 머스크 · 시대 확대";
    els.pickerLabel.textContent = lang === "ko" ? "시대 선택" : "Choose an era";
    els.listLabel.textContent = lang === "ko" ? "이 시대의 이벤트 (전체)" : "All events in this era";
    els.langBtn.textContent = lang === "ko" ? "EN" : "한";
  }

  function render() {
    renderChrome();
    renderPicker();
    renderEssay();
    renderActions();
    renderList();
  }

  els.langBtn.addEventListener("click", () => {
    lang = lang === "ko" ? "en" : "ko";
    setUrl();
    render();
  });

  setUrl();
  render();
})();
