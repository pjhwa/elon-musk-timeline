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
      heroKicker: "Biography timeline · 1971 → 2026",
      heroTitle: "일론 머스크,<br />검증 가능한 사실의 궤적",
      spineLabel: "논리 축:",
      statEvents: "수록 이벤트",
      statP0: "핵심(P0)",
      statRange: "연도 범위",
      statEras: "시대 블록",
      methodTitle: "반박 여지를 줄이는 기록 원칙",
      methodP1:
        "설득력은 수사가 아니라 <strong>출처 계층</strong>과 <strong>사실 판정 기준</strong>에서 옵니다. 동기·평가·예측 문구는 넣지 않습니다.",
      methodLi1: "백과사전(Britannica), 회사 공식, NASA/정부 문서",
      methodLi2: "교차 확인용 신뢰 매체(둘 이상 일치 시 보완)",
      methodLi3:
        'Tesla: “단독 창업”이 아니라 <strong>2004 Series A·의장 / 2008 CEO</strong>로 구분',
      methodLi4: "캐나다 이주 연도는 출처 차이(1988/89)를 <strong>1988–89</strong>로 표기",
      methodLi5: "노란 점은 주의·출처 차이가 있는 카드",
      methodFoot: "최종 교차 검증일:",
      methodKeys: "키보드 j/k 로 이벤트 이동, Esc 로 닫기",
      density: "밀도",
      densityP0: "핵심만 (P0)",
      densityP0P1: "권장 (P0+P1)",
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
      sources: "출처",
      prev: "← 이전",
      next: "다음 →",
      caution: "주의 / 출처 차이",
      footer1:
        "본 타임라인은 공개 자료를 교차 검증한 <strong>사실 기록</strong>입니다. 인물 평가·투자 권유·정치 선동이 아닙니다.",
      footer2:
        "주요 출처: Encyclopaedia Britannica, Tesla.com, SpaceX.com, NASA, White House EO 등.",
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
      heroKicker: "Biography timeline · 1971 → 2026",
      heroTitle: "Elon Musk:<br />a trajectory of verifiable facts",
      spineLabel: "Spine:",
      statEvents: "Events logged",
      statP0: "Core (P0)",
      statRange: "Year span",
      statEras: "Era blocks",
      methodTitle: "How we keep claims defensible",
      methodP1:
        "Persuasion comes from <strong>source tiers</strong> and a <strong>facts-only rule</strong>—not rhetoric. Motives, judgments, and forecasts are excluded.",
      methodLi1: "Encyclopedias (Britannica), company primaries, NASA/government docs",
      methodLi2: "Reputable secondary sources for cross-check (two+ when Tier A is silent)",
      methodLi3:
        "Tesla: not “sole founder”—<strong>2004 Series A & chair / 2008 CEO</strong>",
      methodLi4: "Canada move labeled <strong>1988–89</strong> due to source variance",
      methodLi5: "Yellow dots mark caution / source disagreement",
      methodFoot: "Last verified:",
      methodKeys: "Keys: j/k move events, Esc closes",
      density: "Density",
      densityP0: "Core only (P0)",
      densityP0P1: "Recommended (P0+P1)",
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
      sources: "Sources",
      prev: "← Prev",
      next: "Next →",
      caution: "Caution / source variance",
      footer1:
        "This timeline is a <strong>cross-checked factual record</strong> of public sources—not a character judgment, investment pitch, or political ad.",
      footer2:
        "Primary sources: Encyclopaedia Britannica, Tesla.com, SpaceX.com, NASA, White House EO, and others.",
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
