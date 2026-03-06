# HTML TagQuest — 서비스 기획 + 기술 기획 완성본

> **문서 목적**: 이 기획서 하나로 서비스 설계부터 개발 착수까지 커버한다.
> **버전**: v1.0 | **작성일**: 2026-03-06

---

## 목차

### Part 1. 서비스 기획
1. 서비스 정의
2. 문제 정의
3. 서비스 목표 & 핵심 가치
4. 타겟 사용자
5. 핵심 컨셉
6. 학습 방식 (3단계 구조)
7. 커리큘럼 뼈대 (트랙 A–H)
8. 레벨 설계 원칙 & 문제 유형 7가지
9. 화면 구성 설계
10. 피드백 시스템
11. 보상 & 동기부여 구조
12. MVP 범위 정의
13. 경쟁 서비스 대비 차별점
14. 성공 지표

### Part 2. 기술 기획
15. 기술 스택 선택 근거
16. 프로젝트 아키텍처
17. 디렉터리 구조
18. 핵심 컴포넌트 명세
19. 데이터 모델 (레벨 스키마)
20. HTML 검증 & 파싱 전략
21. DOM 트리 시각화 전략
22. CodeMirror 6 통합 설계
23. 상태 관리 설계
24. 진행률 스토리지 전략
25. 샘플 레벨 정의 (레벨 1–5)
26. 개발 단계 로드맵

---

# PART 1. 서비스 기획

---

## 1. 서비스 정의

### 한줄 정의
> **HTML 태그와 문서 구조를 게임형으로 익히는 초심자 전용 감각 훈련 서비스**

Flexbox Froggy가 CSS 레이아웃 감각을 만들어주듯,
이 서비스는 "문서를 구조로 읽는 눈"을 만든다.

사용자는 길게 읽지 않는다.
**목표 구조를 보고, 직접 조립하고, 즉시 결과를 확인**하면서 감각을 체득한다.

### 서비스명 후보

| 이름 | 컨셉 |
|------|------|
| **TagQuest** | 태그를 탐험하는 여정 |
| **HTMLForge** | HTML을 직접 단련하는 곳 |
| **StructureUp** | 구조 감각을 키운다는 의미 |
| **TagBuilder** | 단순명료 |

> 이하 본 문서에서는 **TagQuest** 로 통일한다.

---

## 2. 문제 정의

### 입문자가 막히는 지점 3가지

**① 태그는 외워도, 언제 쓰는지 모른다**
- `<section>` vs `<article>` vs `<div>` 의 차이를 설명 없이는 구분 불가
- MDN 문서는 정확하지만 입문자에게 너무 건조하다

**② 구조 감각이 없다**
- "왜 `<li>`는 `<ul>` 안에 있어야 하나"를 모른다
- 중첩(nesting) 개념이 추상적으로만 느껴진다
- Content Model(내용 모델) — 즉 **어떤 태그가 어떤 태그를 자식으로 허용하는지** 에 대한 이해가 전무하다

  > MDN 공식 기준: HTML 요소는 **Content Categories** 로 분류된다.
  > - Flow content / Phrasing content / Interactive content / Sectioning content 등
  > - `<li>`는 `<ul>`, `<ol>`, `<menu>`의 직접 자식으로만 유효하다
  > - `<td>`는 반드시 `<tr>` 안에 위치해야 한다

**③ 결과만 보여주는 학습 환경**
- 기존 학습 서비스는 "브라우저 렌더링 결과"를 보여준다
- 입문자에게 필요한 것은 **구조(DOM 트리)** 를 읽는 감각이지, 스타일이 아니다

---

## 3. 서비스 목표 & 핵심 가치

### 서비스 목표

| 목표 | 설명 |
|------|------|
| **구조 감각 형성** | "이 컨텐츠는 어떤 태그로 묶어야 하는가"를 직관적으로 판단할 수 있다 |
| **Content Model 이해** | 어떤 태그가 어디에 올 수 있는지 체득한다 |
| **시맨틱 습관 형성** | `<div>` 남발 대신 의미에 맞는 태그를 선택하는 습관을 만든다 |

### 핵심 가치 4가지

```
직관성: 설명보다 문제와 시각화로 이해한다
즉시성: 입력 즉시 구조 변화를 확인한다
단순성: HTML 구조 학습 하나에만 집중한다
반복성: 짧은 레벨을 반복하며 감각을 쌓는다
```

---

## 4. 타겟 사용자

### 페르소나 3개

**A. 완전 입문자 (코딩 처음 접하는 사람)**
- "태그가 뭔지는 알겠는데, 언제 쓰는지 모르겠어요"
- 부담 없이 시작할 수 있어야 한다
- 첫 15분이 전부다

**B. 찍먹 후 포기한 초보자**
- `<div>` 는 알고 있지만 `<section>`, `<article>`, `<aside>` 는 헷갈린다
- "다시 한번 제대로 잡아보고 싶다"
- 설명 말고 바로 문제 풀고 싶다

**C. 빠른 기초 복습이 필요한 사람**
- 프론트엔드 강의/부트캠프 입학 전 준비
- HTML 기본기 점검용
- 1-2시간 안에 핵심만 파악하고 싶다

---

## 5. 핵심 컨셉

### TagQuest는 "코딩하는 곳"이 아니라 "구조를 배우는 곳"이다

이 차이가 기획 전반을 관통한다.

| 일반 HTML 학습 서비스 | TagQuest |
|----------------------|----------|
| 브라우저 렌더링 결과 중심 | DOM 트리 구조 중심 |
| CSS 스타일 포함 | 스타일 없음, 구조만 |
| 에러 메시지가 콘솔 스타일 | 구조적 오류 설명 (한국어) |
| 긴 강의 → 긴 실습 | 짧은 문제 → 즉각 피드백 |

