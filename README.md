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
```

## 기능

### 메인 타임라인 (`index.html`)
- **언어 토글** EN / 한 (localStorage + `?lang=en|ko`)
- **라이트 / 다크 테마** (시스템 선호 기본, 수동 토글, localStorage)
  - 다크: soft category accents (Tesla rose, not harsh pure red on navy)
  - 라이트: modern product UI (slate text, white cards, sky accent)
- **드릴다운 깊이**
  - 기본(Auto): **핵심 P0만** (~34)
  - 시대 또는 분야 클릭: **P0+P1+P2 상세** (Optimus, Colossus, 로보택시 등)
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

## 한계

- 순자산·시가총액은 시점 추정치  
- 의료·임상(Neuralink)은 진행 중  
- 정치 성과 평가는 포함하지 않음  

## 라이선스·면책

비상업적 교육·참고 목적의 사실 정리입니다. 투자·정치 조언이 아닙니다.  
원문 출처의 저작권은 각 발행자에게 있습니다.
