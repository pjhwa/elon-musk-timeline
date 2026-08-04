/**
 * Point-in-time net-worth estimates (USD). Highly market-variable.
 * Prefer Forbes / Bloomberg-style public estimates; always show as estimates.
 */
window.WEALTH_SERIES = [
  {
    year: 1999,
    valueUsd: 22e6,
    display: "$22M",
    note: {
      ko: "Zip2 매각 후 개인 수취액 규모(보도)",
      en: "Approx. personal proceeds after Zip2 sale (reported)",
    },
    source: "Secondary reporting / Zip2 deal context",
  },
  {
    year: 2002,
    valueUsd: 180e6,
    display: "~$180M",
    note: {
      ko: "PayPal→eBay 매각 후 추정 (세후 규모 보도 구간)",
      en: "Post–PayPal/eBay sale estimate (after-tax range in reporting)",
    },
    source: "Widely cited post-PayPal liquidity figures",
  },
  {
    year: 2008,
    valueUsd: 0,
    display: "~$0*",
    note: {
      ko: "Tesla·SpaceX 위기 — 유동성 고갈 보도 (*종이 순자산 급감)",
      en: "Tesla/SpaceX near-collapse — liquidity stress reported (*paper NW collapse)",
    },
    source: "Biographical / contemporaneous reporting",
  },
  {
    year: 2012,
    valueUsd: 2e9,
    display: "$2B",
    note: {
      ko: "Forbes 세계 억만장자 리스트 데뷔 규모",
      en: "Forbes World’s Billionaires debut (~$2B)",
    },
    source: "Forbes (2012 list / retrospective)",
  },
  {
    year: 2020,
    valueUsd: 25e9,
    display: "~$25B",
    note: {
      ko: "Tesla 주가 급등 직전 구간 — 추정치 폭 큼",
      en: "Pre–2020/21 Tesla surge band — wide estimate range",
    },
    source: "Forbes/Bloomberg band (approximate mid)",
  },
  {
    year: 2021,
    valueUsd: 300e9,
    display: "$300B+",
    note: {
      ko: "Forbes: 최초 $300B 돌파 구간 (2021)",
      en: "Forbes: first to ~$300B band (2021)",
    },
    source: "Forbes",
  },
  {
    year: 2022,
    valueUsd: 140e9,
    display: "~$140B",
    note: {
      ko: "Tesla 조정·Twitter 인수 전후 — 고점 대비 급락 구간",
      en: "Tesla drawdown / Twitter deal period — sharp drop from peak",
    },
    source: "Forbes/Bloomberg band (approximate)",
  },
  {
    year: 2023,
    valueUsd: 180e9,
    display: "~$180B",
    note: {
      ko: "Tesla 변동 속 회복 구간 추정",
      en: "Partial recovery band amid Tesla volatility",
    },
    source: "Forbes/Bloomberg band (approximate)",
  },
  {
    year: 2024,
    valueUsd: 400e9,
    display: "$400B+",
    note: {
      ko: "Forbes: $400B 돌파 보도 (2024 말 구간)",
      en: "Forbes: crossed ~$400B band (late 2024 reporting)",
    },
    source: "Forbes / Wikipedia wealth summary citing Forbes",
  },
  {
    year: 2025,
    valueUsd: 500e9,
    display: "$500B+",
    note: {
      ko: "Forbes: 2025 $500B 돌파 이후 $600–700B 구간 보도",
      en: "Forbes: first $500B (2025); later $600–700B marks reported",
    },
    source: "Forbes (2025 milestones)",
  },
  {
    year: 2026,
    valueUsd: 1e12,
    display: "$1T+",
    note: {
      ko: "SpaceX IPO 후 최초 달러 트리플리오네어 보도 (Britannica/Forbes)",
      en: "First USD trillionaire after SpaceX IPO (Britannica/Forbes reporting)",
    },
    source: "Forbes / Britannica (2026 IPO-linked)",
  },
];

window.WEALTH_DISCLAIMER = {
  ko: "순자산은 주식·비상장 지분 평가에 따라 시시각각 변합니다. 아래는 공개 추정치의 시점 스냅샷이며 확정 회계 수치가 아닙니다.",
  en: "Net worth swings with public and private mark-to-market. Figures below are public estimate snapshots—not audited accounting values.",
};