### 3가지 핵심 경험

**경험 1. 목표 구조를 보고 맞추기**
- 좌측: "이런 구조를 만들어보세요" (박스 다이어그램)
- 우측: 내가 작성한 코드의 실시간 DOM 트리
- 두 트리가 일치하면 정답

**경험 2. 잘못된 중첩이 즉시 표시된다**
- `<li>`를 `<div>` 안에 넣으면 바로 경고
- 닫는 태그 순서가 잘못되면 시각적으로 표시
- 에러 메시지: "li는 ul 또는 ol의 직접 자식이어야 해요"

**경험 3. 짧고 명확한 성취**
- 1문제 = 1개념
- 1~3분 안에 끝난다
- 클리어 시 즉각적인 시각 피드백

---

## 6. 학습 방식 (3단계)

### 1단계. 태그 인지 (Recognize)

**목표**: 태그 이름 ↔ 역할 매핑

**문제 형식**:
- 선택형: "제목에 쓰는 태그는?" → `h1` / `p` / `div`
- 빈칸 채우기: `<___>안녕하세요</___>`
- 드래그 앤 드롭 레이블 매핑

**다루는 태그**: `h1–h6`, `p`, `strong`, `em`, `br`, `hr`, `a`, `img`

---

### 2단계. 구조 조립 (Structure)

**목표**: 부모-자식 관계, Content Model 이해

**문제 형식**:
- 블록 조립: 태그 블록을 드래그해서 올바른 위치에 배치
- 중첩 순서 맞추기: 섞인 태그를 올바른 계층으로 정렬
- 오류 찾기: 잘못된 중첩 수정

**다루는 구조**:
- `ul > li`, `ol > li`
- `nav > ul > li > a`
- `main > section > h2 + p`
- `article > h2 + p + footer`

---

### 3단계. 직접 작성 (Write)

**목표**: 간단한 HTML을 스스로 작성

**문제 형식**:
- 짧은 코드 에디터에서 직접 입력
- 자동 검사 + 구조 피드백
- 정답이 여러 개인 경우 모두 인정

**결과물 예시**:
- 블로그 카드 컴포넌트
- 뉴스 기사 구조
- 프로필 영역
- 간단한 nav 메뉴

---

## 7. 커리큘럼 뼈대 (트랙 A–H)

> 각 트랙은 독립적으로 진행 가능하다. 전체 이수 강제 없음.

### 트랙 A. 텍스트 태그 기초

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| A-1 | 제목 만들기 | `h1` |
| A-2 | h1–h6 계층 이해 | `h1–h6` |
| A-3 | 문단 넣기 | `p` |
| A-4 | 강조하기 | `strong`, `em` |
| A-5 | 줄바꿈 vs 구분선 | `br`, `hr` |
| A-6 | 제목 + 문단 조합 | `h2 + p` |

---

### 트랙 B. 링크와 미디어

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| B-1 | 링크 만들기 | `a[href]` |
| B-2 | 새 탭에서 열기 | `a[target="_blank"]` |
| B-3 | 이미지 삽입 | `img[src, alt]` |
| B-4 | alt 속성의 의미 | `img[alt]` (접근성) |
| B-5 | 그림 + 설명 묶기 | `figure`, `figcaption` |

---

### 트랙 C. 리스트

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| C-1 | 순서 없는 목록 | `ul > li` |
| C-2 | 순서 있는 목록 | `ol > li` |
| C-3 | 메뉴 구조 | `nav > ul > li > a` |
| C-4 | 중첩 목록 | `ul > li > ul > li` |

---

### 트랙 D. 레이아웃의 뼈대 (시맨틱 구조)

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| D-1 | header / main / footer | 3단 기본 구조 |
| D-2 | nav 위치 | `header > nav` |
| D-3 | main 안에 section | `main > section` |
| D-4 | section vs div | 언제 section을 쓰나 |
| D-5 | aside 위치 | `main + aside` |

---

### 트랙 E. 콘텐츠 의미 구분

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| E-1 | article이란 | `article` |
| E-2 | article vs section | 독립성 개념 |
| E-3 | article 내부 구조 | `article > h2 + p + footer` |
| E-4 | aside 의미 | 보조 콘텐츠 분리 |
| E-5 | 뉴스 카드 목록 | `ul > li > article` |

---

### 트랙 F. 폼 기초

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| F-1 | input 기본 | `input[type="text"]` |
| F-2 | label 연결 | `label[for]` + `input[id]` |
| F-3 | 버튼 | `button` |
| F-4 | textarea | `textarea` |
| F-5 | select + option | 드롭다운 구조 |
| F-6 | form 묶기 | `form > label + input + button` |

---

### 트랙 G. 표 기초

| 레벨 | 주제 | 핵심 태그 |
|------|------|-----------|
| G-1 | 기본 테이블 구조 | `table > tr > td` |
| G-2 | 헤더 행 | `thead > tr > th` |
| G-3 | tbody 분리 | `thead + tbody` |
| G-4 | caption 추가 | `caption` |

---

### 트랙 H. 시맨틱 구조 종합 실습

| 레벨 | 주제 | 설명 |
|------|------|------|
| H-1 | 블로그 글 페이지 | `header + main > article + aside + footer` |
| H-2 | 뉴스 목록 페이지 | `main > section > ul > li > article` |
| H-3 | 프로필 페이지 | `header + main > figure + section` |
| H-4 | 상품 카드 목록 | `ul > li > article > figure + h3 + p + button` |

---

## 8. 레벨 설계 원칙 & 문제 유형

