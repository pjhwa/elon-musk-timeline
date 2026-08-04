(function (global) {
  "use strict";

  const UI = {
    ko: {
      brandTitle: "Elon Musk · 일대기 타임라인",
      brandSub: "사실 검증 인터랙티브 인포그래픽",
      methodBtn: "검증 기준",
      sourcesBtn: "출처 목록",
      posterBtn: "1장 포스터",
      erasBtn: "시대 확대",
      langBtn: "EN",
      langBtnTitle: "Switch to English",
      themeBtnTitle: "라이트/다크 테마 전환",
      themeLight: "☀",
      themeDark: "☾",
      heroKicker: "Biography timeline · 1971 → 2026",
      heroTitle: "일론 머스크,<br />검증 가능한 사실의 궤적",
      spineLabel: "논리 축:",
      statEvents: "수록 이벤트",
      statP0: "핵심(P0)",
      statRange: "연도 범위",
      statEras: "시대 블록",
      methodTitle: "Grokipedia 출처·인용 원칙",
      methodP1:
        "1차 출처는 <strong>Grokipedia</strong>입니다. 사실 요약과 별도로 카드에 <strong>Grokipedia 인용</strong>(원문 또는 동일 내용의 한국어 요지)을 둡니다.",
      methodLi1: "Grokipedia — Elon Musk / SpaceX / Tesla / Views 문서",
      methodLi2: "인용 박스는 해당 페이지 서술에서 가져온 문장·요지",
      methodLi3:
        "Tesla: Grokipedia Series A($6.5M/$7.5M)·의장 서술 등 — <strong>2004 투자·의장 / 2008 CEO</strong> 구분 유지",
      methodLi4: "캐나다 이주 연도는 출처 차이(1988/89)를 <strong>1988–89</strong>로 표기",
      methodLi5: "노란 점 = 주의 · 인용 박스 = Grokipedia 본문",
      methodFoot: "최종 교차 검증일:",
      methodKeys: "키보드 j/k 로 이벤트 이동, Esc 로 닫기",
      density: "보기",
      densityP0: "핵심만 (P0)",
      densityP0P1: "권장 (P0+P1)",
      depthHint:
        "기본: 핵심 이정표만. 시대 또는 분야를 고르면 Optimus·Colossus·로보택시 등 상세 이벤트가 펼쳐집니다.",
      depthModeHeadline: "지금: 핵심 보기 (P0)",
      depthModeDetail: "지금: 상세 보기 (P0+P1+P2)",
      wealthTitle: "시기별 순자산 추정",
      wealthAxis: "기본 선형(피크 대비 실제 비율) · 로그 전환 가능",
      showingDetail: (n, d) => `${n}개 표시 · 상세 ${d}개 포함`,
      showingHeadline: (n) => `${n}개 핵심 이정표`,
      era: "시대",
      eraAll: "전체",
      eraFormative: "형성 71–94",
      eraInternet: "인터넷 95–02",
      eraDual: "이중베팅 02–12",
      eraScale: "스케일 13–20",
      eraPlatform: "플랫폼·정치 21–25",
      eraNow: "현재 25–26",
      field: "분야",
      catAll: "전체",
      catLife: "생애",
      catEdu: "교육",
      catCompany: "기업",
      catSpacex: "SpaceX",
      catTesla: "Tesla",
      catAi: "AI",
      catMedia: "미디어",
      catPolitics: "정치",
      catPersonal: "개인사",
      showing: (n) => `${n}개 이벤트 표시 중`,
      empty: "필터 조건에 맞는 이벤트가 없습니다.",
      sources: "출처 (Grokipedia)",
      citation: "Grokipedia 인용",
      citationNote: "아래는 Grokipedia 해당 문서 서술의 인용·요지입니다. (원문 링크는 출처 목록)",
      prev: "← 이전",
      next: "다음 →",
      caution: "주의 / 출처 차이",
      footer1:
        "본 타임라인의 <strong>1차 출처는 Grokipedia</strong>입니다. 카드마다 Grokipedia 인용을 병기합니다.",
      footer2:
        "Grokipedia: Elon Musk, SpaceX, Tesla, Views of Elon Musk 등 — https://grokipedia.com",
      footer3: "로컬에서 열기: 이 폴더의 index.html을 브라우저로 열면 됩니다.",
      close: "닫기",
      event: "이벤트",
    },
    en: {
      brandTitle: "Elon Musk · Life Timeline",
      brandSub: "Fact-checked interactive infographic",
      methodBtn: "Method",
      sourcesBtn: "Sources",
      posterBtn: "1-page poster",
      erasBtn: "Era deep-dives",
      langBtn: "한",
      langBtnTitle: "한국어로 전환",
      themeBtnTitle: "Toggle light / dark theme",
      themeLight: "☀",
      themeDark: "☾",
      heroKicker: "Biography timeline · 1971 → 2026",
      heroTitle: "Elon Musk:<br />a trajectory of verifiable facts",
      spineLabel: "Spine:",
      statEvents: "Events logged",
      statP0: "Core (P0)",
      statRange: "Year span",
      statEras: "Era blocks",
      methodTitle: "Grokipedia sources & citations",
      methodP1:
        "Primary source is <strong>Grokipedia</strong>. Each card includes a <strong>Grokipedia citation</strong> (English page wording or Korean rendering of the same).",
      methodLi1: "Grokipedia — Elon Musk / SpaceX / Tesla / Views pages",
      methodLi2: "Citation boxes quote or closely render Grokipedia article text",
      methodLi3:
        "Tesla: Grokipedia Series A ($6.5M of $7.5M) & chair — keep <strong>2004 invest/chair / 2008 CEO</strong>",
      methodLi4: "Canada move labeled <strong>1988–89</strong> due to source variance",
      methodLi5: "Yellow dots = caution · citation box = Grokipedia text",
      methodFoot: "Last verified:",
      methodKeys: "Keys: j/k move events, Esc closes",
      density: "View",
      densityP0: "Core only (P0)",
      densityP0P1: "Recommended (P0+P1)",
      depthHint:
        "Default: headline milestones only. Pick an era or field to expand detail (Optimus, Colossus, robotaxi, etc.).",
      depthModeHeadline: "Now: headlines (P0)",
      depthModeDetail: "Now: detail layer (P0+P1+P2)",
      wealthTitle: "Net worth over time (estimates)",
      wealthAxis: "Linear by default (true share of peak) · log toggle",
      showingDetail: (n, d) => `${n} shown · ${d} detail-layer`,
      showingHeadline: (n) => `${n} headline milestones`,
      era: "Era",
      eraAll: "All",
      eraFormative: "Formative 71–94",
      eraInternet: "Internet 95–02",
      eraDual: "Dual bet 02–12",
      eraScale: "Scale 13–20",
      eraPlatform: "Platform·politics 21–25",
      eraNow: "Present 25–26",
      field: "Field",
      catAll: "All",
      catLife: "Life",
      catEdu: "Education",
      catCompany: "Business",
      catSpacex: "SpaceX",
      catTesla: "Tesla",
      catAi: "AI",
      catMedia: "Media",
      catPolitics: "Politics",
      catPersonal: "Personal",
      showing: (n) => `${n} events shown`,
      empty: "No events match these filters.",
      sources: "Sources (Grokipedia)",
      citation: "Grokipedia citation",
      citationNote: "Quoted or closely rendered from the Grokipedia article text. See source links for the full page.",
      prev: "← Prev",
      next: "Next →",
      caution: "Caution / source variance",
      footer1:
        "Primary source is <strong>Grokipedia</strong>. Each card includes a Grokipedia citation.",
      footer2:
        "Grokipedia pages: Elon Musk, SpaceX, Tesla, Views of Elon Musk — https://grokipedia.com",
      footer3: "Open locally: open index.html in a browser (no server required).",
      close: "Close",
      event: "Event",
    },
  };

  const CAT = {
    ko: window.CATEGORY_LABELS || {},
    en: {
      life: "Life & migration",
      edu: "Education",
      company: "Business",
      spacex: "SpaceX",
      tesla: "Tesla",
      ai: "AI & Neuralink",
      media: "Media & X",
      politics: "Politics",
      personal: "Personal",
    },
  };

  function getLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ko") return q;
    try {
      const s = localStorage.getItem("musk-timeline-lang");
      if (s === "en" || s === "ko") return s;
    } catch (_) {}
    return "ko";
  }

  function setLang(lang) {
    try {
      localStorage.setItem("musk-timeline-lang", lang);
    } catch (_) {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.toString());
  }

  function t(lang, key) {
    const pack = UI[lang] || UI.ko;
    return pack[key];
  }

  function catLabel(lang, cat) {
    return (CAT[lang] && CAT[lang][cat]) || cat;
  }

  function eraLabel(lang, eraKey) {
    const e = (window.ERA_LABELS || {})[eraKey];
    if (!e) return eraKey;
    const name = lang === "en" ? e.en : e.ko;
    return `${name} · ${e.range}`;
  }

  function localizeEvent(ev, lang) {
    if (lang !== "en") {
      return {
        title: ev.title,
        summary: ev.summary,
        detail: ev.detail,
        caution: ev.caution,
      };
    }
    const en = (window.TIMELINE_EN && window.TIMELINE_EN.events && window.TIMELINE_EN.events[ev.id]) || {};
    return {
      title: en.title || ev.title,
      summary: en.summary || ev.summary,
      detail: en.detail || ev.detail,
      caution: en.caution !== undefined ? en.caution : ev.caution,
    };
  }

  function meta(lang) {
    if (lang === "en" && window.TIMELINE_EN && window.TIMELINE_EN.meta) {
      return Object.assign({}, window.TIMELINE_META, window.TIMELINE_EN.meta);
    }
    return window.TIMELINE_META || {};
  }

  global.MuskI18n = {
    UI,
    getLang,
    setLang,
    t,
    catLabel,
    eraLabel,
    localizeEvent,
    meta,
  };
})(window);
