/**
 * Detail-layer events (P2). Shown when user focuses an era or category.
 * Appended to TIMELINE_EVENTS at load.
 */
window.DETAIL_EVENTS = [
  // —— Tesla detail ——
  {
    id: "tesla-ai-day-2021",
    date: "2021-08",
    year: 2021,
    era: "platform",
    category: "tesla",
    priority: "P2",
    title: "AI Day: Tesla Bot(Optimus) 공개",
    summary: "Tesla AI Day에서 휴머노이드 로봇 Tesla Bot(이후 Optimus) 컨셉 공개.",
    detail:
      "2021년 AI Day에서 일반 목적 휴머노이드 로봇 계획 발표. 이후 Optimus로 명명·프로토타입 시연으로 이어짐.",
    sources: [
      { name: "Wikipedia — Optimus (robot)", tier: "B", url: "https://en.wikipedia.org/wiki/Optimus_(robot)" },
    ],
    caution: null,
  },
  {
    id: "optimus-prototype-2022",
    date: "2022",
    year: 2022,
    era: "platform",
    category: "tesla",
    priority: "P2",
    title: "Optimus 프로토타입 시연",
    summary: "AI Day 등에서 Optimus 초기 보행·조작 프로토타입 공개 시연.",
    detail: "컨셉 발표 이후 하드웨어 프로토타입 단계. 양산·상용과는 구분되는 개발 이정표.",
    sources: [
      { name: "Wikipedia — Optimus (robot)", tier: "B", url: "https://en.wikipedia.org/wiki/Optimus_(robot)" },
    ],
    caution: null,
  },
  {
    id: "we-robot-cybercab-2024",
    date: "2024-10",
    year: 2024,
    era: "platform",
    category: "tesla",
    priority: "P2",
    title: "We, Robot: Cybercab 공개",
    summary: "Tesla ‘We, Robot’ 이벤트에서 핸들 없는 Cybercab(로보택시 전용 컨셉) 공개.",
    detail:
      "Axios 등: Cybercab 볼륨 생산 2026 목표 언급. 로보택시 서비스와 전용 차량 로드맵 분리 기록.",
    sources: [
      { name: "Axios — Tesla robotaxi / Cybercab", tier: "B", url: "https://www.axios.com/2025/01/29/tesla-earnings-robotaxi-optimus-cybercab-elon-musk" },
    ],
    caution: null,
  },
  {
    id: "robotaxi-austin-2025",
    date: "2025-06",
    year: 2025,
    era: "now",
    category: "tesla",
    priority: "P2",
    title: "오스틴 로보택시 서비스 개시",
    summary: "텍사스 오스틴에서 Tesla 로보택시(초기 Model Y 기반 제한 운행) 서비스 개시 보도.",
    detail:
      "CNBC/WSJ: 2025년 6월(잠정 6/22 전후) 오스틴 지오펜스 제한 운행. 초기 소수 차량·안전 우선 운영으로 기술. Cybercab 대량 양산과는 별 단계.",
    sources: [
      { name: "CNBC — Robotaxi Austin", tier: "B", url: "https://www.cnbc.com/2025/06/20/tesla-robotaxi-launch-austin.html" },
      { name: "WSJ — June 22 launch plan", tier: "B", url: "https://www.wsj.com/business/autos/musk-says-tesla-robotaxi-launch-tentatively-planned-for-june-22-22fb4a29" },
    ],
    caution: "운행 규모·완전 무인 여부는 시기·규제에 따라 보도 내용이 달라질 수 있음.",
  },
  {
    id: "fsd-supervised",
    date: "2019–2024",
    year: 2020,
    era: "scale",
    category: "tesla",
    priority: "P2",
    title: "FSD 베타·감독 자율 기능 확대",
    summary: "Full Self-Driving(감독 필요) 소프트웨어 베타·기능 확장 경로.",
    detail:
      "‘완전 자율’ 마케팅과 실제 감독 요구 기능 사이를 구분. 규제·소송 이슈가 동반 보도된 구간.",
    sources: [
      { name: "Tesla product pages / major press (cross-check)", tier: "B", url: "https://www.tesla.com" },
    ],
    caution: "명칭과 실제 자율 수준(감독 필요)은 다를 수 있음.",
  },
  {
    id: "giga-shanghai-2019",
    date: "2019",
    year: 2019,
    era: "scale",
    category: "tesla",
    priority: "P2",
    title: "기가 상하이 가동 경로",
    summary: "중국 기가팩토리 상하이 건설·생산 개시 — 해외 볼륨 생산 거점.",
    detail: "Model 3/Y 글로벌 공급의 핵심 공장으로 성장. 지역 파트너십·허가 과정 다수 보도.",
    sources: [
      { name: "Tesla / major business press", tier: "B", url: "https://www.tesla.com" },
    ],
    caution: null,
  },
  {
    id: "giga-texas-2022",
    date: "2022",
    year: 2022,
    era: "platform",
    category: "tesla",
    priority: "P2",
    title: "기가 텍사스(오스틴) 본격 가동",
    summary: "Gigafactory Texas 개소·생산 확대. 본사·로보택시 시험과 지리적으로 연결.",
    detail: "Cybertruck·Model Y 생산 및 이벤트 허브. 이후 오스틴 로보택시 시범과 동일 권역.",
    sources: [
      { name: "Tesla / major press", tier: "B", url: "https://www.tesla.com" },
    ],
    caution: null,
  },
  {
    id: "semi-deliveries",
    date: "2022–",
    year: 2022,
    era: "platform",
    category: "tesla",
    priority: "P2",
    title: "Tesla Semi 인도 시작",
    summary: "전기 세미트럭 Semi 고객 인도 개시(초기 제한 물량).",
    detail: "2017 공개 후 지연 끝에 초기 인도. 대량 양산 일정은 별도 추적 필요.",
    sources: [
      { name: "Tesla — Semi", tier: "A", url: "https://www.tesla.com/semi" },
    ],
    caution: null,
  },

  // —— xAI / Colossus ——
  {
    id: "colossus-announce-2024",
    date: "2024-06",
    year: 2024,
    era: "platform",
    category: "ai",
    priority: "P2",
    title: "xAI Colossus(멤피스) 구축 발표",
    summary: "멤피스에 ‘세계 최대급’ AI 슈퍼컴퓨터 Colossus 구축 발표(2024-06-05 전후).",
    detail:
      "Greater Memphis Chamber 등: 2024-06-05 발표. 이후 Colossus 1으로 불리며 단기 구축·가동.",
    sources: [
      { name: "Greater Memphis Chamber — xAI", tier: "B", url: "https://memphischamber.com/economic-development/xai/" },
      { name: "xAI Colossus page", tier: "A", url: "https://x.ai/colossus" },
    ],
    caution: null,
  },
  {
    id: "colossus-online-2024",
    date: "2024-08",
    year: 2024,
    era: "platform",
    category: "ai",
    priority: "P2",
    title: "Colossus 1 가동 (약 122일 구축)",
    summary: "발표 후 약 122일 만에 Colossus 가동 — xAI 공식 ‘gigafactory of compute’ 서술.",
    detail:
      "Chamber: 2024-08-08 가동. xAI: 이후 GPU 규모 확대(10만→20만급 보도/공식 서술). 전력·환경 논란 동반 보도.",
    sources: [
      { name: "xAI — Colossus", tier: "A", url: "https://x.ai/colossus" },
      { name: "Memphis Chamber", tier: "B", url: "https://memphischamber.com/economic-development/xai/" },
    ],
    caution: "환경·전력 허가 이슈는 별도 지역 보도·소송 진행 중일 수 있음.",
  },
  {
    id: "colossus-scale-2025",
    date: "2025",
    year: 2025,
    era: "now",
    category: "ai",
    priority: "P2",
    title: "Colossus 규모 확대 (GPU 더블 등)",
    summary: "xAI: Colossus GPU 클러스터 대규모 확장(공식: 200k GPU 등 서술).",
    detail: "x.ai/colossus 타임라인: 초기 구축 후 수개월 내 규모 배증 서술. 숫자는 회사 발표 기준.",
    sources: [
      { name: "xAI — Colossus", tier: "A", url: "https://x.ai/colossus" },
    ],
    caution: "GPU 수·성능 순위는 시점·측정 기준에 따라 달라짐.",
  },
  {
    id: "grok-launch",
    date: "2023–2024",
    year: 2023,
    era: "platform",
    category: "ai",
    priority: "P2",
    title: "Grok 공개·버전 확장",
    summary: "xAI 챗봇 Grok X 플랫폼 연동 공개 및 후속 모델 버전.",
    detail: "Britannica: xAI 주력 제품 Grok. ChatGPT 등과 경쟁 구도.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },

  // —— Twitter / X detail ——
  {
    id: "twitter-stake-2022-apr",
    date: "2022-04",
    year: 2022,
    era: "platform",
    category: "media",
    priority: "P2",
    title: "Twitter 지분 9%+ 공시",
    summary: "SEC 공시로 Twitter 지분 9% 초과 보유 확인 — 인수 프로세스 시작점.",
    detail: "Britannica: 이사회 합류 발표 후 철회, 전량 인수 제안으로 전환.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },
  {
    id: "twitter-deal-close-2022-oct",
    date: "2022-10",
    year: 2022,
    era: "platform",
    category: "media",
    priority: "P2",
    title: "Twitter 인수 종결 (세부)",
    summary: "약 $44B 거래 종결, 비상장화. 직후 대규모 인력 감축·제품 정책 변경.",
    detail: "철회 시도·소송 후 클로징. 기존 P0 카드와 동일 사건 — 상세 레이어에서 과정 강조.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },
  {
    id: "x-premium-ads",
    date: "2022–2023",
    year: 2023,
    era: "platform",
    category: "media",
    priority: "P2",
    title: "유료 인증·광고 수익 변동",
    summary: "블루체크 유료화, 광고주 이탈·수익 변동이 동반 보도된 구간.",
    detail: "Britannica: 광고 수익 급감 보도. 원인 평가는 제외하고 현상만 기록.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },

  // —— SpaceX detail ——
  {
    id: "starship-ift1-2023",
    date: "2023-04",
    year: 2023,
    era: "platform",
    category: "spacex",
    priority: "P2",
    title: "Starship 통합 비행 시험 1 (IFT-1)",
    summary: "Super Heavy–Starship 첫 통합 궤도급 비행 시험 캠페인 시작.",
    detail: "SpaceX: Flight 1 from Starbase (2023-04). 이후 연속 시험으로 개발 가속.",
    sources: [
      { name: "SpaceX Updates", tier: "A", url: "https://www.spacex.com/updates" },
    ],
    caution: null,
  },
  {
    id: "crew-1-2020",
    date: "2020-11",
    year: 2020,
    era: "scale",
    category: "spacex",
    priority: "P2",
    title: "Crew-1 첫 정규 유인 임무",
    summary: "Demo-2 이후 NASA Crew-1 — 첫 정규 Commercial Crew 운용 비행.",
    detail: "유인 우주 수송이 시험에서 정기 운용으로 전환된 이정표.",
    sources: [
      { name: "NASA / SpaceX", tier: "A", url: "https://www.spacex.com/mission" },
    ],
    caution: null,
  },
  {
    id: "starlink-commercial-2021",
    date: "2021",
    year: 2021,
    era: "platform",
    category: "spacex",
    priority: "P2",
    title: "Starlink 상용 서비스 확대",
    summary: "베타 이후 상용 롤아웃 — 글로벌 저궤도 인터넷 가입자 확대.",
    detail: "Britannica: 2020 베타, 2021 상용. 이후 활성 위성·가입자 급증 서술.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },
  {
    id: "falcon9-block5",
    date: "2018-05",
    year: 2018,
    era: "scale",
    category: "spacex",
    priority: "P2",
    title: "Falcon 9 Block 5 도입",
    summary: "재사용 최적화 Block 5 버전 운용 시작 — 발사 빈도 급증의 기술적 기반.",
    detail: "Wikipedia Falcon 9: Block 5 2018-05 이후 수백 회 발사 기록으로 성장.",
    sources: [
      { name: "Wikipedia — Falcon 9 launches", tier: "B", url: "https://en.wikipedia.org/wiki/List_of_Falcon_9_and_Falcon_Heavy_launches" },
    ],
    caution: null,
  },
  {
    id: "artemis-hls",
    date: "2021",
    year: 2021,
    era: "platform",
    category: "spacex",
    priority: "P2",
    title: "NASA Artemis 달 착륙선(HLS) 선정",
    summary: "Starship 기반 유인 달 착륙 시스템 NASA 계약 경로.",
    detail: "Britannica/SpaceX: Artemis 프로그램 착륙선 역할. 일정은 프로그램 진행에 연동.",
    sources: [
      { name: "SpaceX / NASA Artemis", tier: "A", url: "https://www.spacex.com/updates" },
    ],
    caution: "미션 일정은 NASA 프로그램에 따라 변동.",
  },

  // —— Politics / wealth markers as events ——
  {
    id: "richest-2021",
    date: "2021",
    year: 2021,
    era: "platform",
    category: "company",
    priority: "P2",
    title: "세계 최고 부호 구간 (Forbes 등)",
    summary: "Tesla 시총 급등으로 세계 최고 부호 순위 등극·$300B 밴드 돌파 보도.",
    detail: "Forbes 기준. 이후 순위·금액은 주가에 따라 수시 변동.",
    sources: [
      { name: "Forbes profile / wealth reporting", tier: "B", url: "https://www.forbes.com/profile/elon-musk/" },
    ],
    caution: "순자산 추정치는 시장 연동 — 확정값 아님.",
  },
  {
    id: "trillionaire-2026",
    date: "2026-06",
    year: 2026,
    era: "now",
    category: "company",
    priority: "P2",
    title: "달러 트리플리오네어 보도 (SpaceX IPO 연동)",
    summary: "SpaceX IPO 이후 순자산 $1T 돌파 보도(Forbes/Britannica).",
    detail: "IPO 시가·지분율 가정의 추정치. 기존 SpaceX IPO P0 카드와 연계된 자산 이정표.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
      { name: "Forbes", tier: "B", url: "https://www.forbes.com/profile/elon-musk/" },
    ],
    caution: "시가 변동으로 수치는 수시 변함.",
  },

  // —— OpenAI lawsuit (detail) ——
  {
    id: "openai-lawsuit-2024",
    date: "2024–2026",
    year: 2024,
    era: "platform",
    category: "ai",
    priority: "P2",
    title: "OpenAI 관련 소송·입찰 보도",
    summary: "OpenAI 설립 취지 관련 소송 및 인수 제안 보도(Britannica).",
    detail:
      "Britannica: 2024 소송, 2025 인수 제안 거절, 2026 배심 판단 등. 결과·해석은 출처 시점 기준.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },

  // —— Neuralink more ——
  {
    id: "neuralink-fda",
    date: "2023",
    year: 2023,
    era: "platform",
    category: "ai",
    priority: "P2",
    title: "Neuralink 인체 임상 허가 경로",
    summary: "인체 임상 시험 승인·개시 경로 (Britannica: 2023 임상 시작).",
    detail: "동물 시험 이후 인간 이식 보고로 이어짐. 의료 기기 규제 프레임.",
    sources: [
      { name: "Encyclopaedia Britannica", tier: "A", url: "https://www.britannica.com/money/Elon-Musk" },
    ],
    caution: null,
  },

  // —— Early detail ——
  {
    id: "zip2-sorkin",
    date: "1996–1998",
    year: 1997,
    era: "internet",
    category: "company",
    priority: "P2",
    title: "Zip2 경영권·이사회 갈등",
    summary: "초기 CEO 교체·이사회 역학 — 창업자가 경영에서 밀린 구간으로 다수 전기에 기술.",
    detail: "Compaq 매각 전 거버넌스. ‘성공 일변도’가 아닌 기업 정치 사실.",
    sources: [
      { name: "Britannica Zip2 / biographical reporting", tier: "B", url: "https://www.britannica.com/money/Zip2" },
    ],
    caution: null,
  },
  {
    id: "paypal-ousted",
    date: "2000",
    year: 2000,
    era: "internet",
    category: "company",
    priority: "P2",
    title: "PayPal(X.com) CEO 교체",
    summary: "합병 후 머스크가 CEO에서 물러난 구간 — Thiel 체제 등으로 전환 보도.",
    detail: "공동창업 서사와 별개로 경영권 변동 사실. 이후 eBay 매각 시 지분 수익.",
    sources: [
      { name: "Biographical / business histories (cross-check)", tier: "B", url: "https://en.wikipedia.org/wiki/Elon_Musk" },
    ],
    caution: null,
  },
  {
    id: "falcon1-failures",
    date: "2006–2008",
    year: 2006,
    era: "dual-bet",
    category: "spacex",
    priority: "P2",
    title: "Falcon 1 초기 비행 실패 3회",
    summary: "궤도 성공(2008-09) 이전 연속 실패 — 회사 존속 위기와 병행 기록.",
    detail: "NASA press kit 등: 2006 첫 비행 시작. 성공만 남기지 않는 상세 레이어.",
    sources: [
      { name: "NASA CRS Press Kit milestones", tier: "A", url: "https://www.nasa.gov/wp-content/uploads/2018/07/spacex_nasa_crs-6_presskit-2.pdf" },
    ],
    caution: null,
  },
  {
    id: "tesla-near-death-2008",
    date: "2008",
    year: 2008,
    era: "dual-bet",
    category: "tesla",
    priority: "P2",
    title: "Tesla 2008 유동성 위기",
    summary: "금융 위기·생산 지연 속 파산 직전 보도 — CEO 전환·자금 조달과 동시.",
    detail: "Roadster 인도와 같은 해. SpaceX Falcon 1 성공과 같은 분기 전후로 자주 대비됨.",
    sources: [
      { name: "Biographical reporting / Tesla history", tier: "B", url: "https://en.wikipedia.org/wiki/Tesla,_Inc." },
    ],
    caution: null,
  },
];

// English strings for detail events
window.DETAIL_EVENTS_EN = {
  "tesla-ai-day-2021": {
    title: "AI Day: Tesla Bot (Optimus) unveiled",
    summary: "Tesla AI Day introduces the Tesla Bot humanoid concept (later Optimus).",
    detail: "General-purpose humanoid plan announced; later prototypes under the Optimus name.",
    caution: null,
  },
  "optimus-prototype-2022": {
    title: "Optimus prototype demos",
    summary: "Early walking/manipulation prototype demos at AI Day-style events.",
    detail: "Hardware prototype stage—distinct from volume production or commercial sales.",
    caution: null,
  },
  "we-robot-cybercab-2024": {
    title: "We, Robot: Cybercab unveiled",
    summary: "Tesla ‘We, Robot’ event unveils steering-wheel-less Cybercab concept.",
    detail: "Axios et al.: volume production targeted ~2026. Separate from robotaxi service start.",
    caution: null,
  },
  "robotaxi-austin-2025": {
    title: "Robotaxi service starts in Austin",
    summary: "Limited Tesla robotaxi service in Austin, TX (early Model Y-based reporting).",
    detail:
      "CNBC/WSJ: ~June 2025 (tentative ~June 22) geofenced operations; small initial fleet; safety-first framing.",
    caution: "Fleet size and autonomy level may vary by period and regulation.",
  },
  "fsd-supervised": {
    title: "FSD beta / supervised autonomy expansion",
    summary: "Full Self-Driving (supervised) software beta and feature expansion path.",
    detail: "Separates marketing language from supervised-operation reality; regulatory scrutiny reported.",
    caution: "Name vs. required supervision can differ.",
  },
  "giga-shanghai-2019": {
    title: "Gigafactory Shanghai ramps",
    summary: "China Gigafactory build/start—major overseas volume hub.",
    detail: "Key global Model 3/Y supply node; partnership and permitting widely covered.",
    caution: null,
  },
  "giga-texas-2022": {
    title: "Gigafactory Texas ramps",
    summary: "Austin Gigafactory opening/expansion; HQ and robotaxi geography link.",
    detail: "Cybertruck/Model Y production and event hub; same metro as later robotaxi pilot.",
    caution: null,
  },
  "semi-deliveries": {
    title: "Tesla Semi deliveries begin",
    summary: "Electric Semi truck customer deliveries start (limited early volumes).",
    detail: "Unveiled 2017; delayed initial deliveries. Volume ramp is a separate track.",
    caution: null,
  },
  "colossus-announce-2024": {
    title: "xAI Colossus (Memphis) announced",
    summary: "Announcement of Colossus AI supercomputer build in Memphis (~5 Jun 2024).",
    detail: "Memphis Chamber and xAI materials; later branded Colossus 1; rapid build narrative.",
    caution: null,
  },
  "colossus-online-2024": {
    title: "Colossus 1 online (~122-day build)",
    summary: "Colossus brought online ~122 days after announcement—xAI ‘gigafactory of compute’ framing.",
    detail: "Chamber: ~8 Aug 2024 online. Later GPU scale-up reported. Power/environment coverage accompanies.",
    caution: "Permitting/environment issues may be ongoing in local reporting.",
  },
  "colossus-scale-2025": {
    title: "Colossus scale-up (e.g. GPU double)",
    summary: "xAI: major expansion of Colossus GPU cluster (official ~200k GPU framing).",
    detail: "x.ai/colossus timeline describes rapid doubling after first build. Counts are company-stated.",
    caution: "GPU counts and rankings depend on date and methodology.",
  },
  "grok-launch": {
    title: "Grok launch & version expansion",
    summary: "xAI chatbot Grok launches with X integration; subsequent model versions.",
    detail: "Britannica: Grok as xAI flagship; competes with ChatGPT-class products.",
    caution: null,
  },
  "twitter-stake-2022-apr": {
    title: "Twitter >9% stake disclosed",
    summary: "SEC filing shows >9% Twitter stake—start of acquisition path.",
    detail: "Britannica: board seat path then full buyout bid.",
    caution: null,
  },
  "twitter-deal-close-2022-oct": {
    title: "Twitter deal closes (detail)",
    summary: "~$44B close; take-private; immediate layoffs and product/policy shifts.",
    detail: "Same event as headline acquisition card—process emphasis on detail layer.",
    caution: null,
  },
  "x-premium-ads": {
    title: "Paid verification & ad revenue shift",
    summary: "Blue-check monetization; advertiser pullback and revenue swings reported.",
    detail: "Britannica notes ad revenue decline reporting—phenomenon only, no verdict.",
    caution: null,
  },
  "starship-ift1-2023": {
    title: "Starship integrated flight test 1 (IFT-1)",
    summary: "First Super Heavy–Starship integrated flight-test campaign flight.",
    detail: "SpaceX Flight 1 from Starbase (Apr 2023); rapid iterative tests follow.",
    caution: null,
  },
  "crew-1-2020": {
    title: "Crew-1 first operational crewed mission",
    summary: "After Demo-2, NASA Crew-1—first regular Commercial Crew operational flight.",
    detail: "Marks shift from demo to operational crew transport.",
    caution: null,
  },
  "starlink-commercial-2021": {
    title: "Starlink commercial expansion",
    summary: "Post-beta commercial rollout—LEO broadband subscriber growth.",
    detail: "Britannica: beta 2020, commercial 2021; later satellite/subscriber scale.",
    caution: null,
  },
  "falcon9-block5": {
    title: "Falcon 9 Block 5 introduced",
    summary: "Reuse-optimized Block 5 enters service—basis for high flight rate.",
    detail: "Falcon 9 launch lists: Block 5 from May 2018 onward dominates cadence.",
    caution: null,
  },
  "artemis-hls": {
    title: "NASA Artemis HLS selection path",
    summary: "Starship-based human landing system path under NASA Artemis.",
    detail: "Landing role for crewed lunar missions; schedules track NASA program.",
    caution: "Mission dates move with NASA program.",
  },
  "richest-2021": {
    title: "World’s richest band (Forbes et al.)",
    summary: "Tesla valuation surge puts Musk in world’s-richest and ~$300B bands (reported).",
    detail: "Forbes-based; rank and dollars move with markets.",
    caution: "Net-worth estimates are not fixed accounting values.",
  },
  "trillionaire-2026": {
    title: "USD trillionaire reports (SpaceX IPO-linked)",
    summary: "Post–SpaceX IPO net-worth >$1T reports (Forbes/Britannica).",
    detail: "Estimate linked to IPO marks and ownership assumptions; pairs with IPO headline card.",
    caution: "Market-sensitive figure.",
  },
  "openai-lawsuit-2024": {
    title: "OpenAI litigation & bid reports",
    summary: "Lawsuit over OpenAI founding purpose and acquisition-bid coverage (Britannica).",
    detail: "Britannica: 2024 suit, 2025 bid rejected, 2026 jury outcome notes—time-stamped.",
    caution: null,
  },
  "neuralink-fda": {
    title: "Neuralink human trial path",
    summary: "Human clinical trial approval/start path (Britannica: trials begin 2023).",
    detail: "Leads into first implant reports; medical-device regulatory frame.",
    caution: null,
  },
  "zip2-sorkin": {
    title: "Zip2 governance conflict",
    summary: "Early CEO/board dynamics—founder pushed from day-to-day control (common in bios).",
    detail: "Pre-Compaq governance; not a pure success arc.",
    caution: null,
  },
  "paypal-ousted": {
    title: "PayPal (X.com) CEO transition",
    summary: "Post-merger, Musk leaves CEO role—Thiel-era leadership path reported.",
    detail: "Separate from co-founding narrative; later eBay sale still yields stake proceeds.",
    caution: null,
  },
  "falcon1-failures": {
    title: "Falcon 1: three early flight failures",
    summary: "Consecutive failures before Sep 2008 orbit—company survival stress.",
    detail: "NASA press kit: flights from 2006; detail layer keeps failures visible.",
    caution: null,
  },
  "tesla-near-death-2008": {
    title: "Tesla 2008 liquidity crisis",
    summary: "Near-bankruptcy reporting amid GFC and production stress—parallel to CEO change.",
    detail: "Same year as Roadster deliveries; often contrasted with Falcon 1 orbit timing.",
    caution: null,
  },
};

// Merge into main arrays when this file loads after events.js / en.js
(function mergeDetail() {
  if (!window.TIMELINE_EVENTS || !window.DETAIL_EVENTS) return;
  const ids = new Set(window.TIMELINE_EVENTS.map((e) => e.id));
  window.DETAIL_EVENTS.forEach((e) => {
    if (!ids.has(e.id)) window.TIMELINE_EVENTS.push(e);
  });
  if (window.TIMELINE_EN && window.TIMELINE_EN.events && window.DETAIL_EVENTS_EN) {
    Object.assign(window.TIMELINE_EN.events, window.DETAIL_EVENTS_EN);
  }
})();