### 레벨 설계 원칙

1. **1레벨 = 1개념** — 동시에 2개 이상의 신규 개념이 나오지 않는다
2. **1~3분 내 완료** — 초보자가 지치지 않는 분량
3. **이전 레벨의 누적** — A-6은 A-1~A-5 태그를 자연스럽게 활용
4. **정답이 여러 개일 수 있다** — 특히 시맨틱 태그 선택 문제는 복수 정답 허용

### 문제 유형 7가지

| 유형 | 설명 | 예시 | 대상 단계 |
|------|------|------|-----------|
| **T1. 태그 고르기** | 설명에 맞는 태그 선택 | "제목을 나타내는 태그는?" → h1 | 1단계 |
| **T2. 빈칸 채우기** | 태그명 입력 | `<___>목록 아이템</___>` | 1단계 |
| **T3. 순서 맞추기** | 섞인 태그를 올바른 계층으로 | ul, li, li, /ul 재정렬 | 2단계 |
| **T4. 블록 조립** | 드래그 앤 드롭으로 구조 완성 | 태그 블록을 올바른 위치에 | 2단계 |
| **T5. 직접 입력** | 코드 에디터에 직접 작성 | 카드 컴포넌트 HTML 작성 | 3단계 |
| **T6. 오류 찾기** | 잘못된 중첩 / 누락 태그 수정 | `div > li` → `ul > li` | 2–3단계 |
| **T7. 시맨틱 선택** | 맥락에 맞는 태그 선택 | "이 블록은 div가 맞나요, article이 맞나요?" | 3단계 |

---

## 9. 화면 구성 설계

### 전체 레이아웃 (3-panel)

```
┌──────────────────────────────────────────────────────────┐
│                    HEADER (레벨 정보 + 진행률)             │
├──────────────┬───────────────────┬───────────────────────┤
│              │                   │                       │
│  TASK PANEL  │   EDITOR PANEL    │  VISUALIZER PANEL     │
│              │                   │                       │
│  목표 구조   │  코드 입력 영역    │  실시간 DOM 트리       │
│  미리보기    │  (유형별 변환)     │  구조 박스 시각화      │
│              │                   │  오류 표시            │
│  힌트 버튼   │                   │  정답 비교            │
│              │                   │                       │
├──────────────┴───────────────────┴───────────────────────┤
│            FOOTER (이전 / 실행·검사 / 다음)               │
└──────────────────────────────────────────────────────────┘
```

### 패널별 세부 명세

#### TASK PANEL (좌측)

- 현재 레벨 번호, 제목
- 목표 구조 다이어그램 (색깔 있는 박스 트리)
- 학습 포인트 1줄 (예: "li는 반드시 ul 또는 ol 안에 있어야 해요")
- 힌트 버튼 (클릭 시 힌트 단계적 공개)
- 시맨틱 태그 문제일 경우 "왜 이 태그를?" 설명 링크

#### EDITOR PANEL (중앙)

문제 유형에 따라 변환:
- T1, T2: 선택지 UI / 빈칸 입력 박스
- T3: 드래그 가능한 태그 카드 리스트
- T4: 드래그 앤 드롭 영역
- T5, T6, T7: **CodeMirror 6 에디터**

CodeMirror 에디터 설정:
- HTML 구문 강조
- 자동 닫기 태그
- 실시간 lint (구조 오류 gutter 표시)

#### VISUALIZER PANEL (우측)

- **DOM 트리 뷰**: 사용자 입력 기반 실시간 렌더링
- **박스 구조 뷰**: 중첩 박스로 계층 시각화
- **정답 비교 뷰**: 정답 트리와 현재 트리 나란히 표시
- 오류 노드: 빨간색 테두리 + 오류 메시지 툴팁

---

## 10. 피드백 시스템

### 피드백 3단계 원칙

```
1단계: 맞음 / 틀림 여부
2단계: 어디가 문제인지 시각적 표시
3단계: 왜 그런지 구조적 설명 (한국어)
```

### 오류 메시지 예시

| 오류 상황 | 표시 메시지 |
|-----------|-------------|
| `<li>` 가 `<div>` 안에 있음 | "li는 ul, ol, menu의 직접 자식이어야 해요" |
| `<td>` 가 `<table>` 직속 | "td는 반드시 tr 안에 있어야 해요" |
| `<main>` 이 두 개 | "main은 페이지에 하나만 있어야 해요" |
| 닫는 태그 순서 오류 | "여는 순서와 닫는 순서가 달라요: `</div>` 전에 `</p>` 가 닫혀야 해요" |
| `<img>` 에 alt 없음 | "img에 alt 속성이 없어요. 접근성을 위해 추가해보세요" |
| `<a>` 에 href 없음 | "a 태그에 href가 없으면 링크 역할을 못 해요" |

> 메시지 원칙: 무섭지 않게, 구조적으로, 한 문장으로

### 정답 이후 피드백

- 정답 시: "잘했어요! 이제 section이 div와 다른 이유를 알겠죠?"
- 힌트 사용 후 정답: "힌트 없이도 곧 될 거예요"
- 오답 후 재도전: "아직 괜찮아요. 다시 해보자"

---

## 11. 보상 & 동기부여 구조

### 최소한의 게임화

과도한 게임화는 핵심을 흐린다.
동기부여의 핵심은 **빠른 성취감**이다.

| 보상 요소 | 설명 |
|-----------|------|
| 레벨 클리어 애니메이션 | 간단한 체크 + 완료 효과음 (선택) |
| 트랙 완료 배지 | 트랙 A–H 완료 시 배지 표시 |
| 진행률 바 | 전체 레벨 중 몇 % 완료 |
| 연속 정답 스트릭 | 3연속, 5연속 시 간단한 강조 |
| "구조 이해도" 수치 | 완료한 트랙 기준 역량 표시 |

