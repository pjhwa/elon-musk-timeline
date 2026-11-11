# 일론 머스크 일대기 · Interactive Timeline

공개·교차검증 가능한 사실만으로 구성한 **웹 인터랙티브 타임라인 인포그래픽**입니다.

## 바로 보기

```bash
open /Users/jerry/dev/elon-musk-timeline/index.html
open /Users/jerry/dev/elon-musk-timeline/poster.html
open /Users/jerry/dev/elon-musk-timeline/eras.html
```

서버 없이 HTML을 브라우저로 열면 됩니다.  
(`file://` 호환: 데이터는 `data/*.js`로 로드)

로컬 서버:

```bash
cd /Users/jerry/dev/elon-musk-timeline
python3 -m http.server 8765
# http://localhost:8765
```

## 구성

```
elon-musk-timeline/
  index.html              # 인터랙티브 타임라인 (KO/EN 토글)
  poster.html             # 1장 포스터 (인쇄·PDF)
  eras.html               # 시대별 확대 (에세이 + 전체 이벤트)
  css/styles.css | poster.css | eras.css
  js/app.js | i18n.js | poster.js | eras.js
  data/events.js | en.js | era-essays.js
  scripts/export-poster.sh
  export/                 # 생성된 PNG/PDF (스크립트 실행 후)
  docs/SOURCES.md | EVENT_RUBRIC.md
  mcp/server.js | prompt.js | test.js   # 읽기 전용 MCP
```

## 기능

### 메인 타임라인 (`index.html`)
- **언어 토글** EN / 한 (localStorage + `?lang=en|ko`)
- **라이트 / 다크 테마** (시스템 선호 기본, 수동 토글, localStorage)
  - 다크: soft category accents (Tesla rose, not harsh pure red on navy)
  - 라이트: modern product UI (slate text, white cards, sky accent)
- **드릴다운 깊이**
  - 기본(Auto): **핵심 P0만** (~34)
  - 시대 또는 분야 클릭: **P0+P1+P2 상세** (X 첫 게시~바이럴·철학 발언, 연애·결혼, Trump·정치 아크, Optimus/Colossus 등)
  - **이벤트 연동 밈/아이콘 이미지** (`assets/memes` + `data/event-media.js`) — 해당 카드에만 표시, 앵커 검증
  - 수동 override: Headline / Detail
- **시기별 순자산 추정** 차트 (Forbes 등 공개 스냅샷, 로그형 막대)
- 카드 클릭 → 상세 + Tier A/B 출처 + 해당 연도 자산 힌트
- 키보드 `j`/`k`, `Esc`
- 딥링크: `?id=robotaxi-austin-2025&lang=en&cat=tesla&depth=detail`

### 1장 포스터 (`poster.html`)
- 6시대 × P0 마일스톤 한 장 레이아웃
- 브라우저 **Print → Save as PDF**
- 또는 자동 내보내기:

```bash
./scripts/export-poster.sh
# → export/elon-musk-poster-en.pdf|.png
# → export/elon-musk-poster-ko.pdf|.png
```

### 시대 확대 (`eras.html`)
- 6개 시대 구조 에세이 (평가 없는 논리 축)
- 해당 시대 **전체 이벤트** + 상세
- `?era=dual-bet&lang=en`
- “타임라인에서 이 시대만 보기” 링크

## 논리 축

> 이주·교육 → 인터넷 자본 → 우주·전기차 병행 → 산업 스케일 → 플랫폼·AI·정치

## 설계 원칙

1. **평가·동기 배제** — 날짜·행위·결과만  
2. **역할 구분** — Tesla 법인 설립 ≠ Series A ≠ CEO  
3. **출처 계층** — 카드마다 Tier 배지  
4. **차이 고지** — 캐나다 이주 연도, Zip2 금액 등  

상세: [docs/EVENT_RUBRIC.md](docs/EVENT_RUBRIC.md)

## MCP 서버 (읽기 전용)

`mcp/`는 타임라인 데이터와 일러스트 프롬프트를 읽기 전용으로 제공합니다. 데이터 파일을 수정하지 않습니다.

```bash
cd mcp
npm install
npm test          # 또는 저장소 루트에서 node mcp/test.js
npm start         # stdio MCP
```

도구: `musk_canon`, `list_events`, `get_event`, `search_events`, `get_era`, `get_wealth`, `get_guide`, `get_references`, `build_prompt`.

### `build_prompt`

기본 대상은 **Grok Imagine**(`https://grok.com/imagine`)입니다. `target`을 `"midjourney"`로 주면 기존처럼 `--ar`, `--style raw`, 그리고 참조 사진이 있을 때 URL과 `--iw 0.7`을 붙입니다.

Grok Imagine은 `--ar`, `--style`, `--iw`와 이미지 URL을 무시합니다. 프롬프트는 영어 문장으로 주제를 나누고(인물, 닮은 점, 장면·구도, 스타일, 빛·색, 글자 배치), 화면 비율과 화질은 반환값 `ui`에서 고릅니다.

- `ui.aspect`: Imagine에서 고르는 비율. 기본 `2:3`. 지원 값은 `2:3`, `3:2`, `1:1`, `16:9`, `9:16`. `4:5`를 넘기면 `2:3`으로 바꿉니다.
- `ui.quality`: `"highest"`.
- `negative`: 피할 요소 목록.
- `korean_text`: 실제로 넣으라고 한 한글.
- `korean_caption_suggestion`: 모델이 한글을 깨뜨릴 때 코드로 겹쳐 쓸 문장. 글자를 안 넣으면 `null`.
- `checklist`: 사진처럼 보이면 다시 뽑기, 사생활·외모 조롱 금지.

| 인자 | 역할 |
| --- | --- |
| `headline` | 상단 배너에 그대로 쓸 한국어 제목 |
| `caption` | 말풍선 하나에 그대로 쓸 짧은 한국어 |
| `labels` | 작은 표지판에 하나씩 쓸 짧은 한국어 단어 |
| `topic` | 최근 뉴스처럼 자유 텍스트. 장면의 시각적 비유로 바꿈 |
| `event_id` | 타임라인 사건 접지 |
| `reference_year` | 그 해의 공개된 모습에 맞춘 캐리커처. `assets/references/manifest.json`이 있으면 가장 가까운 사진의 연도·제목으로 시대를 고르고, 폴더가 없어도 연도만으로 동작 |

글자를 넘기지 않으면 프롬프트는 신문 머리말·표지판·관제실 명판처럼 글자를 부르는 요소를 빼고, “No English words, no newspaper masthead, no signage.”를 명시합니다. 한글을 넘기면 그 문자열만 굵은 한글 산세리프로, 철자 그대로, 그 밖에 아무것도 쓰지 말라고 합니다.

닮은꼴은 항상 풍자 캐리커처입니다. 사진이 아니며, 턱·미소·헤어라인을 친절한 편집 만화 쪽으로만 과장합니다. 시대마다 머리, 턱선, 옷(2020년대는 짧은 다크브라운 헤어, 넓은 턱, 검은 티셔츠 또는 검은 재킷)을 중립적으로 적습니다.

## 한계

- 순자산·시가총액은 시점 추정치  
- 의료·임상(Neuralink)은 진행 중  
- 정치 성과 평가는 포함하지 않음  

## 라이선스·면책

비상업적 교육·참고 목적의 사실 정리입니다. 투자·정치 조언이 아닙니다.  
원문 출처의 저작권은 각 발행자에게 있습니다.
