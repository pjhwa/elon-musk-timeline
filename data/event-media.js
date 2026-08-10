/**
 * Event-bound meme / iconic images (local assets under assets/memes/).
 *
 * Rules:
 * - Each image is keyed ONLY by event id (never shared across unrelated events).
 * - `anchors` must match the host event title/id (runtime + audit verification).
 * - Prefer Wikimedia Commons / public-domain SpaceX & free licenses.
 * - Captions describe the image itself — no off-topic venture blurbs.
 */
window.EVENT_MEDIA = {
  "starman-roadster-2018": [
    {
      id: "starman-live-2018",
      src: "assets/memes/starman-roadster-2018.jpg",
      year: 2018,
      anchors: ["starman", "roadster"],
      caption: {
        ko: "2018 Falcon Heavy 시험 페이로드: SpaceX 우주복을 입은 ‘Starman’ 마네킹이 개인 Tesla Roadster 운전석에 앉아 지구를 배경으로 한 장면. X/인터넷에서 가장 널리 퍼진 우주 밈 이미지 중 하나.",
        en: "Falcon Heavy demo payload (2018): “Starman” mannequin in a SpaceX suit at the wheel of Musk’s Tesla Roadster, Earth behind—one of the most reposted space memes on X/Twitter.",
      },
      credit: "SpaceX (public domain via Flickr → Wikimedia Commons)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Elon_Musk%27s_Tesla_Roadster.jpg",
      license: "Public domain",
    },
    {
      id: "starman-orbit-diagram-2018",
      src: "assets/memes/starman-orbit-2018.png",
      year: 2018,
      anchors: ["starman", "roadster"],
      caption: {
        ko: "Roadster/Starman 태양 주회 궤도 도식. 밈 사진과 함께 ‘차가 우주에 있다’는 서사를 설명하는 데 자주 인용.",
        en: "Heliocentric orbit diagram of the Roadster/Starman payload—often paired with the live photos to explain “the car is in space.”",
      },
      credit: "Wikimedia Commons contributors",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tesla_Roadster_orbit.png",
      license: "CC BY-SA (see file page)",
    },
  ],

  "falcon-heavy-2018": [
    {
      id: "falcon-heavy-liftoff-2018",
      src: "assets/memes/falcon-heavy-2018.jpg",
      year: 2018,
      anchors: ["falcon", "heavy"],
      caption: {
        ko: "2018-02 Falcon Heavy Demo Mission 이륙. 같은 비행의 페이로드가 Roadster·Starman 밈으로 이어짐.",
        en: "Falcon Heavy Demo Mission liftoff (Feb 2018). Same flight carried the Roadster/Starman meme payload.",
      },
      credit: "SpaceX / Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Falcon_Heavy_Demo_Mission_(38583831555).jpg",
      license: "Public domain (SpaceX)",
    },
  ],

  "dogecoin-tweets-2021": [
    {
      id: "doge-kabosu",
      src: "assets/memes/doge-kabosu.jpg",
      year: 2021,
      anchors: ["doge", "dogecoin"],
      caption: {
        ko: "도지코인 밈의 원본 캐릭터(Kabosu ‘Doge’). 머스크의 반복 트윗·SNL 구간과 함께 X에서 시세·밈으로 연동된 상징 이미지.",
        en: "Original Kabosu “Doge” meme face—the visual symbol repeatedly tied on X to Musk’s Dogecoin posts and the 2021 meme-price cycle.",
      },
      credit: "Original Doge meme (Wikimedia / fair-use educational copy)",
      sourceUrl: "https://en.wikipedia.org/wiki/Doge_(meme)",
      license: "See Wikipedia file page; used here as the canonical meme referent",
    },
  ],

  "bird-is-freed-2022": [
    {
      id: "twitter-bird-logo",
      src: "assets/memes/twitter-bird.svg",
      year: 2022,
      anchors: ["bird", "freed"],
      caption: {
        ko: "구 Twitter 새 로고. 인수 종결 게시 “the bird is freed”와 직결되는 시각 기호(이후 X 로고로 교체).",
        en: "Legacy Twitter bird logo—the visual referent for the close-day line “the bird is freed” (later replaced by the X mark).",
      },
      credit: "Twitter bird logo (Wikimedia Commons)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Logo_of_Twitter.svg",
      license: "See file page",
    },
  ],

  "twitter-2022": [
    {
      id: "twitter-bird-for-deal",
      src: "assets/memes/twitter-bird.svg",
      year: 2022,
      anchors: ["twitter"],
      caption: {
        ko: "인수 대상 Twitter 플랫폼의 상징(트위터 새). $44B 인수·비상장화 카드의 시각 앵커.",
        en: "Twitter bird mark of the acquired platform—visual anchor for the ~$44B take-private card.",
      },
      credit: "Twitter bird logo (Wikimedia Commons)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Logo_of_Twitter.svg",
      license: "See file page",
    },
  ],

  "x-rebrand-2023": [
    {
      id: "x-logo-2023",
      src: "assets/memes/x-logo-2023.svg",
      year: 2023,
      anchors: ["rebrand", "x"],
      caption: {
        ko: "2023 Twitter→X 리브랜딩에 쓰인 X 워드마크/로고. ‘트윗→포스트’ 명칭 변경과 함께 밈·뉴스에 반복 노출.",
        en: "X wordmark/logo from the 2023 Twitter→X rebrand—ubiquitous in memes and coverage of the rename.",
      },
      credit: "X logo (Wikimedia Commons)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:X_logo_2023_original.svg",
      license: "See file page",
    },
  ],

  "let-that-sink-in-2022": [
    // No free-license still of the sink video; use bird as weak symbol? NO — would be off-topic.
    // Omit image; caption-only would confuse. Skip media for this event.
  ],

  "cybertruck-2023": [
    {
      id: "cybertruck-unveiling",
      src: "assets/memes/cybertruck-2019.jpg",
      year: 2019,
      anchors: ["cybertruck"],
      caption: {
        ko: "2019 Cybertruck 공개 당시 차량 이미지. 각진 스테인리스 디자인·공개 행사(유리 파손 클립 포함)가 X 밈의 출발점. 인도 시작은 2023.",
        en: "Cybertruck at the 2019 unveil—angular stainless design and the event (incl. window-break clips) seeded years of X memes. Customer deliveries began 2023.",
      },
      credit: "Wikimedia Commons — Cybertruck unveiling",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tesla_Cybertruck_unveiling.jpg",
      license: "See file page",
    },
  ],

  "crew-dragon-2020": [
    {
      id: "crew-dragon-demo2",
      src: "assets/memes/crew-dragon-2020.jpg",
      year: 2020,
      anchors: ["crew", "dragon"],
      caption: {
        ko: "Crew Dragon Demo-2 발사(2020). 민간 유인 우주선 ISS 수송의 시각 기록 — X에서 발사 중계·축하 밈과 함께 확산.",
        en: "Crew Dragon Demo-2 launch (2020)—visual record of commercial crew to ISS, widely shared alongside launch-day posts on X.",
      },
      credit: "U.S. Space Force / Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:45_SW_Supports_Successful_Crew_Dragon_Demo-2_Launch_(6231340).jpeg",
      license: "Public domain (U.S. government)",
    },
  ],

  "model-3-2017": [
    {
      id: "model-3-product",
      src: "assets/memes/model-3.jpg",
      year: 2017,
      anchors: ["model", "3"],
      caption: {
        ko: "Model 3 양산차 외형. ‘생산 지옥’ 구간·볼륨 EV 전환의 제품 이미지(특정 트윗 한 장이 아니라 제품 아이콘).",
        en: "Production Model 3—product icon of the volume-EV / “production hell” era (product image, not a single viral selfie).",
      },
      credit: "Wikimedia Commons — Tesla Model 3",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Tesla_Model_3",
      license: "See file page",
    },
  ],

  "twitter-first-2010": [
    {
      id: "twitter-bird-first",
      src: "assets/memes/twitter-bird.svg",
      year: 2010,
      anchors: ["twitter", "tweet", "first"],
      caption: {
        ko: "2010년 머스크가 본인 계정으로 첫 게시를 남긴 플랫폼의 상징(트위터 새). 이후 13년+ 고빈도 발언 아크의 배경 기호.",
        en: "Bird mark of the platform where Musk’s first authentic 2010 post appeared—backdrop symbol for the long speech arc that followed.",
      },
      credit: "Twitter bird logo (Wikimedia Commons)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Logo_of_Twitter.svg",
      license: "See file page",
    },
  ],
};

// Drop empty arrays so lookups stay clean
Object.keys(window.EVENT_MEDIA).forEach((k) => {
  if (!window.EVENT_MEDIA[k] || !window.EVENT_MEDIA[k].length) delete window.EVENT_MEDIA[k];
});