### 없애야 할 것

- 리더보드 / 랭킹 (경쟁 요소 MVP 제외)
- 에너지 시스템 (접근 제한 금지)
- 과도한 캐릭터 / 스토리 (집중력 분산)

---

## 12. MVP 범위 정의

### MVP 포함

| 항목 | 세부 내용 |
|------|-----------|
| 레벨 수 | 트랙 A, C, D, E — 총 20~25레벨 |
| 문제 유형 | T1(태그 고르기), T2(빈칸), T5(직접 입력) |
| 에디터 | CodeMirror 6 HTML 모드 |
| 시각화 | DOM 트리 뷰 (실시간) |
| 피드백 | 구조 오류 메시지 (한국어) |
| 진행률 | localStorage 기반 레벨별 완료 저장 |
| 힌트 | 레벨당 1개 힌트 |

### MVP 제외

| 항목 | 이유 |
|------|------|
| 로그인 / 회원가입 | 초기 진입 장벽 제거 |
| 랭킹 / 커뮤니티 | 학습 집중 |
| 블록 조립 (T4) | 드래그 구현 복잡도 높음 |
| CSS / JS 학습 | 추후 확장 |
| 모바일 최적화 | MVP는 데스크탑 우선 |

---

## 13. 경쟁 서비스 대비 차별점

| 비교 항목 | MDN Learn | W3Schools | Flexbox Froggy | **TagQuest** |
|-----------|-----------|-----------|----------------|-------------|
| 학습 방식 | 읽기 중심 | 읽기 + 예제 | 게임형 | **게임형** |
| 피드백 | 없음 | 없음 | 즉시 | **즉시 + 구조 설명** |
| 구조 시각화 | 없음 | 없음 | CSS 결과 | **DOM 트리** |
| 시맨틱 태그 강조 | 있음 | 약함 | 없음 | **핵심 트랙** |
| 한국어 에러 메시지 | 없음 | 없음 | 없음 | **있음** |
| 레슨 길이 | 길다 | 길다 | 짧다 | **매우 짧다** |

---

## 14. 성공 지표

### 정량 지표

| 지표 | 목표치 (MVP 기준) |
|------|-----------------|
| 첫 방문 학습 지속 시간 | 5분 이상 |
| 1트랙 완료율 | 방문자의 40% |
| 10레벨 이상 진행 비율 | 방문자의 25% |
| 오답 후 이탈률 | 30% 미만 |
| 재방문율 (7일 이내) | 15% 이상 |

### 정성 지표

- "HTML 구조가 뭔지 처음으로 이해했다"는 피드백
- "설명 없이도 이해됐다"는 반응
- 입문자 학습 커뮤니티에서 자발적 공유

---

---

# PART 2. 기술 기획

---

## 15. 기술 스택 선택 근거

### 프론트엔드

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | **Next.js 15 (App Router)** | SSG로 레벨 데이터 정적 생성, SEO 필요, React Server Components 활용 가능 |
| 언어 | **TypeScript** | 레벨 스키마, 검증 로직 타입 안전성 필수 |
| 스타일링 | **Tailwind CSS** | 빠른 UI 개발, 커스텀 컴포넌트 필요 최소화 |
| 코드 에디터 | **CodeMirror 6** | HTML 구문 강조, lint 지원, React 통합 가능, 경량 |
| 상태 관리 | **Zustand** | 단순한 전역 상태 (현재 레벨, 진행률), Context보다 적은 보일러플레이트 |
| 애니메이션 | **Framer Motion** | 레벨 클리어 피드백 애니메이션 |

### 백엔드 (MVP)

| 항목 | 선택 | 이유 |
|------|------|------|
| 서버 | **없음 (정적)** | 레벨 데이터는 JSON 파일로 관리, 로그인 없음 |
| 진행률 저장 | **localStorage** | 서버 없이 브라우저 로컬 저장 |
| 추후 확장 | **Supabase** | 로그인 도입 시 사용자별 진행률 동기화 |

### HTML 파싱 & 검증

| 항목 | 선택 | 이유 |
|------|------|------|
| 파서 | **DOMParser API (브라우저 내장)** | 서버 의존성 없음, HTML 파싱 표준 동작 |
| 추가 검증 | **Custom Validator (TypeScript)** | Content Model 규칙을 직접 정의 |

---

## 16. 프로젝트 아키텍처

