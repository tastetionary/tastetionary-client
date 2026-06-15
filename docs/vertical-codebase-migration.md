# 수평적 구조에서 수직적 구조로: Tastetionary 아키텍처 리팩터링

> 참고 글: [The Vertical Codebase — TkDodo](https://tkdodo.eu/blog/the-vertical-codebase)

폴더를 `components/`, `hooks/`, `utils/`, `apis/`처럼 **"기술 종류(type)"** 로 나누는 방식은
프로젝트가 작을 땐 깔끔해 보이지만, 규모가 커지면 "함께 바뀌는 코드가 서로 멀리 떨어져 있는"
문제로 이어집니다. 이 글에서는 TkDodo의 _The Vertical Codebase_ 를 기준으로 Tastetionary 프론트엔드를
**수평(horizontal) → 수직(vertical)** 구조로 옮긴 과정과, 그 전후 차이를 정리합니다.

---

## 1. 핵심 개념: 수평 vs 수직

|           | 수평적 구조 (Horizontal)                       | 수직적 구조 (Vertical)                        |
| --------- | ---------------------------------------------- | --------------------------------------------- |
| 분류 기준 | 파일의 **기술 종류** (component / hook / util) | 코드가 하는 **일(기능/도메인)**               |
| 예시      | `hooks/`에 `useTheme`와 `useTodo`가 공존       | `features/todo/`에 todo 관련 코드가 모두 모임 |
| 변경 시   | 한 기능을 고치려고 여러 폴더를 오감            | 한 폴더 안에서 끝남                           |
| 확장성    | `components/`에 200개 파일이 쌓임              | 기능별로 격리되어 탐색·소유가 쉬움            |

TkDodo가 강조하는 원칙은 단순합니다.

> **"Code that changes together should live together."**
> (함께 바뀌는 코드는 함께 살아야 한다)

여기에 **높은 응집도(high cohesion) · 낮은 결합도(low coupling)**, 그리고
**팀 구조와의 정렬**(기능 팀이 자기 도메인을 위에서 아래까지 소유)이 더해집니다.

---

## 2. Before — 수평적 구조

리팩터링 이전, `src/` 최상위는 전형적인 "기술 종류 버킷"이었습니다.

```
src/
├─ apis/            # 18 files — http 클라이언트 + 모든 도메인 API가 한 곳에
│  ├─ http.ts
│  ├─ home/  food/  restaurant/  user/  auth/  register/
│  └─ restaurant/review/
├─ components/      # 71 files — 디자인 시스템 + 기능별 컴포넌트가 31개 폴더에 뒤섞임
│  ├─ Button/  Modal/  Input/  Tab/  Toast/  GNB/  layout/   (← 공용 디자인 시스템)
│  ├─ c-change-region/  c-region-setting/                    (← 지역 기능)
│  ├─ c-recommend-button/  c-select-category/  c-select-keyword/  (← 추첨 기능)
│  ├─ c-review-browser-item/  c-review-report-btn/ ...        (← 리뷰 기능)
│  └─ c-mypage-items/  c-mypage-menu/ ...                     (← 마이페이지)
├─ hooks/           # useRegion, useUser, useToken, useRewardedAd ...
├─ store/           # useRegionStore, useSelectFoodStore, useReviewStore ...
├─ utils/  constants/  lib/  types/
└─ app/             # Next.js App Router 라우트
```

### 무엇이 문제였나

- **지역 설정 기능 하나**를 수정하려면 `components/c-change-region`, `components/c-region-setting`,
  `hooks/useRegion`, `store/useRegionStore`, `apis/user/saveRegion`, 그리고 `app/(main)/_components/location-section`까지
  **6개 폴더**를 동시에 열어야 했습니다.
- `components/`는 31개 폴더가 "컴포넌트라는 것" 외에 공통점이 없었습니다. 디자인 시스템 버튼과
  특정 화면 전용 컴포넌트가 같은 깊이에 나란히 있었습니다.
- 어떤 컴포넌트가 **공용인지 기능 전용인지** 폴더만 봐서는 알 수 없었습니다.

---

## 3. After — 수직적 구조

함께 바뀌는 코드를 **기능(feature) 단위**로 모으고, 여러 기능이 공유하는 코드만 **`shared/`** 로 내렸습니다.

```
src/
├─ features/                     # 수직 슬라이스 — "무슨 일을 하는가"로 분류
│  ├─ region/                    # 지역 설정
│  │  ├─ components/  (c-change-region, c-region-setting)
│  │  ├─ hooks/       (useRegion)
│  │  └─ store/       (useRegionStore)
│  ├─ recommendation/            # 메뉴/식당 고르기 + 추첨 + 결과
│  │  ├─ components/  (c-recommend-button, c-select-category, c-select-keyword)
│  │  ├─ store/       (useSelectFoodStore, useSelectRestaurantStore, useSelectResultStore)
│  │  └─ api/         (food/, restaurant/)
│  ├─ reviews/                   # 식당 리뷰
│  │  ├─ components/  store/  api/
│  ├─ home/                      # 홈
│  │  └─ api/
│  └─ user/                      # 사용자/마이페이지
│     └─ components/
│
├─ shared/                       # 여러 기능이 공유하는 수평 레이어
│  ├─ ui/          # 디자인 시스템 (Button, Modal, Input, Tab, Toast, GNB, layout, c-header ...)
│  ├─ api/         # http 클라이언트 + 공통 도메인(user, auth, register)
│  ├─ hooks/       # useUser, useToken, useAxiosInterceptor, useRewardedAd, useFunnel
│  ├─ store/       # useModalStore, useAgreeTermStore
│  ├─ lib/  utils/  constants/  types/
│
├─ app/                          # Next.js 라우트 (이미 수직적 — 라우트 = 자연스러운 경계)
│  ├─ (main)/...
│  └─ _legacy/...                # 격리된 레거시 버티컬 (그대로 동결)
│
├─ assets/  styles/              # 정적 리소스 (위치 유지)
```

### 설계 결정 3가지

1. **`app/` 라우트는 그대로 둔다.**
   TkDodo도 _"Routes and pages often define natural grouping boundaries"_ 라고 말합니다.
   Next.js App Router의 라우트 폴더(+ 그 안의 `_components`, `_hooks`)는 이미 라우트별로 코드를
   콜로케이션하고 있어 **본질적으로 수직적**입니다. 수평적 악취는 최상위 `components/hooks/utils/...`
   버킷에 있었고, 그 버킷만 옮겼습니다.

2. **공유 UI는 `shared/ui`(디자인 시스템)로, 기능 전용 컴포넌트는 `features/<f>/components`로.**
   `c-change-region`이 누구 것인지 이제 경로가 말해줍니다 — `features/region/`.

3. **`_legacy`는 동결된 하나의 버티컬로 본다.**
   언더스코어로 라우팅에서 제외된 레거시 영역은 그 자체로 독립 슬라이스이므로 휘젓지 않았습니다.
   (레거시가 `features/`를 참조하는 것은 허용되는 의존 방향입니다.)

---

## 4. 마이그레이션을 어떻게 했나 (안전하게)

대규모 이동(파일 118개 rename, import 라인 약 382곳 수정, 파일 131개 변경)을 깨지지 않게 진행한 절차:

1. **블라스트 반경 측정** — `@/components`(206) `@/apis`(51) `@/store`(31) `@/hooks`(29) 등
   import 사용처를 먼저 셌습니다.
2. **깨지는 상대경로 import 사전 변환** — 컴포넌트 간 상대 import(`'../Button/...'`, `'../Modal/...'`)는
   파일이 다른 디렉터리로 흩어지면 깨지므로, **이동 전에** 절대 별칭(`@/shared/ui/...`)으로 바꿨습니다.
   API 파일의 `'../http'`, `'../../types/enums'`도 마찬가지로 선처리했습니다.
3. **`git mv`로 이동** — 히스토리를 보존하기 위해 일반 `mv`가 아닌 `git mv`를 사용했습니다.
4. **`@/` 별칭 전역 치환** — 구체적인 규칙(기능 컴포넌트)을 먼저, 포괄 규칙(`@/components/ → @/shared/ui/`)을
   나중에 적용해 충돌을 막았습니다.
5. **검증** — `tsc --noEmit` 통과 + dev 서버에서 핵심 라우트 6개(`/`, `/explore`, `/select-menu`,
   `/select-restaurant`, `/select-restaurant/region-setting`, `/reviews/browse`) 모두 200 확인.

> `tsconfig`의 `@/* → src/*` 별칭 덕분에, 파일을 옮겨도 **import 경로만** 바꾸면 됐습니다.

---

## 5. Before / After 한눈에 보기

**"지역 설정 기능을 수정한다"** 는 시나리오로 비교하면:

|                | Before (수평)                                               | After (수직)                   |
| -------------- | ----------------------------------------------------------- | ------------------------------ |
| 컴포넌트       | `components/c-change-region`, `components/c-region-setting` | `features/region/components/*` |
| 훅             | `hooks/useRegion`                                           | `features/region/hooks/*`      |
| 스토어         | `store/useRegionStore`                                      | `features/region/store/*`      |
| 열어야 할 폴더 | 흩어진 여러 최상위 버킷                                     | **`features/region/` 한 곳**   |
| 소유권         | 불명확                                                      | 폴더가 곧 경계이자 소유자      |

---

## 6. 트레이드오프와 남은 과제

수직 구조가 공짜는 아닙니다. 글에서 지적한 대로, 이번 작업에서도 동일한 긴장이 드러났습니다.

- **공유 코드의 위치 판단이 필요하다.**
  `c-select-category` / `c-select-keyword`처럼 메뉴·식당 두 기능이 함께 쓰는 컴포넌트는
  "어느 기능의 것인가?"를 결정해야 했습니다. 추첨 흐름은 하나의 응집된 도메인으로 보아
  `features/recommendation/`으로 묶었습니다.
- **의존 방향 위반을 발견했다.**
  `shared/ui/GNB`가 `features/reviews`의 훅을 import 하고 있습니다 → 이는 `shared → feature`라는
  **잘못된 방향**입니다. 지금은 컴파일을 위해 별칭으로 연결만 해두었고, 추후 해당 로직을
  reviews 기능으로 옮기거나 props로 주입해 끊어야 합니다. (수직 구조의 장점: 이런 위반이 **눈에 보인다**.)
- **경계 강제는 아직 미적용.**
  글이 권하는 `eslint-plugin-boundaries`로 "feature 간 직접 참조 금지 / shared는 feature를 모름" 같은
  규칙을 강제하면 위 위반을 CI에서 자동 차단할 수 있습니다. 다음 단계 후보입니다.
- **기능별 public API(barrel `index.ts`)** 를 두면 외부에 노출할 표면을 명시할 수 있습니다.
  순환 참조 리스크가 있어 이번엔 보류했습니다.

---

## 7. 결론

수평 구조는 _"이 파일은 무엇인가(컴포넌트? 훅?)"_ 에 답하기 좋고,
수직 구조는 _"이 기능은 어디 있는가"_ 에 답하기 좋습니다.
실무에서 우리가 훨씬 자주 던지는 질문은 후자입니다.

이번 리팩터링으로 Tastetionary는

- 최상위에서 **무슨 기능이 있는지** (`features/`)가 바로 보이고,
- 기능을 고칠 때 **한 폴더 안에서** 끝나며,
- **공유 자산**(`shared/`)과 **기능 자산**(`features/`)의 경계가 분명해졌습니다.

TkDodo의 말처럼, 잘 잡힌 구조는 사람에게도 **AI 에이전트에게도** 좋습니다 —
명확한 경계와 빠른 피드백 루프는 누가 코드를 읽든 효율을 높여주니까요.
