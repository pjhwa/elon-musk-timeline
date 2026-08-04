(function () {
  "use strict";

  const I = window.MuskI18n;
  const events = window.TIMELINE_EVENTS || [];
  const ERA_ORDER = ["formative", "internet", "dual-bet", "scale", "platform", "now"];

  const COPY = {
    en: {
      kicker: "FACT-CHECKED BIOGRAPHY TIMELINE",
      title: "Elon Musk · Verifiable trajectory",
      sub: "Public records only · Tier A/B sources · Motives & judgments excluded",
      countLabel: "core milestones (P0)",
      verified: (d) => `Verified ${d}`,
      method:
        "Source tiers: A = Britannica / company / NASA / government · B = cross-check media. Tesla: Series A & CEO ≠ sole incorporator.",
      note: "Not investment advice · Not a political ad · Full interactive: index.html",
      spine: [
        "Migration & education",
        "Internet capital",
        "Space + EVs",
        "Industrial scale",
        "Platform · AI · politics",
        "Public markets",
      ],
      hooks: {
        formative: "Access to larger markets",
        internet: "Capital formation",
        "dual-bet": "Parallel hard-tech bets",
        scale: "Reuse & volume",
        platform: "Distribution & power",
        now: "IPO & present",
      },
      legend: {
        life: "Life",
        edu: "Edu",
        company: "Biz",
        spacex: "SpaceX",
        tesla: "Tesla",
        ai: "AI",
        media: "Media",
        politics: "Politics",
        personal: "Personal",
      },
    },
    ko: {
      kicker: "사실 검증 일대기 타임라인",
      title: "일론 머스크 · 검증 가능한 궤적",
      sub: "공개 기록만 · Tier A/B 출처 · 동기·평가 배제",
      countLabel: "핵심 이정표 (P0)",
      verified: (d) => `교차 검증 ${d}`,
      method:
        "출처: A = Britannica/회사/NASA/정부 · B = 교차 확인 매체. Tesla: Series A·CEO ≠ 단독 법인 설립자.",
      note: "투자 조언·정치 선동 아님 · 인터랙티브: index.html",
      spine: ["이주·교육", "인터넷 자본", "우주+전기차", "산업 스케일", "플랫폼·AI·정치", "공개 시장"],
      hooks: {
        formative: "더 큰 시장으로의 접근",
        internet: "자본 형성",
        "dual-bet": "하드테크 병행 베팅",
        scale: "재사용·볼륨",
        platform: "유통·정치 권력",
        now: "IPO·현재",
      },
      legend: {
        life: "생애",
        edu: "교육",
        company: "기업",
        spacex: "SpaceX",
        tesla: "Tesla",
        ai: "AI",
        media: "미디어",
        politics: "정치",
        personal: "개인",
      },
    },
  };

  let lang = (I && I.getLang()) || "en";
  // poster defaults to EN for international print; honor ?lang=
  const q = new URLSearchParams(location.search);
  if (q.get("lang") === "ko" || q.get("lang") === "en") lang = q.get("lang");
  if (q.get("export") === "1") document.body.classList.add("export");

  function shortDate(d) {
    const s = String(d);
    if (/^\d{4}$/.test(s)) return s;
    if (s.includes("–")) return s.split("–")[0].replace(/-\d{2}$/, "").slice(0, 7);
    return s.length > 7 ? s.slice(0, 7) : s;
  }

  function render() {
    const c = COPY[lang] || COPY.en;
    const meta = I ? I.meta(lang) : window.TIMELINE_META;
    const verified = (window.TIMELINE_META || {}).lastVerified || "2026-08-04";

    document.getElementById("p-kicker").textContent = c.kicker;
    document.getElementById("p-title").textContent = c.title;
    document.getElementById("p-sub").textContent = c.sub;
    document.getElementById("p-count-label").textContent = c.countLabel;
    document.getElementById("p-verified").textContent = c.verified(verified);
    document.getElementById("p-method").textContent = c.method;
    document.getElementById("p-note").textContent = c.note;
    document.documentElement.lang = lang === "ko" ? "ko" : "en";

    const p0 = events.filter((e) => e.priority === "P0");
    document.getElementById("p-count").textContent = String(p0.length);

    const spine = document.getElementById("p-spine");
    spine.innerHTML = "";
    c.spine.forEach((step, i) => {
      if (i) {
        const ar = document.createElement("span");
        ar.className = "arrow";
        ar.textContent = "→";
        spine.appendChild(ar);
      }
      const s = document.createElement("span");
      s.className = "step";
      s.textContent = step;
      spine.appendChild(s);
    });

    const legend = document.getElementById("p-legend");
    legend.innerHTML = "";
    Object.keys(c.legend).forEach((k) => {
      const span = document.createElement("span");
      span.innerHTML = `<i class="dot dot-${k}" style="display:inline-block;width:6px;height:6px;border-radius:50%"></i> ${c.legend[k]}`;
      legend.appendChild(span);
    });

    const eras = document.getElementById("p-eras");
    eras.innerHTML = "";

    ERA_ORDER.forEach((eraKey) => {
      const col = document.createElement("div");
      col.className = "era-col";
      col.dataset.era = eraKey;

      const label = (window.ERA_LABELS || {})[eraKey] || {};
      const name = lang === "ko" ? label.ko : label.en;

      const head = document.createElement("header");
      head.innerHTML = `
        <h2 class="era-name">${name || eraKey}</h2>
        <p class="era-range">${label.range || ""}</p>
        <p class="era-hook">${c.hooks[eraKey] || ""}</p>
      `;
      col.appendChild(head);

      const ul = document.createElement("ul");
      // P0 first; pad sparse eras with P1 so columns don't look empty
      const max = 9;
      let list = events
        .filter((e) => e.era === eraKey && e.priority === "P0")
        .sort((a, b) => a.year - b.year);
      if (list.length < 5) {
        const p1 = events
          .filter((e) => e.era === eraKey && e.priority === "P1")
          .sort((a, b) => a.year - b.year);
        list = list.concat(p1).slice(0, max);
      } else if (list.length > max) {
        list = list.slice(0, max);
      }

      list.forEach((ev) => {
        const L = I.localizeEvent(ev, lang);
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="y">${shortDate(ev.date)}</span>
          <span class="t"><span class="dot dot-${ev.category}"></span>${escapeHtml(L.title)}</span>
        `;
        ul.appendChild(li);
      });
      col.appendChild(ul);
      eras.appendChild(col);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.getElementById("btn-lang").addEventListener("click", () => {
    lang = lang === "en" ? "ko" : "en";
    if (I) I.setLang(lang);
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.toString());
    render();
  });

  document.getElementById("btn-print").addEventListener("click", () => window.print());

  render();
})();