```
┌────────────────────────────────────────────────────────────┐
│                    Next.js App Router                      │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  /            │  │ /tracks      │  │ /tracks/[id]     │ │
│  │  Landing Page │  │ Track List   │  │ /levels/[id]     │ │
│  │              │  │              │  │  Level Player    │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Core Engine                            │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │ HTML Parser  │  │ DOM Visualizer│                │   │
│  │  │ (DOMParser)  │  │ (React Tree) │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │ Validator    │  │ Feedback     │                │   │
│  │  │ (Content     │  │ Generator    │                │   │
│  │  │  Model Rules)│  │              │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Data Layer                             │   │
│  │  levels/*.json → LevelData[] → Static Props        │   │
│  │  localStorage ← ProgressStore (Zustand)            │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 17. 디렉터리 구조

```
tagquest/
├── app/
│   ├── page.tsx                    # 랜딩 페이지
│   ├── tracks/
│   │   ├── page.tsx                # 트랙 목록
│   │   └── [trackId]/
│   │       ├── page.tsx            # 트랙 상세 (레벨 목록)
│   │       └── levels/
│   │           └── [levelId]/
│   │               └── page.tsx    # 레벨 플레이어
├── components/
│   ├── editor/
│   │   ├── CodeEditor.tsx          # CodeMirror 6 래퍼
│   │   ├── BlockAssembler.tsx      # T4 드래그앤드롭
│   │   ├── FillInBlank.tsx         # T2 빈칸 채우기
│   │   └── TagSelector.tsx         # T1 태그 선택
│   ├── visualizer/
│   │   ├── DomTreeView.tsx         # DOM 트리 시각화
│   │   ├── BoxStructureView.tsx    # 박스 구조 시각화
│   │   └── DiffView.tsx            # 정답 비교 뷰
│   ├── feedback/
│   │   ├── FeedbackPanel.tsx       # 오류 메시지 표시
│   │   └── SuccessModal.tsx        # 정답 완료 모달
│   └── layout/
│       ├── TaskPanel.tsx
│       ├── EditorPanel.tsx
│       └── VisualizerPanel.tsx
├── engine/
│   ├── parser.ts                   # DOMParser 래퍼
│   ├── validator.ts                # Content Model 검증
│   ├── contentModel.ts             # HTML Content Model 규칙 정의
│   ├── differ.ts                   # 정답 트리 비교
│   └── feedbackMessages.ts         # 오류 메시지 맵
├── data/
│   ├── tracks/
│   │   ├── track-a.json
│   │   ├── track-b.json
│   │   └── ...
│   └── schema.ts                   # LevelData 타입 정의
├── store/
│   └── progressStore.ts            # Zustand 진행률 스토어
└── lib/
    └── utils.ts
```

---

## 18. 핵심 컴포넌트 명세

### CodeEditor.tsx

```typescript
// CodeMirror 6 기반 HTML 에디터
// 참조: https://codemirror.net

import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { linter, lintGutter } from "@codemirror/lint";

interface CodeEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  lintSource?: (view: EditorView) => Diagnostic[];
  readOnly?: boolean;
}
```

**핵심 extension 구성**:

```typescript
const extensions = [
  basicSetup,          // 기본 기능 (줄번호, 실행취소 등)
  html(),              // HTML 구문 강조 + 자동완성
  lintGutter(),        // 오류 표시 거터
  linter(customLintSource),  // 커스텀 구조 검증
  EditorView.updateListener.of((update) => {
    if (update.docChanged) onChange(update.state.doc.toString());
  }),
];
```

---

### DomTreeView.tsx

```typescript
// DOMParser로 파싱된 DOM을 React 트리로 시각화

interface DomNodeProps {
  node: Element;
  depth: number;
  isError?: boolean;
  errorMessage?: string;
}

