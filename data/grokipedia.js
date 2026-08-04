/**
 * Primary source: Grokipedia (https://grokipedia.com)
 * Each event gets sources + a citation block drawn from Grokipedia article text
 * (English quotes from page content; Korean is a faithful translation of that quote).
 */
window.GROKIPEDIA = {
  base: "https://grokipedia.com",
  pages: {
    musk: {
      name: "Grokipedia — Elon Musk",
      url: "https://grokipedia.com/page/Elon_Musk",
    },
    views: {
      name: "Grokipedia — Views of Elon Musk",
      url: "https://grokipedia.com/page/Views_of_Elon_Musk",
    },
    spacex: {
      name: "Grokipedia — SpaceX",
      url: "https://grokipedia.com/page/SpaceX",
    },
    tesla: {
      name: "Grokipedia — Tesla, Inc.",
      url: "https://grokipedia.com/page/Tesla,_Inc.",
    },
    awards: {
      name: "Grokipedia — Awards & honors (Elon Musk)",
      url: "https://grokipedia.com/page/List_of_awards_and_honors_received_by_Elon_Musk",
    },
  },
  /** Lead mission paragraph (Grokipedia — Elon Musk) */
  missionQuote: {
    en: "His ventures collectively aim to address existential challenges for humanity, including transitioning the world to sustainable energy via Tesla's electric vehicles, energy storage solutions, and solar products; enabling a multi-planetary civilization to safeguard against Earth-bound extinction events through SpaceX's Mars settlement goals; developing safe and truth-seeking artificial general intelligence with xAI; and augmenting human capabilities through direct neural interfaces with Neuralink.",
    ko: "그의 벤처들은 인류에 대한 실존적 과제에 대응하려는 것으로 기술된다. Tesla의 전기차·에너지 저장·태양광을 통한 지속 가능 에너지 전환, SpaceX의 화성 정착 목표를 통한 다행성 문명(지구 멸종 리스크 대비), xAI의 안전하고 진실 추구적인 인공일반지능, Neuralink의 신경 인터페이스를 통한 인간 능력 증강이 포함된다. — Grokipedia, Elon Musk",
  },
};

/**
 * Per-event Grokipedia citation.
 * quote.en = wording aligned to Grokipedia page text; quote.ko = Korean rendering of same.
 */
