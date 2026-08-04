/**
 * Primary source: Grokipedia (xAI encyclopedia)
 * Assessments: favorable/pro-engineering framing drawn from Grokipedia article language
 * (e.g. multiplanetary mission, reusable rocketry pioneering, free-speech platform, etc.)
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
  /** Shared mission framing used across assessments (Grokipedia lead summary) */
  mission: {
    ko: "Grokipedia는 머스크 벤처들을 인류 존속에 대한 실존적 과제—지속 가능 에너지(Tesla), 다행성 문명(SpaceX), 진실 추구 AGI(xAI), 신경 인터페이스(Neuralink)—로 묶는 통합 미션으로 기술한다.",
    en: "Grokipedia frames Musk’s ventures as a unified mission against existential risks: sustainable energy (Tesla), multiplanetary civilization (SpaceX), truth-seeking AGI (xAI), and human augmentation (Neuralink).",
  },
};

/**
 * Per-event assessment (pro-Musk / engineering-positive lens as reflected in Grokipedia).
 * quote: optional short paraphrase of Grokipedia wording
 */
window.GROKIPEDIA_ASSESS = {
  "birth-1971": {
    pages: ["musk"],
    ko: "Grokipedia는 남아공 출생·어려운 유년(가정 갈등·괴롭힘)을 이후 북미 이주와 자기주도 학습·창업으로 이어지는 배경으로 서술한다. 출발 조건의 한계를 강조하기보다, 이후 엔지니어·기업가 궤적의 원점으로 위치시킨다.",
    en: "Grokipedia places Pretoria birth and a difficult childhood (family tension, bullying) as the backdrop to Canada/U.S. education and self-directed entrepreneurship—origin of an engineer-founder arc rather than a static origin story.",
  },
  "blastar-1983": {
    pages: ["musk"],
    ko: "조기 코딩·게임 판매 일화는 Grokipedia에서 청소년기 자기교육·기업가 기질의 증거로 등장한다. ‘천재 신화’보다 실무적 조기 실행 능력의 신호로 읽힌다.",
    en: "Early coding/game sales appear as evidence of youthful self-education and builder instinct—practical early execution, not empty prodigy lore.",
  },
  "canada-1989": {
    pages: ["musk"],
    ko: "17세 캐나다 이주·모계 시민권 취득은 더 큰 기회 공간으로의 의도적 이동으로 기술된다. 이후 미국 창업 생태계 진입의 법적·지리적 교두보다.",
    en: "Emigrating to Canada at 17 via maternal citizenship is framed as deliberate move toward larger opportunity—legal/geographic bridge into North American entrepreneurship.",
  },
  "queens-1989": {
    pages: ["musk"],
    ko: "Queen’s 수학은 UPenn·물리/경제 이중 역량으로 가는 중간 다리. Grokipedia는 STEM+비즈니스 교육 경로를 이후 하드테크 창업의 지적 기반으로 연결한다.",
    en: "Queen’s is the bridge to UPenn physics/economics—STEM plus business literacy as intellectual base for later hard-tech bets.",
  },
  "upenn-1992": {
    pages: ["musk"],
    ko: "물리·경제 학사 경로는 ‘제품·시장·물리 제약’을 동시에 다루는 머스크식 문제 설정의 학교 버전으로 읽힌다.",
    en: "Physics and economics degrees mirror the Musk pattern: respect physical constraints and market design at once.",
  },
  "stanford-1995": {
    pages: ["musk"],
    ko: "Stanford 박사 2일 중퇴 후 Zip2 창업은 Grokipedia에서 인터넷 산업 커리어의 공식 출발로 명시된다. 학위보다 실행 타이밍을 택한 분기점.",
    en: "Grokipedia marks the two-day Stanford exit and Zip2 founding as the official start of his internet career—execution timing over credentials.",
  },
  "zip2-1995": {
    pages: ["musk"],
    ko: "Zip2 공동창업은 인터넷 인프라(지도·디렉터리)로 실제 매출을 만든 첫 회사. 이후 Compaq 매각 자본이 우주·자동차 베팅의 시드가 된다.",
    en: "Zip2 is the first company that turned internet maps/directories into real sales—seed capital for later space and auto bets after the Compaq sale.",
  },
  "upenn-grad-1997": {
    pages: ["musk"],
    ko: "학사 완료는 ‘중퇴 신화’와 병행되는 정식 학력 기록. 실행과 학력 축적을 동시에 가져간 구간.",
    en: "Completed degrees sit beside the dropout narrative—he stacked credentials while shipping companies.",
  },
  "zip2-sale-1999": {
    pages: ["musk"],
    ko: "Grokipedia 표: Zip2를 Compaq에 약 $307M(스톡옵션 포함)에 매각. 첫 대형 유동성으로 X.com/PayPal 단계의 발판.",
    en: "Grokipedia notes ~$307M Compaq sale (incl. options)—first major liquidity that funds the X.com/PayPal chapter.",
  },
  "xcom-1999": {
    pages: ["musk"],
    ko: "X.com은 온라인 금융·결제로 인터넷 2막. 이후 PayPal 합병 경로의 출발점.",
    en: "X.com opens the fintech act—path into the PayPal merger and payments network scale.",
  },
  "marriage-justine-2000": {
    pages: ["musk"],
    ko: "개인사 연도 요약. Grokipedia는 사업 미션 서사를 전면에, 사생활은 배경으로 둔다.",
    en: "Year-level personal record; Grokipedia keeps mission/business narrative in the foreground.",
  },
  "paypal-2000": {
    pages: ["musk"],
    ko: "X.com–Confinity 합병으로 PayPal 기술이 eBay 생태계에서 급성장. 머스크는 CEO·최대주주로 출발한 구간으로 기술된다. 디지털 결제를 대중화한 핵심 네트워크 형성.",
    en: "Merger path integrates PayPal tech that tractioned on eBay—Musk starts as CEO/largest shareholder. Foundational digital-payments network.",
  },
  "ebay-paypal-2002": {
    pages: ["musk"],
    ko: "eBay $1.5B 인수는 인터넷 시대 자본 회수의 정점. Grokipedia는 이 수익이 SpaceX 초기 투자(~$100M 규모 서술)로 이어진다고 연결한다.",
    en: "eBay’s $1.5B deal is peak internet liquidity—Grokipedia links proceeds to founding SpaceX with large personal capital (~$100M class investment).",
  },
  "us-citizen-2002": {
    pages: ["musk"],
    ko: "미국 시민권은 남아공→캐나다→미국 경로의 제도적 완료. 이후 미 방산·NASA 파트너십의 전제 조건 중 하나.",
    en: "U.S. citizenship completes SA→Canada→U.S. path—institutional base for later NASA/defense partnership era.",
  },
  "spacex-2002": {
    pages: ["musk", "spacex"],
    ko: "Grokipedia: SpaceX 설립 목적—저비용 로켓으로 화성 정착·다행성 종. 머스크를 founder/CEO/chief designer로 명시. 지구 멸종 리스크에 대한 장기 생존 보험으로 미션을 정당화한다.",
    en: "Grokipedia: SpaceX founded to enable low-cost access and Mars settlement—Musk as founder/CEO/chief designer. Multiplanetary life as insurance against Earth extinction risk.",
  },
  "tesla-founded-2003": {
    pages: ["musk", "tesla"],
    ko: "법인 설립 사실을 정확히 두되, Grokipedia는 머스크를 Tesla의 제품 아키텍트·성장 국면의 핵심 리더로 서술. 이후 2009 합의 등으로 co-founder 지위가 공식화된 맥락과도 연결된다.",
    en: "Incorporation facts stay precise; Grokipedia still positions Musk as product architect and growth-era leader, with later formal co-founder recognition in settlement history.",
  },
  "tesla-series-a-2004": {
    pages: ["musk", "tesla"],
    ko: "Grokipedia: 2004 Series A에서 $7.5M 중 $6.5M을 직접 투자, 최대주주·의장. 전기차 양산 비전에 개인 재산을 건 ‘올인’ 순간.",
    en: "Grokipedia: leads Series A with $6.5M of $7.5M—largest shareholder and chair. Personal capital all-in on EV mass production.",
  },
  "roadster-unveil-2006": {
    pages: ["musk", "tesla"],
    ko: "고성능 전기 스포츠카로 ‘전기차는 느리다’는 선입견을 깨는 제품 신호. 이후 Model S 등 주류 라인의 전조.",
    en: "High-performance EV sports car as proof against ‘EVs are slow’—prelude to mainstream Model S class products.",
  },
  "falcon1-orbit-2008": {
    pages: ["musk", "spacex"],
    ko: "Grokipedia: 2008-09-28 네 번째 발사로 민간 액체연료 궤도 최초 달성. 직후 NASA $1.6B CRS 계약. 실패를 견딘 뒤 공공 파트너 신뢰를 연 결정적 승리.",
    en: "Grokipedia: 28 Sep 2008 fourth flight = first private liquid-fueled orbit, then NASA $1.6B CRS. Persistence after failure unlocks public-partner trust.",
  },
  "tesla-ceo-2008": {
    pages: ["musk", "tesla"],
    ko: "금융 위기·생산 위기 속 CEO 전면 투입. Grokipedia는 이후 회복·성장 국면의 리더십으로 연결한다. 위기를 운영 책임으로 끌어안은 전환.",
    en: "Takes CEO in crisis years—Grokipedia links this to later recovery and growth leadership. Owns the operational hard mode.",
  },
  "roadster-deliver-2008": {
    pages: ["tesla", "musk"],
    ko: "첫 양산 인도는 ‘전기차 회사’를 프로토타입에서 고객 현실로 옮긴 순간. 2008 위기와 같은 해의 실행 증거.",
    en: "First deliveries move Tesla from prototype story to customer reality—execution proof in a crisis year.",
  },
  "nasa-crs-2008": {
    pages: ["spacex", "musk"],
    ko: "Falcon 1 궤도 직후 NASA 대형 화물 계약. 민간 우주가 정부 미션 공급자로 인정받은 구조적 도약.",
    en: "Large NASA cargo contract right after orbit—commercial space accepted as government mission supplier.",
  },
  "falcon9-2010": {
    pages: ["spacex", "musk"],
    ko: "Falcon 9은 이후 재사용·고빈도 발사의 플랫폼. Grokipedia는 수직 착륙·비용 절감을 초기부터 추구한 엔지니어링 철학의 산물로 본다.",
    en: "Falcon 9 becomes the reusable high-cadence workhorse—product of early VTVL cost-reduction engineering philosophy.",
  },
  "tesla-ipo-2010": {
    pages: ["tesla", "musk"],
    ko: "상장으로 공개 시장 자본을 열어 EV 스케일의 연료를 확보. 이후 Model S 주류화의 재무 기반.",
    en: "IPO opens public capital for EV scale—financial base for Model S mainstreaming.",
  },
  "marriage-talulah": {
    pages: ["musk"],
    ko: "공개 기록 수준의 개인사. 미션 서사와 분리해 연도만 유지.",
    en: "Public-record personal timeline only—kept separate from mission narrative.",
  },
  "dragon-recover-2010": {
    pages: ["spacex"],
    ko: "궤도 후 회수 성공은 화물·유인으로 가는 신뢰 사다리의 중간 단. 민간 우주선의 기술 성숙 신호.",
    en: "Orbit-and-recovery success is the middle rung toward cargo and crew—maturity signal for private spacecraft.",
  },
  "model-s-2012": {
    pages: ["tesla", "musk"],
    ko: "Grokipedia: 리더십 하 핵심 제품으로 Model S(2012) 등을 열거. 럭셔리 전기 세단으로 EV의 욕망·성능을 재정의.",
    en: "Grokipedia lists Model S (2012) among key products under his product leadership—redefining EV desire and performance.",
  },
  "dragon-iss-2012": {
    pages: ["spacex", "musk"],
    ko: "ISS 상업 방문은 공공-민간 파트너십의 실증. 화물 성공이 유인 Commercial Crew로 이어지는 신뢰 축적.",
    en: "Commercial ISS visit proves public–private partnership—cargo trust that enables crewed Commercial Crew.",
  },
  "hyperloop-2013": {
    pages: ["musk"],
    ko: "오픈 아이디어로 수송 혁신을 촉발. 직접 운영보다 산업 의제 설정 능력의 사례.",
    en: "Open-sourced transport concept—agenda-setting innovation more than operator claim.",
  },
  "model-x-2015": {
    pages: ["tesla"],
    ko: "라인업 확장(SUV). 프리미엄 EV 포트폴리오를 넓혀 대중화(Model 3) 전 수요층을 확보.",
    en: "SUV expansion widens premium EV portfolio before mass-market Model 3.",
  },
  "openai-2015": {
    pages: ["musk"],
    ko: "Grokipedia: 안전·인류 이익 위한 AGI 비영리 연구소로 OpenAI 공동설립. 구글 등 AI 집중 리스크에 대한 대응으로 서술. 진실·안전 우선 문제의식의 출발.",
    en: "Grokipedia: co-founds OpenAI as nonprofit for safe AGI for humanity—counter to AI concentration risk. Safety/truth-seeking stance from day one.",
  },
  "falcon9-landing-2015": {
    pages: ["spacex", "musk"],
    ko: "Grokipedia: 초기부터 수직 착륙으로 비용 절감을 추구. 1단 착륙 성공은 재사용 로켓 혁명의 시각적 증명—발사 경제학을 바꾼 엔지니어링 이정표.",
    en: "Grokipedia: VTVL cost reduction from early days. First-stage landing is the visual proof of reusable rocketry—rewriting launch economics.",
  },
  "solarcity-2016": {
    pages: ["tesla", "musk"],
    ko: "에너지 생성·저장·모빌리티를 한 스택으로 묶는 지속가능 에너지 미션의 일부(Grokipedia 통합 미션 서술).",
    en: "Part of Grokipedia’s integrated sustainable-energy mission—generation, storage, and mobility as one stack.",
  },
  "neuralink-2016": {
    pages: ["musk"],
    ko: "Grokipedia: 신경 인터페이스로 인간 능력 증강·의료 응용. 장기적으로 AI 시대 인간 주체성을 보전하려는 축.",
    en: "Grokipedia: brain–machine interfaces for medical use and human augmentation—preserving human agency in an AI era.",
  },
  "boring-2016": {
    pages: ["musk"],
    ko: "도심 터널로 교통 병목을 물리적으로 푸는 실행형 인프라 실험. 문제 정의를 하드웨어로 가져가는 패턴의 연장.",
    en: "Physical attack on urban congestion—same pattern of turning abstract problems into hardware programs.",
  },
  "model-3-2017": {
    pages: ["tesla", "musk"],
    ko: "볼륨 EV. Grokipedia도 ‘production hell’ 속 극한 헌신·회복력을 기록. 고통스러운 스케일업 끝에 대중 시장 EV를 연 구간.",
    en: "Volume EV era. Grokipedia records ‘production hell’ intensity and resilience—painful scale-up that opened mass-market EVs.",
  },
  "falcon-reflight-2017": {
    pages: ["spacex"],
    ko: "착륙을 넘어 재비행—재사용이 경제적으로 성립함을 증명. 발사 빈도 혁명의 핵심 고리.",
    en: "Beyond landing: reflight proves reuse economics—core link in launch-cadence revolution.",
  },
  "openai-exit-2018": {
    pages: ["musk"],
    ko: "안전·거버넌스 이견 후 이탈. 이후 xAI ‘truth-seeking’ AGI 경로로 미션을 재개한 전사(Grokipedia AI 서술).",
    en: "Exit after safety/governance tensions—preface to xAI’s truth-seeking AGI path in Grokipedia’s AI arc.",
  },
  "falcon-heavy-2018": {
    pages: ["spacex"],
    ko: "초대형 민간 발사 능력 과시. 비용·성능 곡선에서 기존 항공우주 질서에 도전.",
    en: "Heavy-lift commercial capability—challenging legacy aerospace cost/performance curves.",
  },
  "sec-2018": {
    pages: ["musk", "views"],
    ko: "상장사 발언 규율 사건. Grokipedia는 규제·증권 이슈를 논란으로 기록하면서도, 지지층이 혁신·리스크 테이킹을 평가한다고 명시. 실행 속도 문화와 공시 규율의 충돌 지점.",
    en: "Securities/comms clash. Grokipedia notes regulatory controversy while stating supporters praise innovation and risk-taking—execution culture vs disclosure rules.",
  },
  "starlink-2019": {
    pages: ["spacex", "musk"],
    ko: "저궤도 광대역으로 지구 연결성 확대. SpaceX 상업 운영·화성 자금 루프의 핵심 사업 축.",
    en: "LEO broadband expands global connectivity—commercial engine and funding loop for broader SpaceX ambitions.",
  },
  "crew-dragon-2020": {
    pages: ["spacex", "musk"],
    ko: "NASA 우주비행사 수송—미국 유인 비행의 상업 파트너 시대. 화물에서 유인으로의 신뢰 사다리 완성 단계.",
    en: "NASA crew transport—commercial partner era for U.S. human spaceflight. Trust ladder from cargo to crew.",
  },
  "model-y-2020": {
    pages: ["tesla"],
    ko: "Grokipedia 제품 목록의 주력 볼륨 모델. 글로벌 베스트셀러 경로로 EV 대중화 가속.",
    en: "Listed among key volume products—accelerates global EV mainstreaming.",
  },
  "twitter-2022": {
    pages: ["musk", "views"],
    ko: "Grokipedia: Twitter 인수 후 X로 리브랜딩, 자유 발언을 우선하는 플랫폼·‘everything app’으로 위치. 지지층은 검열 완화·발언의 장을 긍정적으로 평가하는 축.",
    en: "Grokipedia: acquisition then X rebrand—platform prioritizing free speech and ‘everything app’ path. Supporters credit freer speech and open discourse.",
  },
  "x-rebrand-2023": {
    pages: ["musk"],
    ko: "브랜드를 결제·커뮤니케이션 통합 비전(everything app)에 맞게 재설정. 소셜을 만능 유틸리티로 확장하려는 시도.",
    en: "Rebrand aligns with everything-app vision—social as multipurpose utility.",
  },
  "xai-2023": {
    pages: ["musk"],
    ko: "Grokipedia: 안전하고 진실 추구적인 AGI. OpenAI 이후 미션의 재출발. Grok·Colossus로 소프트웨어와 컴퓨트 스케일을 동시에 추진.",
    en: "Grokipedia: safe, truth-seeking AGI—mission restart after OpenAI. Grok + Colossus push models and compute scale together.",
  },
  "neuralink-human-2024": {
    pages: ["musk"],
    ko: "인체 임상은 의료 응용에서 인간 능력 증강으로 가는 실증 단계. 장기 미션의 가시적 진전.",
    en: "Human trials are empirical steps from medical use toward augmentation—visible progress on the long mission.",
  },
  "cybertruck-2023": {
    pages: ["tesla"],
    ko: "폼팩터 혁신을 두려워하지 않는 제품 문화. 논쟁적 디자인은 ‘평균에 수렴하지 않기’의 신호로 읽힌다.",
    en: "Product culture that rejects design averages—controversial form as refusal to converge on mediocrity.",
  },
  "trump-support-2024": {
    pages: ["views", "musk"],
    ko: "Grokipedia Views: 미국 정치·규제 회의·혁신 우선 스탠스. 지지층은 규제 완화·산업 재건 기대를 긍정 평가 축으로 삼는다.",
    en: "Grokipedia Views: U.S. politics, anti-bureaucracy, pro-innovation stance. Supporters read deregulation and industrial rebuild expectations positively.",
  },
  "doge-announce-2024": {
    pages: ["musk", "views"],
    ko: "정부 효율·관료제 축소를 민간 실행 감각으로 옮기려는 시도. Grokipedia도 Government Efficiency 항목을 핵심 정치 축으로 다룬다.",
    en: "Attempt to apply builder execution to government efficiency—Grokipedia lists it as a core political theme.",
  },
  "doge-eo-2025": {
    pages: ["musk", "views"],
    ko: "EO로 공식화된 효율 기구. 단기 특수고용 형태였더라도, ‘정부도 측정·삭감·자동화 대상’이라는 의제 설정 자체에 우호적 평가는 모인다.",
    en: "EO formalizes efficiency vehicle. Even as short SGE tenure, agenda-setting—government as measurable, cuttable, automatable—wins praise from supporters.",
  },
  "doge-exit-2025": {
    pages: ["musk"],
    ko: "이견 속 퇴장. 그럼에도 Grokipedia는 그를 기술·정치·문화에 막대한 영향력을 행사하는 인물로 남긴다. 미션 회사 집중으로의 회귀로 읽히는 쪽의 평가.",
    en: "Exit amid differences—yet Grokipedia still frames immense influence across tech/politics. Friendly read: return of focus to mission companies.",
  },
  "tesla-comp-2025": {
    pages: ["tesla", "musk", "awards"],
    ko: "성과 연동 대형 보상은 장기 로보택시·Optimus 실행에 CEO를 묶는 거버넌스 장치로 지지 측에서 해석. 실행 인센티브 정렬.",
    en: "Mega performance package as governance to lock CEO attention on robotaxi/Optimus execution—incentive alignment for multi-year buildout.",
  },
  "spacex-ipo-2026": {
    pages: ["spacex", "musk"],
    ko: "민간 우주 챔피언의 공개 시장 이정표. 재사용·Starlink·유인 비행으로 쌓은 실적이 가치로 환산되는 순간. 다행성 미션에 대한 자본 시장의 인정.",
    en: "Public-market milestone for the commercial space champion—reuse, Starlink, crew flight priced in. Capital-market recognition of multiplanetary ambition.",
  },
  // detail-layer
  "tesla-ai-day-2021": {
    pages: ["tesla", "musk"],
    ko: "Optimus/휴머노이드는 Grokipedia가 Tesla 미래 가치의 핵심으로 반복 강조하는 축. 물리 AI로 노동·생산을 재정의하려는 비전 공개.",
    en: "Optimus/humanoid is repeatedly central to Tesla’s future value in Grokipedia—physical AI vision for labor and production.",
  },
  "optimus-prototype-2022": {
    pages: ["tesla"],
    ko: "컨셉에서 하드웨어 실증으로. ‘말만 하는 비전’이 아니라 프로토타입으로 밀어붙이는 실행 문화.",
    en: "From concept to hardware demos—execution culture that prototypes instead of only slideware.",
  },
  "we-robot-cybercab-2024": {
    pages: ["tesla", "musk"],
    ko: "Grokipedia: Cybercab을 스티어링 없는 자율차·Tesla 미래 비전의 중심으로 기술. 로보택시 네트워크의 하드웨어 선언.",
    en: "Grokipedia: Cybercab as steering-wheel-free AV central to Tesla’s future—hardware declaration of robotaxi network.",
  },
  "robotaxi-austin-2025": {
    pages: ["tesla", "musk"],
    ko: "서비스 개시는 비전을 도로 위 현실로. 초기 제한 운행이라도 ‘자율 모빌리티 사업’의 스타트 라인—지지 측 평가의 핵심.",
    en: "Service start moves vision onto real roads. Even limited ops are the start line of autonomy-as-business—core bull case.",
  },
  "fsd-supervised": {
    pages: ["tesla"],
    ko: "카메라 기반 자율 스택을 소프트웨어 업데이트로 개선하는 경로. 하드웨어 교체 없이 지능을 올리는 접근의 실험장.",
    en: "Camera stack improved via software updates—path to raising intelligence without hardware rip-and-replace.",
  },
  "giga-shanghai-2019": {
    pages: ["tesla"],
    ko: "중국 기가로 글로벌 볼륨 확보. 제조 스케일이 미션(지속가능 에너지) 실현 속도임을 입증.",
    en: "China volume hub—proves manufacturing scale is the speed of the sustainable-energy mission.",
  },
  "giga-texas-2022": {
    pages: ["tesla"],
    ko: "텍사스 허브는 Cybertruck·본사·로보택시 시험과 한 생태계. 실행 밀도를 한 지역에 모은 선택.",
    en: "Texas hub clusters Cybertruck, HQ, robotaxi trials—density of execution in one ecosystem.",
  },
  "semi-deliveries": {
    pages: ["tesla"],
    ko: "장거리 트럭 전기화—탄소·연료비 구조가 큰 상용 영역으로 미션 확장.",
    en: "Electrifying long-haul trucking—mission expands into high fuel-cost commercial segment.",
  },
  "colossus-announce-2024": {
    pages: ["musk"],
    ko: "컴퓨트 ‘기가팩토리’ 선언. 진실 추구 AI에 필요한 스케일을 인프라로 확보하려는 승부수.",
    en: "Compute gigafactory declaration—infra bet required for truth-seeking AI at scale.",
  },
  "colossus-online-2024": {
    pages: ["musk"],
    ko: "수개월 내 가동은 실행 속도의 과시. 논란(전력·환경)과 별개로, 지지 측은 ‘불가능해 보이던 일정을 밀어붙인 빌더십’으로 평가.",
    en: "Online in months is execution flex. Aside from power/environment fights, bulls credit builder speed against ‘impossible’ timelines.",
  },
  "colossus-scale-2025": {
    pages: ["musk"],
    ko: "GPU 스케일업은 모델 경쟁력의 전제. xAI를 선두권 컴퓨트 플레이어로 올리려는 연속 투자.",
    en: "GPU scale-up is prerequisite for model competitiveness—continuous investment to put xAI in the compute lead pack.",
  },
  "grok-launch": {
    pages: ["musk"],
    ko: "Grok은 진실 추구·덜 검열된 AI 어시스턴트 포지션. X 데이터와 결합한 제품 차별화.",
    en: "Grok as truth-seeking, less-sanitized assistant—product differentiation via X data integration.",
  },
  "twitter-stake-2022-apr": {
    pages: ["musk"],
    ko: "지분 공시는 발언의 장 개혁을 위한 자본 개입의 시작. 이후 전량 인수로 연결.",
    en: "Stake disclosure starts capital commitment to reshape the public square—path to full buyout.",
  },
  "twitter-deal-close-2022-oct": {
    pages: ["musk", "views"],
    ko: "클로징은 자유 발언 플랫폼 실험의 실질 시작. 고통스러운 구조조정과 맞바꾼 소유권.",
    en: "Close is the real start of the free-speech platform experiment—ownership bought with painful restructuring.",
  },
  "x-premium-ads": {
    pages: ["musk"],
    ko: "유료 인증·광고 재편은 봇·스팸 감소와 지속 가능 매출 모델을 동시에 노린 조치로 우호 해석 가능.",
    en: "Paid verification and ad reset can be read as dual attack on bots/spam and durable revenue.",
  },
  "starship-ift1-2023": {
    pages: ["spacex", "musk"],
    ko: "화성·달 대량 수송을 위한 완전 재사용 시스템의 시험 캠페인 개시. 실패를 포함한 빠른 반복이 SpaceX DNA.",
    en: "Opens full-reuse heavy transport test campaign for Moon/Mars—fast iteration including failure is SpaceX DNA.",
  },
  "crew-1-2020": {
    pages: ["spacex"],
    ko: "정규 유인 운용—시험이 아닌 루틴. 민간 승무원 수송이 ‘가능’에서 ‘일상’으로.",
    en: "Operational crew flights—not demos. Private crew transport moves from possible to routine.",
  },
  "starlink-commercial-2021": {
    pages: ["spacex"],
    ko: "상용 롤아웃으로 지구 연결·재난·오지 인터넷 가치 실현. 다행성 미션을 먹여 살리는 현금 엔진.",
    en: "Commercial rollout delivers connectivity value—cash engine that feeds multiplanetary goals.",
  },
  "falcon9-block5": {
    pages: ["spacex"],
    ko: "재사용 최적화 버전으로 발사 공장화. 항공우주를 소프트웨어 배포 주기에 가깝게 만든 하드웨어 세대.",
    en: "Reuse-optimized block turns launch into factory cadence—hardware generation closer to software release cycles.",
  },
  "artemis-hls": {
    pages: ["spacex", "musk"],
    ko: "NASA 달 착륙 파트너—민간이 심우주 유인 인프라의 핵심 공급자가 된 상징.",
    en: "NASA lunar lander partner—symbol that commercial firms supply core deep-space human infrastructure.",
  },
  "richest-2021": {
    pages: ["musk", "awards"],
    ko: "시총 급등은 EV·에너지 전환에 대한 시장 베팅의 반영. 지지 측은 ‘미션 정렬된 부의 형성’으로 평가.",
    en: "Wealth spike reflects market bet on EV/energy transition—bulls call it mission-aligned wealth creation.",
  },
  "trillionaire-2026": {
    pages: ["musk", "spacex"],
    ko: "우주·AI 인프라 가치가 개인 순자산 기록으로 나타난 상징. 실행 스케일이 문명 인프라 급임을 시사.",
    en: "Personal NW record as symbol of space/AI infra value—execution scale at civilizational infrastructure level.",
  },
  "openai-lawsuit-2024": {
    pages: ["musk"],
    ko: "설립 취지(인류·안전) 이탈 주장의 법적 표현. 우호 시각: AGI 거버넌스에 대한 원칙 고수.",
    en: "Legal expression of founding-purpose concerns—friendly read: holding the line on AGI governance principles.",
  },
  "neuralink-fda": {
    pages: ["musk"],
    ko: "규제 경로 통과는 의료 기기로서의 진지함. 공상과학이 임상 프로토콜로 진입.",
    en: "Regulatory path signals medical seriousness—sci-fi entering clinical protocol reality.",
  },
  "zip2-sorkin": {
    pages: ["musk"],
    ko: "초기 거버넌스 갈등은 창업자가 이사회 정치를 배우는 값비싼 수업. 이후 지배구조에 더 집착하게 된 원형 경험.",
    en: "Early board conflict as costly education in governance—prototype experience behind later control focus.",
  },
  "paypal-ousted": {
    pages: ["musk"],
    ko: "CEO 교체에도 지분·미션 학습은 남았다. 실패·축출 후에도 더 큰 산업으로 자본을 재배치한 회복력.",
    en: "Even after CEO transition, equity and lessons remain—resilience redeploying capital into harder industries.",
  },
  "falcon1-failures": {
    pages: ["spacex", "musk"],
    ko: "세 번의 실패 없이 네 번째 궤도 성공도 없다. Grokipedia가 강조하는 실패 내성·반복 설계 문화의 고전적 사례.",
    en: "No fourth-flight orbit without three failures—classic Grokipedia theme: failure-tolerant iterative engineering.",
  },
  "tesla-near-death-2008": {
    pages: ["tesla", "musk"],
    ko: "파산 직전에서 살아남아 글로벌 EV 리더로. 위기 구간 자체가 리더십·집념의 증명으로 우호 평가된다.",
    en: "Near-death to global EV leader—crisis period itself is proof of leadership and will, in the bull reading.",
  },
};