// 재귀적으로 DOM 트리를 React 컴포넌트로 변환
function DomNode({ node, depth, isError }: DomNodeProps) {
  return (
    <div className={`tree-node depth-${depth} ${isError ? 'error' : ''}`}>
      <span className="tag-name">{node.tagName.toLowerCase()}</span>
      {node.attributes.length > 0 && <AttributeList attrs={node.attributes} />}
      {[...node.children].map((child, i) => (
        <DomNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}
```

---

### validator.ts

```typescript
// HTML Content Model 규칙 기반 검증기

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  node: string;         // 문제 있는 태그명
  message: string;      // 한국어 설명
  severity: 'error' | 'warning';
}

// 검증 실행
export function validateHtmlStructure(html: string): ValidationResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const errors: ValidationError[] = [];

  // Content Model 규칙 적용
  checkContentModel(doc.body, errors);
  checkRequiredAttributes(doc.body, errors);
  checkNestingRules(doc.body, errors);

  return { isValid: errors.length === 0, errors };
}
```

---

## 19. 데이터 모델 (레벨 스키마)

```typescript
// data/schema.ts

export type ProblemType =
  | 'TAG_SELECT'      // T1: 태그 고르기
  | 'FILL_BLANK'      // T2: 빈칸 채우기
  | 'SORT_ORDER'      // T3: 순서 맞추기
  | 'BLOCK_ASSEMBLE'  // T4: 블록 조립
  | 'DIRECT_INPUT'    // T5: 직접 입력
  | 'FIX_ERROR'       // T6: 오류 찾기
  | 'SEMANTIC_CHOICE' // T7: 시맨틱 선택

export interface LevelData {
  id: string;               // "track-a-1"
  trackId: string;          // "track-a"
  order: number;            // 트랙 내 순서
  title: string;            // 레벨 제목
  learningPoint: string;    // 1줄 학습 포인트
  problemType: ProblemType;

  // 문제 내용
  instructions: string;     // 사용자에게 보여줄 안내
  targetStructure: TargetNode; // 목표 DOM 구조
  hint?: string;

  // 유형별 추가 데이터
  options?: string[];       // T1: 선택지
  template?: string;        // T2: 빈칸 포함 코드
  scrambled?: string[];     // T3: 섞인 태그 목록
  blocks?: TagBlock[];      // T4: 드래그 블록
  starterCode?: string;     // T5, T6: 초기 코드
  brokenCode?: string;      // T6: 오류 있는 코드

  // 검증
  validator: ValidatorConfig;
  successMessage: string;
}

export interface TargetNode {
  tag: string;
  attributes?: Record<string, string>;
  children?: TargetNode[];
  textContent?: string;
  _note?: string;           // 설계자 주석 (표시 안 함)
}

export interface ValidatorConfig {
  mode: 'EXACT_MATCH' | 'STRUCTURE_MATCH' | 'CONTAINS' | 'CUSTOM';
  allowedAlternatives?: TargetNode[];  // 복수 정답
  requiredTags?: string[];             // 반드시 포함해야 할 태그
  forbiddenTags?: string[];            // 쓰면 안 되는 태그
  requiredAttributes?: AttributeRule[];
  customCheck?: string;                // 커스텀 검증 함수 이름
}
```

---

## 20. HTML 검증 & 파싱 전략

### DOMParser 활용

브라우저 내장 `DOMParser`를 사용해 서버 의존성을 제거한다.

```typescript
// engine/parser.ts

export interface ParseResult {
  document: Document;
  bodyChildren: Element[];
  hasParseError: boolean;
}

export function parseHtml(input: string): ParseResult {
  const parser = new DOMParser();
  // text/html로 파싱 시 브라우저가 자동으로 오류 복구
  const doc = parser.parseFromString(
    `<!DOCTYPE html><html><body>${input}</body></html>`,
    "text/html"
  );

  // 파서 오류 감지: parsererror 요소 확인
  const hasError = !!doc.querySelector("parsererror");

  return {
    document: doc,
    bodyChildren: [...doc.body.children] as Element[],
    hasParseError: hasError,
  };
}
```

> **주의**: `text/html` 파서는 오류를 자동 복구한다.
> 예: `<li>` 를 `<div>` 안에 넣으면 브라우저가 자동으로 이동시킬 수 있다.
> 따라서 파싱 후 **Content Model 규칙을 별도로 검증**해야 한다.

### Content Model 규칙 정의

MDN HTML 사양 기반으로 규칙을 코드로 정의한다.

```typescript
// engine/contentModel.ts
// 참조: https://html.spec.whatwg.org/multipage/dom.html#content-models

export const CONTENT_MODEL_RULES: Record<string, ContentModelRule> = {
  ul: {
    allowedChildren: ['li'],
    errorMessage: (child) => `${child}는 ul의 자식이 될 수 없어요. ul 안에는 li만 올 수 있어요.`,
  },
  ol: {
    allowedChildren: ['li'],
    errorMessage: (child) => `${child}는 ol의 자식이 될 수 없어요. ol 안에는 li만 올 수 있어요.`,
  },
  table: {
    allowedChildren: ['thead', 'tbody', 'tfoot', 'tr', 'caption', 'colgroup'],
    errorMessage: (child) => `${child}는 table의 직접 자식이 될 수 없어요.`,
  },
  tr: {
    allowedChildren: ['td', 'th'],
    errorMessage: (child) => `${child}는 tr 안에만 올 수 있어요.`,
  },
  // 중복 허용 불가 태그
  _singletons: ['main', 'title'],
};

// 허용 위치 규칙
export const PARENT_RULES: Record<string, ParentRule> = {
  li: {
    requiredParents: ['ul', 'ol', 'menu'],
    errorMessage: 'li는 ul, ol, menu의 직접 자식이어야 해요.',
  },
  td: {
    requiredParents: ['tr'],
    errorMessage: 'td는 반드시 tr 안에 있어야 해요.',
  },
  th: {
    requiredParents: ['tr'],
    errorMessage: 'th는 반드시 tr 안에 있어야 해요.',
  },
  dt: {
    requiredParents: ['dl'],
    errorMessage: 'dt는 dl 안에 있어야 해요.',
  },
  dd: {
    requiredParents: ['dl'],
    errorMessage: 'dd는 dl 안에 있어야 해요.',
  },
};
```

### 정답 비교 전략

```typescript
// engine/differ.ts

export type MatchMode = 'EXACT' | 'STRUCTURE' | 'CONTAINS';

export function compareStructure(
  userTree: Element[],
  targetTree: TargetNode[],
  mode: MatchMode
): CompareResult {
  switch (mode) {
    case 'EXACT':
      // 태그명, 속성, 자식 구조까지 완전 일치
      return exactMatch(userTree, targetTree);
    case 'STRUCTURE':
      // 태그명과 계층 구조만 비교 (속성 무시)
      return structureMatch(userTree, targetTree);
    case 'CONTAINS':
      // 정답 구조가 사용자 코드에 포함되어 있으면 정답
      return containsMatch(userTree, targetTree);
  }
}
```

---

## 21. DOM 트리 시각화 전략

### 시각화 방식 2가지 동시 제공

**① DOM 트리 뷰 (구조 트리)**

```
body
├── header
│   └── nav
│       └── ul
│           ├── li → a "홈"
│           └── li → a "소개"
└── main
    └── section
        ├── h2 "제목"
        └── p "내용"
```

**② 박스 구조 뷰 (시각적 계층)**

CSS 없이 **색깔 있는 박스**로 계층 표현.
각 태그는 고유한 배경색을 가진다:
- `header` = 파란색 계열
- `main` = 초록색 계열
- `section`, `article` = 주황색 계열
- `div` = 회색 (의도적으로 밋밋하게 — "div보다 시맨틱 태그를")

### 오류 노드 표시

```typescript
// 오류 있는 노드: 빨간 테두리 + 툴팁
interface TreeNodeStyle {
  tagName: string;
  depth: number;
  hasError: boolean;
  errorMessage?: string;
  isCorrect?: boolean;   // 정답 비교 모드
  isMissing?: boolean;   // 목표 트리에만 있고 사용자 트리에 없음
  isExtra?: boolean;     // 사용자 트리에만 있음
}
```

---

## 22. CodeMirror 6 통합 설계

### 패키지 구성

```bash
npm install codemirror
npm install @codemirror/lang-html
npm install @codemirror/lint
npm install @uiw/react-codemirror   # React 래퍼 (선택)
```

### 커스텀 Lint Source

```typescript
// engine/lintSource.ts
// CodeMirror linter에 연결할 커스텀 HTML 구조 검증

import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "codemirror";
import { validateHtmlStructure } from "./validator";

export function htmlStructureLinter(view: EditorView): Diagnostic[] {
  const code = view.state.doc.toString();
  const result = validateHtmlStructure(code);

  return result.errors.map((error) => ({
    from: findErrorPosition(view, error.node),
    to: findErrorPosition(view, error.node) + error.node.length + 2,
    severity: error.severity,   // "error" | "warning"
    message: error.message,     // 한국어 메시지
  }));
}
```

### CodeEditor 컴포넌트 완성형

```typescript
// components/editor/CodeEditor.tsx

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { linter, lintGutter } from "@codemirror/lint";
import { htmlStructureLinter } from "@/engine/lintSource";

export function CodeEditor({ initialValue, onChange }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    viewRef.current = new EditorView({
      doc: initialValue ?? "",
      extensions: [
        basicSetup,
        html(),
        lintGutter(),
        linter(htmlStructureLinter),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
      parent: containerRef.current,
    });

    return () => viewRef.current?.destroy();
  }, []);

  return <div ref={containerRef} className="code-editor" />;
}
```

---

## 23. 상태 관리 설계

### Zustand 스토어 구조

```typescript
// store/progressStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LevelProgress {
  levelId: string;
  completed: boolean;
  completedAt?: string;
  usedHint: boolean;
  attempts: number;
}