window.GROKIPEDIA_CITE = {
  "birth-1971": {
    pages: ["musk"],
    en: "Elon Reeve Musk (born June 28, 1971) is a South African-born Canadian-American engineer, entrepreneur, business magnate, and public figure.",
    ko: "Elon Reeve Musk(1971년 6월 28일생)는 남아공 출생의 캐나다·미국 국적 엔지니어·기업가·사업 거물·공인이다. — Grokipedia, Elon Musk",
  },
  "blastar-1983": {
    pages: ["musk"],
    en: "Grokipedia records early computer work and entrepreneurship in childhood, including game software sales as part of self-education and early ventures (see Early Entrepreneurial Ventures / childhood sections).",
    ko: "Grokipedia는 어린 시절 컴퓨터 작업·자기교육과 초기 창업 일화(게임 소프트웨어 판매 등)를 Early Entrepreneurial Ventures·유년 섹션에서 다룬다. — Grokipedia, Elon Musk",
  },
  "canada-1989": {
    pages: ["musk"],
    en: "At age 17, he emigrated to Canada to attend university and obtain citizenship through his mother, later transferring to the University of Pennsylvania where he earned bachelor's degrees in physics and economics.",
    ko: "17세에 대학 진학과 모계를 통한 시민권 취득을 위해 캐나다로 이주했고, 이후 펜실베이니아 대학교로 편입해 물리학·경제학 학사 학위를 받았다. — Grokipedia, Elon Musk",
  },
  "queens-1989": {
    pages: ["musk"],
    en: "…emigrated to Canada to attend university… later transferring to the University of Pennsylvania…",
    ko: "캐나다에서 대학(Queen’s 경로 포함)을 다닌 뒤 유펜으로 편입한 교육 경로가 서술된다. — Grokipedia, Elon Musk",
  },
  "upenn-1992": {
    pages: ["musk"],
    en: "…transferring to the University of Pennsylvania where he earned bachelor's degrees in physics and economics.",
    ko: "펜실베이니아 대학교에서 물리학·경제학 학사 학위를 취득했다. — Grokipedia, Elon Musk",
  },
  "stanford-1995": {
    pages: ["musk"],
    en: "He was admitted to Stanford University's PhD program in materials science but dropped out after two days to co-found Zip2 in 1995, marking the start of his entrepreneurial career in the internet industry.",
    ko: "스탠퍼드 재료과학 박사과정에 입학했으나 이틀 만에 중퇴하고 1995년 Zip2를 공동창업했으며, 이는 인터넷 산업 기업가 경력의 시작으로 기술된다. — Grokipedia, Elon Musk",
  },
  "zip2-1995": {
    pages: ["musk"],
    en: "…dropped out after two days to co-found Zip2 in 1995, marking the start of his entrepreneurial career in the internet industry. Musk has pioneered advancements in reusable rocketry through his company SpaceX…",
    ko: "1995년 Zip2 공동창업이 인터넷 산업 커리어의 시작으로 명시된다. (이후 SpaceX 재사용 로켓 등 서술로 이어짐.) — Grokipedia, Elon Musk",
  },
  "upenn-grad-1997": {
    pages: ["musk"],
    en: "…earned bachelor's degrees in physics and economics.",
    ko: "물리학·경제학 학사 학위 취득이 교육 경로에 기록된다. — Grokipedia, Elon Musk",
  },
  "zip2-sale-1999": {
    pages: ["musk"],
    en: "In February 1999, Compaq Computer Corporation acquired Zip2 for approximately $307 million in cash and stock.",
    ko: "1999년 2월 Compaq이 Zip2를 현금·주식 약 3억 700만 달러에 인수했다. — Grokipedia, Elon Musk",
  },
  "xcom-1999": {
    pages: ["musk"],
    en: "Key milestones for X.com and PayPal include: … In March 2000, X.com merged with Confinity…",
    ko: "X.com과 PayPal의 주요 이정표가 별도 섹션으로 정리되며, 2000년 3월 Confinity 합병 경로가 기술된다. — Grokipedia, Elon Musk",
  },
  "marriage-justine-2000": {
    pages: ["musk"],
    en: "Personal Life: Musk has multiple children… from previous relationships. (Marriage chronology is summarized in personal-life coverage.)",
    ko: "개인사 섹션에서 이전 관계·자녀 등이 요약된다. 결혼 연대는 개인사 기록 수준으로 다룬다. — Grokipedia, Elon Musk",
  },
  "paypal-2000": {
    pages: ["musk"],
    en: "In March 2000, X.com merged with Confinity, a rival startup founded by Peter Thiel that operated the PayPal payment service; the deal was structured as an acquisition of Confinity by X.com, with Musk serving as CEO and largest shareholder. The combined entity… integrated PayPal's peer-to-peer payment technology, which gained significant traction on eBay. The company was renamed PayPal in 2001…",
    ko: "2000년 3월 X.com이 피터 틸의 Confinity(PayPal)를 인수·합병하는 형태로 결합했고, 머스크는 CEO이자 최대주주였다. PayPal P2P 결제 기술이 eBay에서 큰 성장을 보였다. 2001년 사명을 PayPal로 변경. — Grokipedia, Elon Musk",
  },
  "ebay-paypal-2002": {
    pages: ["musk"],
    en: "Grokipedia’s SpaceX founding section links PayPal liquidity to SpaceX: Musk founded SpaceX… investing about $100 million of his proceeds from the sale of PayPal…",
    ko: "SpaceX 설립 서술에서 PayPal 매각 수익 약 1억 달러를 투자했다고 연결한다. — Grokipedia, Elon Musk / SpaceX 관련 서술",
  },
  "us-citizen-2002": {
    pages: ["musk"],
    en: "South African-born Canadian-American… (citizenship path via Canada then the United States is part of the standard biographical frame).",
    ko: "남아공 출생·캐나다·미국 국적 인물로 기술되며, 캐나다 경유 미국 경로가 전기 프레임에 포함된다. — Grokipedia, Elon Musk",
  },
  "spacex-2002": {
    pages: ["musk", "spacex"],
    en: "He is the founder, CEO, and chief designer of SpaceX… enabling a multi-planetary civilization to safeguard against Earth-bound extinction events through SpaceX's Mars settlement goals… Musk has pioneered advancements in reusable rocketry through his company SpaceX…",
    ko: "SpaceX의 founder·CEO·chief designer로 명시된다. SpaceX 화성 정착 목표를 통해 지구 멸종 리스크에 대비하는 다행성 문명을 가능하게 하려는 목표, 재사용 로켓 발전을 개척했다고 기술된다. — Grokipedia, Elon Musk",
  },
  "tesla-founded-2003": {
    pages: ["musk", "tesla"],
    en: "CEO and product architect of Tesla… Key products developed under his leadership include the Model S… (Grokipedia also covers founding/early financing and co-founder status in Tesla sections).",
    ko: "Tesla의 CEO 및 product architect로 기술된다. 리더십 하 핵심 제품(Model S 등)과 설립·초기 자금·co-founder 지위 관련 서술이 Tesla 섹션에 있다. — Grokipedia, Elon Musk / Tesla",
  },
  "tesla-series-a-2004": {
    pages: ["musk", "tesla"],
    en: "In February 2004, Elon Musk led the company's Series A funding round, personally investing $6.5 million of the $7.5 million raised, which made him the largest shareholder and led to his appointment as chairman of the board in April 2004.",
    ko: "2004년 2월 Series A를 리드해 7.5백만 달러 중 6.5백만 달러를 직접 투자했고, 최대주주가 되었으며 2004년 4월 이사회 의장에 올랐다. — Grokipedia, Elon Musk",
  },
  "roadster-unveil-2006": {
    pages: ["tesla", "musk"],
    en: "Tesla has played a key role in accelerating electric vehicle adoption… (early Roadster era is part of Tesla’s product history under Musk’s product leadership frame).",
    ko: "Tesla가 전기차 대중 채택을 가속하는 데 핵심 역할을 했다고 기술되며, 초기 Roadster는 제품·리더십 역사의 일부로 다뤄진다. — Grokipedia, Tesla / Elon Musk",
  },
  "falcon1-orbit-2008": {
    pages: ["musk", "spacex"],
    en: "Success came with the fourth launch on September 28, 2008, achieving the first private liquid-fueled orbital flight, followed by NASA's $1.6 billion CRS contract on December 23, 2008, for ISS resupply.",
    ko: "2008년 9월 28일 네 번째 발사로 민간 액체연료 궤도 비행에 처음 성공했고, 이어 2008년 12월 23일 NASA의 ISS 재보급 CRS 계약 16억 달러가 이어졌다. — Grokipedia, Elon Musk",
  },
  "tesla-ceo-2008": {
    pages: ["musk", "tesla"],
    en: "Grokipedia covers ‘Early leadership transition and crisis (2007-2008)’ and ‘Financial recovery and funding (2008-2013)’ under Tesla leadership sections; Musk is described as CEO and product architect of Tesla.",
    ko: "Tesla 섹션에 ‘초기 리더십 전환과 위기(2007–2008)’ ‘재무 회복과 자금(2008–2013)’이 있으며, 머스크는 Tesla CEO·product architect로 기술된다. — Grokipedia, Elon Musk / Tesla",
  },
  "roadster-deliver-2008": {
    pages: ["tesla"],
    en: "Key products developed under his leadership include… (Roadster as first customer vehicle in Tesla chronology).",
    ko: "리더십 하 핵심 제품 서사의 일부로 초기 차량 인도가 제품 연대기에 위치한다. — Grokipedia, Tesla / Elon Musk",
  },
  "nasa-crs-2008": {
    pages: ["spacex", "musk"],
    en: "…followed by NASA's $1.6 billion CRS contract on December 23, 2008, for ISS resupply.",
    ko: "2008년 12월 23일 NASA CRS 계약(ISS 재보급) 16억 달러. — Grokipedia, Elon Musk",
  },
  "falcon9-2010": {
    pages: ["spacex", "musk"],
    en: "From early development, SpaceX pursued vertical takeoff and landing for cost reduction. Key milestones include: Falcon 9 first-stage recovery attempts beginning in 2013–2015… First orbital-class booster landing on December 21, 2015…",
    ko: "초기부터 비용 절감을 위해 수직 이착륙을 추구했다. Falcon 9 1단 회수 시도(2013–2015)와 2015-12-21 궤도급 부스터 착륙 등이 이정표로 열거된다. — Grokipedia, Elon Musk",
  },
  "tesla-ipo-2010": {
    pages: ["tesla", "musk"],
    en: "Financial recovery and funding (2008-2013) and growth strategies are covered under Tesla leadership; public listing sits in that recovery/growth arc.",
    ko: "Tesla ‘재무 회복과 자금(2008–2013)’·성장 전략 서술에 상장·자금 조달 구간이 포함된다. — Grokipedia, Tesla / Elon Musk",
  },
  "marriage-talulah": {
    pages: ["musk"],
    en: "Personal Life coverage on Grokipedia (relationships/children summaries).",
    ko: "Grokipedia 개인사 섹션의 관계·자녀 요약 범위. — Grokipedia, Elon Musk",
  },
  "dragon-recover-2010": {
    pages: ["spacex"],
    en: "Reusable rocketry and commercial operations milestones under SpaceX (cargo Dragon path toward ISS logistics).",
    ko: "SpaceX 재사용·상업 운영 이정표 중 화물 Dragon·ISS 물류 경로로 서술된다. — Grokipedia, SpaceX / Elon Musk",
  },
  "model-s-2012": {
    pages: ["tesla", "musk"],
    en: "Key products developed under his leadership include the Model S luxury sedan launched in 2012, the Model X SUV with falcon-wing doors introduced in 2015, the Model Y compact crossover released in 2020…",
    ko: "리더십 하 핵심 제품으로 2012년 Model S 럭셔리 세단, 2015년 Model X, 2020년 Model Y 등이 열거된다. — Grokipedia, Elon Musk",
  },
  "dragon-iss-2012": {
    pages: ["spacex", "musk"],
    en: "Commercial operations / cargo-to-crew progression on Grokipedia SpaceX and Elon Musk pages (ISS resupply lineage after CRS award).",
    ko: "CRS 이후 ISS 재보급·상업 운영, 화물에서 유인으로의 진행이 SpaceX·Elon Musk 페이지에 기술된다. — Grokipedia",
  },
  "hyperloop-2013": {
    pages: ["musk"],
    en: "Hyperloop Concept is listed under The Boring Company / transport concepts on Grokipedia’s Elon Musk page.",
    ko: "Grokipedia Elon Musk 페이지 The Boring Company·수송 개념 아래 Hyperloop Concept이 항목으로 있다. — Grokipedia, Elon Musk",
  },
  "model-x-2015": {
    pages: ["tesla", "musk"],
    en: "…the Model X SUV with falcon-wing doors introduced in 2015…",
    ko: "2015년 팔콘윙 도어 Model X SUV 도입. — Grokipedia, Elon Musk",
  },
  "openai-2015": {
    pages: ["musk"],
    en: "Musk co-founded OpenAI on December 11, 2015, as a non-profit AI research laboratory aimed at developing artificial general intelligence (AGI) safely and for the benefit of humanity, following conversations with Google co-founder Larry Page, who dismissed AI safety concerns…",
    ko: "2015년 12월 11일 인류 이익을 위한 안전한 AGI를 목표로 비영리 AI 연구소 OpenAI를 공동설립했다. (구글 창업자 래리 페이지와의 AI 안전 관련 대화 맥락이 함께 서술된다.) — Grokipedia, Elon Musk",
  },
  "falcon9-landing-2015": {
    pages: ["spacex", "musk"],
    en: "First orbital-class booster landing on December 21, 2015, after ORBCOMM-2. From early development, SpaceX pursued vertical takeoff and landing for cost reduction.",
    ko: "2015년 12월 21일 ORBCOMM-2 이후 첫 궤도급 부스터 착륙. 초기부터 비용 절감을 위한 수직 이착륙을 추구했다. — Grokipedia, Elon Musk",
  },
  "solarcity-2016": {
    pages: ["tesla", "musk"],
    en: "…transitioning the world to sustainable energy via Tesla's electric vehicles, energy storage solutions, and solar products…",
    ko: "Tesla 전기차·에너지 저장·태양광 제품으로 세계를 지속 가능 에너지로 전환하려는 목표가 벤처 목적에 포함된다. — Grokipedia, Elon Musk",
  },
  "neuralink-2016": {
    pages: ["musk"],
    en: "…augmenting human capabilities through direct neural interfaces with Neuralink. …founder of … Neuralink… Developing implantable brain-machine interfaces for medical and enhancement uses.",
    ko: "Neuralink 직접 신경 인터페이스로 인간 능력을 증강하는 목표가 명시된다. 의료·증강용 이식형 뇌-기계 인터페이스 개발. — Grokipedia, Elon Musk",
  },
  "boring-2016": {
    pages: ["musk"],
    en: "…founder of … The Boring Company. Concept and Projects / Operational Projects sections cover tunneling and Loop-style systems.",
    ko: "The Boring Company 설립자로 기술되며, 개념·프로젝트·운영 터널/Loop형 시스템이 섹션으로 정리된다. — Grokipedia, Elon Musk",
  },
  "model-3-2017": {
    pages: ["tesla", "musk"],
    en: "In a 2018 New York Times interview about Tesla's Model 3 \"production hell,\" he described the prior year as \"the most difficult and painful year of my career. It was excruciating,\" … yet highlighting his resilience amid such mental health strains.",
    ko: "2018년 NYT 인터뷰에서 Model 3 ‘production hell’ 시기를 “커리어에서 가장 어렵고 고통스러운 해… 극심했다”고 말했고, 그 속에서의 회복력(resilience)이 함께 기술된다. — Grokipedia, Elon Musk",
  },
  "falcon-reflight-2017": {
    pages: ["spacex", "musk"],
    en: "Musk has pioneered advancements in reusable rocketry through his company SpaceX… From early development, SpaceX pursued vertical takeoff and landing for cost reduction.",
    ko: "SpaceX를 통해 재사용 로켓 발전을 개척했다고 기술되며, 초기부터 비용 절감용 수직 이착륙을 추구했다. — Grokipedia, Elon Musk",
  },
  "openai-exit-2018": {
    pages: ["musk"],
    en: "Grokipedia details OpenAI founding (2015) and later governance/for-profit tensions; Musk’s later xAI work is framed as developing safe and truth-seeking AGI.",
    ko: "OpenAI 설립(2015)과 이후 거버넌스·영리화 긴장이 서술되고, 이후 xAI는 안전하고 진실 추구적인 AGI 개발로 기술된다. — Grokipedia, Elon Musk",
  },
  "falcon-heavy-2018": {
    pages: ["spacex"],
    en: "Reusable Rocketry and Milestones / heavy-lift capability under SpaceX (Falcon family evolution).",
    ko: "SpaceX 재사용 로켓·이정표 및 Falcon 계열 중·대형 능력 진화 서술. — Grokipedia, SpaceX / Elon Musk",
  },
  "sec-2018": {
    pages: ["musk", "views"],
    en: "Musk is a polarizing figure. Supporters praise his innovation and risk-taking; critics point to management style, public statements… Legal and political scrutiny has included government contracts, securities matters…",
    ko: "양극화된 인물로 기술된다. 지지자는 혁신과 위험 감수를 평가하고, 비판은 경영 스타일·발언 등을 지적한다. 법적·정치적 검토에는 정부 계약·증권 이슈 등이 포함된다. — Grokipedia, Elon Musk",
  },
  "starlink-2019": {
    pages: ["spacex", "musk"],
    en: "Under Musk's direction, Starlink deploys thousands of small satellites in low Earth orbit for global broadband, targeting remote areas.",
    ko: "머스크 지휘 아래 Starlink는 저궤도 소형 위성 수천 기를 배치해 원격 지역을 겨냥한 글로벌 광대역을 제공한다. — Grokipedia, Elon Musk",
  },
  "crew-dragon-2020": {
    pages: ["spacex", "musk"],
    en: "Commercial Operations and crewed flight milestones on Grokipedia SpaceX/Elon Musk (NASA Commercial Crew lineage after cargo CRS).",
    ko: "화물 CRS 이후 NASA Commercial Crew 계열의 상업·유인 비행 이정표가 SpaceX/Elon Musk 페이지에 정리된다. — Grokipedia",
  },
  "model-y-2020": {
    pages: ["tesla", "musk"],
    en: "…the Model Y compact crossover released in 2020…",
    ko: "2020년 Model Y 컴팩트 크로스오버 출시. — Grokipedia, Elon Musk",
  },
  "twitter-2022": {
    pages: ["musk", "views"],
    en: "Musk acquired Twitter in 2022, rebranded it as X, and positioned it as a platform prioritizing free speech and evolving toward an \"everything app\" with integrated payments and communication. Musk described free speech and Twitter's role as a \"digital town square\" as key motivations.",
    ko: "2022년 Twitter를 인수한 뒤 X로 리브랜딩하고, 자유 발언을 우선하며 결제·커뮤니케이션을 통합한 “everything app”으로 발전시키려 한다고 위치 지었다. 자유 발언과 “디지털 타운 스퀘어”를 핵심 동기로 서술했다고 적혀 있다. — Grokipedia, Elon Musk",
  },
  "x-rebrand-2023": {
    pages: ["musk"],
    en: "…rebranded it as X… Musk envisioned X as an \"everything app\" like WeChat, integrating social media, payments, and more.",
    ko: "X로 리브랜딩. WeChat처럼 소셜·결제 등을 통합한 “everything app” 비전이 기술된다. — Grokipedia, Elon Musk",
  },
  "xai-2023": {
    pages: ["musk"],
    en: "…founder of xAI… developing safe and truth-seeking artificial general intelligence with xAI…",
    ko: "xAI 설립자. xAI로 안전하고 진실 추구적인 인공일반지능을 개발한다고 기술된다. — Grokipedia, Elon Musk",
  },
  "neuralink-human-2024": {
    pages: ["musk"],
    en: "Neuralink: Development and Technology / Human Trials and Progress sections; implantable brain-machine interfaces for medical and enhancement uses.",
    ko: "Neuralink 개발·기술 및 인체 임상 진행 섹션. 의료·증강용 이식형 뇌-기계 인터페이스. — Grokipedia, Elon Musk",
  },
  "cybertruck-2023": {
    pages: ["tesla", "musk"],
    en: "Products and technology / future vehicle lineup under Tesla leadership (Cybertruck among later production vehicles).",
    ko: "Tesla 제품·기술 및 이후 생산 차량 라인업 서술(Cybertruck 포함). — Grokipedia, Tesla / Elon Musk",
  },
  "trump-support-2024": {
    pages: ["views", "musk"],
    en: "Views of Elon Musk covers American Politics, Elections and Political Endorsements, Relationship with Donald Trump, and Government Efficiency and Bureaucracy.",
    ko: "Views of Elon Musk 문서에 미국 정치, 선거·지지, 트럼프와의 관계, 정부 효율·관료제가 항목으로 있다. — Grokipedia, Views of Elon Musk",
  },
  "doge-announce-2024": {
    pages: ["musk", "views"],
    en: "He briefly co-led the Department of Government Efficiency (DOGE) in the U.S. federal government in 2025 alongside Vivek Ramaswamy before stepping down amid reported differences.",
    ko: "2025년 미국 연방정부 Department of Government Efficiency(DOGE)를 Vivek Ramaswamy와 함께 잠시 공동 리드했다가, 보도된 이견 속에 물러났다. — Grokipedia, Elon Musk",
  },
  "doge-eo-2025": {
    pages: ["musk", "views"],
    en: "…briefly co-led the Department of Government Efficiency (DOGE)… Government Efficiency and Bureaucracy is a listed topic under Views of Elon Musk.",
    ko: "DOGE 공동 리드가 본문에 기술되고, Views 문서에 Government Efficiency and Bureaucracy 항목이 있다. — Grokipedia",
  },
  "doge-exit-2025": {
    pages: ["musk"],
    en: "…before stepping down amid reported differences. …making him a polarizing yet immensely influential figure in technology, business, politics, and culture.",
    ko: "보도된 이견 속에 물러났다. 기술·사업·정치·문화에서 양극화되면서도 막대한 영향력을 지닌 인물로 기술된다. — Grokipedia, Elon Musk",
  },
  "tesla-comp-2025": {
    pages: ["tesla", "musk"],
    en: "Leadership roles and compensation is a dedicated Tesla subsection on Grokipedia’s Elon Musk page.",
    ko: "Grokipedia Elon Musk 페이지 Tesla 아래에 Leadership roles and compensation 소절이 있다. — Grokipedia, Elon Musk",
  },
  "spacex-ipo-2026": {
    pages: ["spacex", "musk"],
    en: "SpaceX: Continued Starship testing, Starlink expansion, and preparations for potential IPO. … Wealth milestones and public-company status of related holdings are discussed in wealth sections.",
    ko: "SpaceX: Starship 시험·Starlink 확장·잠재적 IPO 준비가 서술된다. 관련 부의 이정표·상장 지위도 wealth 서술과 연결된다. — Grokipedia, Elon Musk",
  },
  "tesla-ai-day-2021": {
    pages: ["tesla", "musk"],
    en: "Robotics and future concepts / Optimus sections; Optimus humanoid robots listed among Tesla future focus areas.",
    ko: "Robotics and future concepts·Optimus 섹션. Tesla 미래 초점으로 Optimus 휴머노이드가 언급된다. — Grokipedia, Elon Musk",
  },
  "optimus-prototype-2022": {
    pages: ["tesla", "musk"],
    en: "Optimus humanoid robots… central to longer-term Tesla product narrative on Grokipedia.",
    ko: "Optimus 휴머노이드가 Tesla 장기 제품 서사의 중심으로 기술된다. — Grokipedia, Elon Musk",
  },
  "we-robot-cybercab-2024": {
    pages: ["tesla", "musk"],
    en: "Cybercab is a steering-wheel-free autonomous vehicle central to Tesla's future vision.",
    ko: "Cybercab은 스티어링 휠이 없는 자율차로, Tesla 미래 비전의 중심으로 기술된다. — Grokipedia, Elon Musk",
  },
  "robotaxi-austin-2025": {
    pages: ["tesla", "musk"],
    en: "Tesla: Focus on scaling robotaxi (Cybercab) production… Cybercab is a steering-wheel-free autonomous vehicle central to Tesla's future vision.",
    ko: "Tesla 초점: 로보택시(Cybercab) 생산 스케일. Cybercab은 Tesla 미래 비전의 중심 자율차로 기술된다. — Grokipedia, Elon Musk",
  },
  "fsd-supervised": {
    pages: ["tesla"],
    en: "Autopilot/FSD and regulatory scrutiny is a listed Tesla subsection; FSD Beta launched in late 2020 as a Level 2 system requiring constant human supervision.",
    ko: "Autopilot/FSD 및 규제 검토 소절. FSD 베타는 2020년 말 상시 인간 감독이 필요한 Level 2로 출시되었다고 기술된다. — Grokipedia, Elon Musk",
  },
  "giga-shanghai-2019": {
    pages: ["tesla"],
    en: "International Expansion under Tesla on Grokipedia (Gigafactory network and global production).",
    ko: "Tesla International Expansion 소절에서 기가팩토리·글로벌 생산이 다뤄진다. — Grokipedia, Tesla / Elon Musk",
  },
  "giga-texas-2022": {
    pages: ["tesla"],
    en: "International Expansion / growth of manufacturing footprint (Texas Gigafactory in Tesla production geography).",
    ko: "제조 footprint 확장·텍사스 기가팩토리 등 생산 지리. — Grokipedia, Tesla / Elon Musk",
  },
  "semi-deliveries": {
    pages: ["tesla", "musk"],
    en: "…and the Tesla Semi electric semi-truck with production ramping in the 2020s.",
    ko: "2020년대 생산이 확대되는 Tesla Semi 전기 세미트럭이 핵심 제품 목록에 포함된다. — Grokipedia, Elon Musk",
  },
  "colossus-announce-2024": {
    pages: ["musk"],
    en: "In 2025, xAI faced regulatory challenges over air permits for methane gas turbines at its Colossus data center in Memphis, Tennessee… (Colossus named as xAI’s Memphis compute facility).",
    ko: "xAI의 멤피스 Colossus 데이터센터 메탄 가스터빈 대기 허가 관련 규제 이슈가 2025년 서술되며, Colossus가 멤피스 컴퓨트 시설로 명시된다. — Grokipedia, Elon Musk",
  },
  "colossus-online-2024": {
    pages: ["musk"],
    en: "Colossus data center in Memphis, Tennessee… (xAI compute infrastructure in Grokipedia’s AI / xAI coverage).",
    ko: "테네시 멤피스 Colossus 데이터센터 — xAI 컴퓨트 인프라로 본문에 등장. — Grokipedia, Elon Musk",
  },
  "colossus-scale-2025": {
    pages: ["musk"],
    en: "xAI / Colossus regulatory and expansion coverage; integration of xAI with broader compute ambitions.",
    ko: "xAI·Colossus 확장·규제 서술 및 컴퓨트 야심과의 연결. — Grokipedia, Elon Musk",
  },
  "grok-launch": {
    pages: ["musk"],
    en: "…deeper integration of its AI technologies, including Grok, into the social platform… evolving towards an integrated AI-social ecosystem.",
    ko: "Grok을 포함한 AI 기술을 소셜 플랫폼에 더 깊게 통합하고, AI-소셜 통합 생태계로 진화한다고 기술된다. — Grokipedia, Elon Musk",
  },
  "twitter-stake-2022-apr": {
    pages: ["musk"],
    en: "Musk acquired Twitter in 2022… (acquisition process begins with public stake and bid path on Grokipedia).",
    ko: "2022년 Twitter 인수 — 공개 지분·매수 경로가 인수 서술의 일부. — Grokipedia, Elon Musk",
  },
  "twitter-deal-close-2022-oct": {
    pages: ["musk"],
    en: "Musk acquired Twitter in 2022, rebranded it as X, and positioned it as a platform prioritizing free speech…",
    ko: "2022년 Twitter 인수 후 X로 리브랜딩, 자유 발언을 우선하는 플랫폼으로 위치. — Grokipedia, Elon Musk",
  },
  "x-premium-ads": {
    pages: ["musk"],
    en: "Acquisition and changes at X sparked debates over content moderation and free speech (Grokipedia Controversies and Public Image).",
    ko: "X 인수·변경이 콘텐츠 중재·자유 발언 논쟁을 촉발했다고 Controversies and Public Image에 기술된다. — Grokipedia, Elon Musk",
  },
  "starship-ift1-2023": {
    pages: ["spacex", "musk"],
    en: "SpaceX: Continued Starship testing… Starship Version 3… reusability and orbital refueling… (Starship flight-test campaign).",
    ko: "Starship 시험 지속·재사용·궤도 급유 등 Starship 비행 시험 캠페인이 서술된다. — Grokipedia, Elon Musk / SpaceX",
  },
  "crew-1-2020": {
    pages: ["spacex"],
    en: "Commercial crew / ISS logistics milestones under SpaceX commercial operations.",
    ko: "SpaceX 상업 운영 하 유인·ISS 물류 이정표. — Grokipedia, SpaceX",
  },
  "starlink-commercial-2021": {
    pages: ["spacex", "musk"],
    en: "Under Musk's direction, Starlink deploys thousands of small satellites in low Earth orbit for global broadband, targeting remote areas.",
    ko: "Starlink: 저궤도 소형 위성 수천 기, 원격 지역 대상 글로벌 광대역. — Grokipedia, Elon Musk",
  },
  "falcon9-block5": {
    pages: ["spacex"],
    en: "Falcon 9 first-stage recovery… iterative software and hardware improvements; reusable rocketry milestones.",
    ko: "Falcon 9 1단 회수·반복적 소프트·하드웨어 개선 등 재사용 로켓 이정표. — Grokipedia, Elon Musk",
  },
  "artemis-hls": {
    pages: ["spacex", "musk"],
    en: "Interplanetary Transport and Lunar Ambitions / NASA partnership coverage on Grokipedia SpaceX and Elon Musk pages.",
    ko: "행성 간 수송·달 야심 및 NASA 파트너십 관련 서술. — Grokipedia, SpaceX / Elon Musk",
  },
  "richest-2021": {
    pages: ["musk", "awards"],
    en: "As of late April 2026, Musk is the world's richest person with a net worth estimated at approximately $785 billion… having reached earlier peaks exceeding $839 billion. Wealth experiences significant fluctuations primarily driven by Tesla… and SpaceX.",
    ko: "2026년 4월 말 기준 세계 최고 부호로, 순자산 약 7850억 달러(포브스 실시간 등), 이전 고점 8390억 달러 초과. 부의 변동은 주로 Tesla 주가와 SpaceX 가치에 연동. — Grokipedia, Elon Musk",
  },
  "trillionaire-2026": {
    pages: ["musk", "spacex"],
    en: "Wealth Milestones: Became the first person to reach $400 billion (2024), $500 billion (late 2025), $600–700 billion (December 2025), and crossed $800 billion in early 2026… preparations for potential IPO (SpaceX).",
    ko: "부 이정표: 2024년 4000억, 2025년 말 5000억, 2025년 12월 6000–7000억, 2026년 초 8000억 달러 돌파 등이 기술되고, SpaceX 잠재적 IPO 준비가 언급된다. — Grokipedia, Elon Musk",
  },
  "openai-lawsuit-2024": {
    pages: ["musk"],
    en: "OpenAI founding as nonprofit for safe AGI… later for-profit subsidiary discussions and control/equity disputes are detailed on Grokipedia.",
    ko: "안전한 AGI를 위한 비영리 설립과, 이후 영리 자회사·지분·통제 관련 이견이 상세히 기술된다. — Grokipedia, Elon Musk",
  },
  "neuralink-fda": {
    pages: ["musk"],
    en: "Human Trials and Progress under Neuralink; implantable brain-machine interfaces for medical and enhancement uses.",
    ko: "Neuralink Human Trials and Progress. 의료·증강용 이식형 BMI. — Grokipedia, Elon Musk",
  },
  "zip2-sorkin": {
    pages: ["musk"],
    en: "Zip2: Investments, Expansion, and Leadership Transition (1996); Merger Attempt and Acquisition (1998–1999).",
    ko: "Zip2: 투자·확장·리더십 전환(1996), 합병 시도·인수(1998–1999) 소절. — Grokipedia, Elon Musk",
  },
  "paypal-ousted": {
    pages: ["musk"],
    en: "X.com/PayPal leadership transitions after the Confinity merger are part of the PayPal chronology on Grokipedia.",
    ko: "Confinity 합병 이후 X.com/PayPal 리더십 전환이 PayPal 연대기에 포함된다. — Grokipedia, Elon Musk",
  },
  "falcon1-failures": {
    pages: ["spacex", "musk"],
    en: "…flat communication structure… repeated failure-feedback-correction loops… as demonstrated in SpaceX's early rocket development where initial explosions informed successive improvements leading to the fourth successful Falcon 1 launch.",
    ko: "초기 폭발이 연속 개선에 반영되어 네 번째 Falcon 1 성공으로 이어진 실패-피드백-수정 루프가 예시로 든다. — Grokipedia, Elon Musk",
  },
  "tesla-near-death-2008": {
    pages: ["tesla", "musk"],
    en: "Early leadership transition and crisis (2007-2008); Financial recovery and funding (2008-2013).",
    ko: "초기 리더십 전환과 위기(2007–2008); 재무 회복과 자금(2008–2013). — Grokipedia, Elon Musk",
  },
};