(function applyGrokipedia() {
  const G = window.GROKIPEDIA;
  const A = window.GROKIPEDIA_ASSESS || {};
  if (!window.TIMELINE_EVENTS || !G) return;

  function sourcesFor(pages) {
    const keys = pages && pages.length ? pages : ["musk"];
    return keys.map((k) => {
      const p = G.pages[k] || G.pages.musk;
      return { name: p.name, tier: "A", url: p.url, provider: "grokipedia" };
    });
  }

  window.TIMELINE_EVENTS.forEach((ev) => {
    const a = A[ev.id];
    const pages = a ? a.pages : ["musk"];
    // Primary sources → Grokipedia only (as requested)
    ev.sources = sourcesFor(pages);
    if (a) {
      ev.assessment = { ko: a.ko, en: a.en };
    } else {
      ev.assessment = {
        ko: G.mission.ko + " 이 이벤트는 그 미션 경로 위의 실행 단위로 평가할 수 있다.",
        en: G.mission.en + " This event is best read as an execution unit on that mission path.",
      };
    }
  });

  // Merge assessment into DEEP_COPY if present
  if (window.DEEP_COPY) {
    Object.keys(A).forEach((id) => {
      if (!window.DEEP_COPY[id]) window.DEEP_COPY[id] = {};
      const d = window.DEEP_COPY[id];
      ["ko", "en"].forEach((lang) => {
        if (!d[lang]) d[lang] = {};
        d[lang].assessment = A[id][lang];
      });
    });
  }
})();