interface ProgressStore {
  progress: Record<string, LevelProgress>;  // levelId → progress
  currentTrackId: string | null;
  currentLevelId: string | null;

  // Actions
  completeLevel: (levelId: string, usedHint: boolean) => void;
  incrementAttempt: (levelId: string) => void;
  setCurrentLevel: (trackId: string, levelId: string) => void;
  isCompleted: (levelId: string) => boolean;
  getTrackProgress: (trackId: string, levelIds: string[]) => number;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      currentTrackId: null,
      currentLevelId: null,

      completeLevel: (levelId, usedHint) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [levelId]: {
              levelId,
              completed: true,
              completedAt: new Date().toISOString(),
              usedHint,
              attempts: state.progress[levelId]?.attempts ?? 1,
            },
          },
        })),

      isCompleted: (levelId) => !!get().progress[levelId]?.completed,

      getTrackProgress: (trackId, levelIds) => {
        const completed = levelIds.filter((id) => get().isCompleted(id)).length;
        return Math.round((completed / levelIds.length) * 100);
      },
    }),
    { name: "tagquest-progress" }  // localStorage key
  )
);
```

---

## 24. 진행률 스토리지 전략

### MVP: localStorage

```
localStorage key: "tagquest-progress"
구조: { progress: { "track-a-1": { completed, usedHint, attempts } } }
```

### 추후 확장: Supabase

```
로그인 도입 시:
- supabase.from('progress').upsert({ user_id, level_id, completed_at })
- 기기 간 동기화 가능
- 학습 통계 집계 가능
```

---

## 25. 샘플 레벨 정의 (레벨 1–5)

### Level A-1: 첫 번째 제목

```json
{
  "id": "track-a-1",
  "trackId": "track-a",
  "order": 1,
  "title": "첫 번째 제목",
  "learningPoint": "h1은 페이지에서 가장 중요한 제목을 나타내요",
  "problemType": "TAG_SELECT",
  "instructions": "이 텍스트를 페이지의 메인 제목으로 만들어보세요.",
  "targetStructure": {
    "tag": "h1",
    "textContent": "안녕하세요"
  },
  "options": ["h1", "p", "div", "span"],
  "hint": "h1은 Heading 1의 약자예요. 페이지에서 가장 큰 제목이에요.",
  "validator": {
    "mode": "STRUCTURE_MATCH",
    "requiredTags": ["h1"]
  },
  "successMessage": "맞아요! h1은 페이지에서 딱 하나, 가장 중요한 제목에 써요."
}
```

### Level A-3: 문단 만들기

```json
{
  "id": "track-a-3",
  "trackId": "track-a",
  "order": 3,
  "title": "문단 만들기",
  "learningPoint": "p 태그는 하나의 문단(paragraph)을 나타내요",
  "problemType": "FILL_BLANK",
  "instructions": "이 문장을 하나의 문단으로 감싸보세요.",
  "template": "<___>HTML을 배우고 있어요.</___>",
  "targetStructure": {
    "tag": "p",
    "textContent": "HTML을 배우고 있어요."
  },
  "hint": "paragraph의 첫 글자를 생각해보세요.",
  "validator": {
    "mode": "EXACT_MATCH",
    "requiredTags": ["p"]
  },
  "successMessage": "p는 paragraph(문단)의 약자예요. 글의 덩어리마다 p로 묶어요."
}
```

### Level C-1: ul과 li

```json
{
  "id": "track-c-1",
  "trackId": "track-c",
  "order": 1,
  "title": "순서 없는 목록",
  "learningPoint": "목록은 ul > li 구조로 만들어요",
  "problemType": "DIRECT_INPUT",
  "instructions": "사과, 바나나, 포도를 순서 없는 목록으로 만들어보세요.",
  "starterCode": "<!-- 여기에 작성해보세요 -->",
  "targetStructure": {
    "tag": "ul",
    "children": [
      { "tag": "li", "textContent": "사과" },
      { "tag": "li", "textContent": "바나나" },
      { "tag": "li", "textContent": "포도" }
    ]
  },
  "hint": "ul은 unordered list, li는 list item의 약자예요.",
  "validator": {
    "mode": "STRUCTURE_MATCH",
    "requiredTags": ["ul", "li"],
    "forbiddenTags": ["ol"]
  },
  "successMessage": "완벽해요! ul은 항목의 순서가 중요하지 않을 때 써요."
}
```

### Level D-1: 페이지 기본 뼈대

```json
{
  "id": "track-d-1",
  "trackId": "track-d",
  "order": 1,
  "title": "페이지 기본 뼈대",
  "learningPoint": "대부분의 웹 페이지는 header, main, footer로 나뉘어요",
  "problemType": "BLOCK_ASSEMBLE",
  "instructions": "header, main, footer를 올바른 순서로 배치해보세요.",
  "blocks": [
    { "tag": "header", "label": "머리말 영역" },
    { "tag": "main", "label": "본문 영역" },
    { "tag": "footer", "label": "바닥글 영역" }
  ],
  "targetStructure": {
    "tag": "body",
    "children": [
      { "tag": "header" },
      { "tag": "main" },
      { "tag": "footer" }
    ]
  },
  "hint": "사람이 위에서 아래로 읽듯이, 페이지도 위에서 아래 순서로 구성해요.",
  "validator": {
    "mode": "EXACT_MATCH",
    "requiredTags": ["header", "main", "footer"]
  },
  "successMessage": "이 3가지 구조가 시맨틱 HTML의 시작이에요!"
}
```

### Level E-2: article vs section

```json
{
  "id": "track-e-2",
  "trackId": "track-e",
  "order": 2,
  "title": "article vs section",
  "learningPoint": "article은 독립적으로 배포 가능한 콘텐츠, section은 주제별 묶음이에요",
  "problemType": "SEMANTIC_CHOICE",
  "instructions": "블로그 글 하나를 나타내는 태그는 무엇이 더 적절할까요?",
  "options": ["article", "section", "div"],
  "context": "RSS 피드에 넣어도 의미가 통하는 독립적인 블로그 글 1개",
  "targetStructure": { "tag": "article" },
  "allowedAlternatives": [{ "tag": "article" }],
  "hint": "이 콘텐츠를 잘라서 다른 사이트에 올려도 의미가 통하나요?",
  "validator": {
    "mode": "CONTAINS",
    "requiredTags": ["article"]
  },
  "successMessage": "맞아요! article은 독립적으로 의미가 통하는 콘텐츠에 써요. 뉴스 기사, 블로그 글, 댓글 하나가 전형적인 예예요."
}
```

---

## 26. 개발 단계 로드맵

### Phase 1. 기반 구축 (1–2주)

| 작업 | 세부 내용 |
|------|-----------|
| 프로젝트 초기화 | Next.js 15 + TypeScript + Tailwind |
| 레벨 스키마 확정 | `LevelData` 타입 정의 |
| 파서 구현 | `DOMParser` 래퍼 + Content Model 규칙 |
| 검증 엔진 구현 | `validator.ts` + `differ.ts` |
| 기본 라우팅 | `/tracks/[id]/levels/[id]` |

### Phase 2. 핵심 UI 구현 (2–3주)

| 작업 | 세부 내용 |
|------|-----------|
| CodeEditor 컴포넌트 | CodeMirror 6 + HTML lint 연결 |
| DOM 트리 시각화 | `DomTreeView` 재귀 컴포넌트 |
| 레벨 플레이어 | 3-panel 레이아웃 조립 |
| 피드백 패널 | 오류 메시지 + 성공 모달 |
| T1, T2 문제 유형 | TagSelector, FillInBlank |

### Phase 3. 콘텐츠 & 진행률 (1–2주)

| 작업 | 세부 내용 |
|------|-----------|
| 레벨 데이터 작성 | 트랙 A, C, D, E — 20~25 레벨 |
| 진행률 스토어 | Zustand + localStorage |
| 트랙/레벨 목록 UI | 완료율 표시 |
| 힌트 시스템 | 단계적 공개 |

### Phase 4. 품질 & 배포 (1주)

| 작업 | 세부 내용 |
|------|-----------|
| 에러 경계 처리 | 잘못된 코드 입력에 안전 |
| 접근성 기본 | keyboard nav, ARIA 레이블 |
| 반응형 기본 | 768px 이상 정상 작동 |
| Vercel 배포 | 정적 배포 (서버 불필요) |

### 전체 일정 요약

```
Week 1-2: Phase 1 (기반)
Week 3-5: Phase 2 (UI)
Week 6-7: Phase 3 (콘텐츠)
Week 8:   Phase 4 (배포)
────────────────────────
총 8주 = 약 2개월 (1인 기준)
```

---

## 부록. 기술 레퍼런스

| 항목 | 공식 링크 |
|------|-----------|
| HTML Content Model (MDN) | https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories |
| HTML 요소 허용 콘텐츠 (WHATWG) | https://html.spec.whatwg.org/multipage/dom.html#content-models |
| CodeMirror 6 가이드 | https://codemirror.net/docs/guide |
| CodeMirror lang-html | https://github.com/codemirror/lang-html |
| CodeMirror lint | https://codemirror.net/docs/ref/#lint |
| DOMParser API | https://developer.mozilla.org/en-US/docs/Web/API/DOMParser |
| Next.js 15 App Router | https://nextjs.org/docs/app |
| Zustand | https://zustand-demo.pmnd.rs |

---

> **이 문서로 커버되는 범위**:
> 서비스 목적 정의 → 커리큘럼 설계 → 문제 유형 정의 → UI 설계 → 기술 스택 → 아키텍처 → 컴포넌트 명세 → 데이터 모델 → 검증 로직 → 진행률 관리 → 개발 로드맵
>
> **다음 단계**: 이 기획서를 바탕으로 레벨 데이터 JSON 20~25개 작성 → 컴포넌트 구현 시작