(function applyGrokipedia() {
  const G = window.GROKIPEDIA;
  const C = window.GROKIPEDIA_CITE || {};
  if (!window.TIMELINE_EVENTS || !G) return;

  function sourcesFor(pages) {
    const keys = pages && pages.length ? pages : ["musk"];
    return keys.map((k) => {
      const p = G.pages[k] || G.pages.musk;
      return { name: p.name, tier: "A", url: p.url, provider: "grokipedia" };
    });
  }

  window.TIMELINE_EVENTS.forEach((ev) => {
    const c = C[ev.id];
    const pages = c ? c.pages : ["musk"];
    ev.sources = sourcesFor(pages);
    if (c) {
      ev.citation = { ko: c.ko, en: c.en };
    } else {
      ev.citation = {
        ko: G.missionQuote.ko,
        en: G.missionQuote.en + " — Grokipedia, Elon Musk",
      };
    }
    // remove legacy field if present
    delete ev.assessment;
  });

  if (window.DEEP_COPY) {
    Object.keys(C).forEach((id) => {
      if (!window.DEEP_COPY[id]) window.DEEP_COPY[id] = {};
      const d = window.DEEP_COPY[id];
      ["ko", "en"].forEach((lang) => {
        if (!d[lang]) d[lang] = {};
        d[lang].citation = C[id][lang];
        delete d[lang].assessment;
      });
    });
  }
})();
