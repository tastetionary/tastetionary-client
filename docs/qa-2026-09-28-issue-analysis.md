# QA 이슈 원인 분석 (2026-09-28 리포트, 2026-10-11 분석)

QA 담당자가 2026-09-28 에 올린 10건의 이슈를 전부 확인한 결과다.
FE 코드만으로 고친 항목은 [수정 내역](./qa-2026-09-28-fix-log.md)에 따로 정리했고,
이 문서는 **FE 에서 끝낼 수 없는 항목**의 원인과 필요한 후속 작업을 적는다.
(FE 쪽에서 임시 방어나 안내를 넣은 항목은 그 내용도 함께 적었다.)

## 한눈에 보기

| #      | 이슈                                                            | 판정                 | 담당         | FE 조치                          |
| ------ | --------------------------------------------------------------- | -------------------- | ------------ | -------------------------------- |
| 1      | 구글 로그인 실패                                                | 서버/설정            | BE           | 없음 (아래 분석)                 |
| 2, 2-1 | 닉네임 수정 시 항상 `(banned word)` 에러                        | **서버 버그** + 문구 | BE + FE      | 문구 교체, 동일 닉네임 사전 안내 |
| 3      | 카카오 계정인데 비밀번호 재설정 진입 가능 → `account not found` | 기획 + 서버 응답     | 기획/BE + FE | 소셜 계정 안내 모달              |
| 4      | 자주 묻는 질문                                                  | 기획                 | 기획         | 없음                             |
| 5      | 공유 링크에서 "한 번 더 돌리기" → 추첨 가능한 메뉴 없음         | FE 버그              | FE           | **수정 완료**                    |
| 6      | 팝업(토스트) 글씨 안 보임                                       | FE 버그              | FE           | **수정 완료**                    |
| 7      | 지도 스크롤이 길다                                              | FE                   | FE           | **수정 완료**                    |
| 8      | 리뷰 더보기 하단 메뉴 디자인                                    | FE                   | FE           | **수정 완료**                    |
| 9      | 리뷰 수정 시 기존 내용이 안 보임                                | FE 버그              | FE           | **수정 완료**                    |
| 10     | 북마크/추천 제외 목록이 안 보임                                 | 서버 응답 확인 필요  | BE + FE      | 로딩/로그인/에러 상태 표시       |

---

## #1 구글 로그인 실패

**증상**: 구글 동의 화면을 거쳐 돌아온 뒤 `로그인에 실패했어요. 잠시 후 다시 시도해주세요.` 모달.

**확인한 것**

- 이 모달은 `useLoginMutate` 의 `loginFailedModal` 이다. 즉 구글 동의 화면은 통과했고, 서버의 토큰 교환(`POST /v1/account/tokens`)이 실패한 경우다.
  (동의 화면에서 막히면 구글이 `?error=` 로 돌려보내고, FE 는 모달 없이 `/login` 으로 돌아간다.)
- 서버에 bogus code 로 직접 요청해 보면 `401 "Failed to get access token from google"` 을 돌려준다. 실제 코드로도 같은 지점에서 실패하는 것으로 보인다.
- 구글 콘솔 등록 상태(인가 URL 을 직접 열어 확인):
  - `https://tastetionary.com/login/callback` → 등록됨
  - `http://localhost:3000/login/callback` → 등록됨
  - `https://www.tastetionary.com/login/callback` → **미등록 (`redirect_uri_mismatch`)**
- 카카오는 같은 FE 흐름(`state` 로 소셜 구분, `redirectUri` 를 body 에 동봉)으로 정상 동작하므로 FE 콜백 로직 자체의 문제는 아니다.

**가능한 원인 (서버에서 확인 필요)**

1. 서버가 구글 토큰 교환 때 FE 가 보낸 `redirectUri` 를 쓰지 않고 자체 설정값을 쓴다 → 인가 때 쓴 값과 달라 `invalid_grant`.
   (서버 Swagger 의 `CreateTokenRequest` 에 `redirectUri` 필드는 있다. 받기는 하지만 실제로 쓰는지는 서버 코드를 봐야 한다.)
2. 서버의 `GOOGLE_CLIENT_SECRET` 이 FE 의 `NEXT_PUBLIC_GOOGLE_CLIENT_ID`(`1037100458975-...`)와 다른 OAuth 클라이언트의 것.
3. 구글 OAuth 앱이 "테스트" 상태이고 테스터 계정이 테스트 사용자에 없음 → 이 경우는 보통 동의 화면에서 막히므로 가능성 낮음.

**후속 작업**

- BE: 구글 토큰 교환 실패 시 구글이 돌려준 에러 본문(`invalid_grant` / `redirect_uri_mismatch` / `invalid_client`)을 서버 로그에 남기고 원인을 특정.
- BE: 토큰 교환에 요청 body 의 `redirectUri` 를 그대로 사용하는지 확인.
- 운영: `www.tastetionary.com` 으로도 접속 가능하다면 구글 콘솔 Redirect URI 에 추가.

---

## #2, #2-1 닉네임 수정 — 항상 `유효하지 않은 닉네임입니다. (banned word)`

**증상**: 기존 닉네임이든 새 닉네임이든 "중복 확인" 을 누르면 같은 에러.

**원인 (서버 버그)**

닉네임 검증 API 가 어떤 입력에도 `ERR1001` 을 돌려준다. 토큰 없이 직접 호출한 결과:

```
GET /v1/user/nickname/validation?name=hello123   → 400 ERR1001 "invalid nickname"
GET /v1/user/nickname/validation?name=테스트닉    → 400 ERR1001
GET /v1/user/nickname/validation?name=abc        → 400 ERR1001
GET /v1/user/nickname/validation                 → 400 ERR1001
GET /v1/user/nickname/validation?nickname=hello  → 400 ERR1001
```

파라미터 이름을 바꿔도, 평범한 영문 닉네임이어도 모두 같은 응답이라 금칙어 판정이 아니라 **검증 로직 자체가 항상 실패**하고 있다.
같은 API 를 회원가입 닉네임 단계도 쓰므로, 지금은 **이메일 회원가입의 닉네임 확인도 통과할 수 없다**.

**FE 에서 한 것**

- `ERR1001` 문구에서 `(banned word)` 를 빼고 `사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해 주세요.` 로 교체.
- 현재 닉네임과 같은 값을 입력하면 서버에 묻지 않고 입력창 아래에 `현재 사용 중인 닉네임이에요.` 를 바로 보여주고 중복 확인 버튼을 잠근다.
- 중복 확인 통과 후 입력값을 바꾸면 "변경하기" 가 다시 잠긴다. (예전에는 검증되지 않은 값이 그대로 전송됐다)
- 변경 성공 시 `['user']` 쿼리를 갱신해 마이페이지 상단 닉네임이 바로 바뀌고, 이전 화면으로 돌아간다.

**후속 작업**

- BE: `/v1/user/nickname/validation` 이 정상 닉네임에 200 을 돌려주도록 수정. 서버 수정 전까지는 닉네임 변경·이메일 회원가입이 막혀 있다.

---

## #3 카카오 로그인 계정인데 비밀번호 재설정 진입 가능 → `account not found`

**증상**: 소셜 계정으로 비밀번호 재설정을 시도하면 `account not found`(`ERR1009`) 모달.

**원인**

- 소셜 계정에는 비밀번호 레코드가 없어 서버가 `ERR1009` 를 돌려준다. 동작 자체는 맞다.
- 메뉴를 숨기려면 FE 가 "이 사용자가 어떤 방식으로 로그인했는지" 를 알아야 하는데,
  `GET /v1/user` 응답에는 `account.accountEmail` 만 있고 로그인 수단(email / kakao / google)이 없다.
  서버 Swagger(`ProfileResponse.account`)에도 "only return email" 로 명시돼 있어 FE 추측이 아니라 확정이다.

**FE 에서 한 것**

- `ERR1009` 문구를 `계정 정보를 찾을 수 없습니다.` 로 교체.
- 비밀번호 재설정 화면에서 `ERR1009` 를 받으면 `소셜 로그인 계정은 비밀번호를 사용하지 않아요.` 안내 모달을 띄우고 이전 화면으로 돌려보낸다.

**후속 작업**

- 기획: 소셜 계정에서 "비밀번호 재설정" 메뉴를 숨길지, 비활성 상태로 보여줄지 결정.
- BE: `GET /v1/user` 응답에 로그인 수단(예: `account.category: 'email' | 'kakao' | 'google'`)을 추가. 이 값이 오면 FE 에서 메뉴를 조건부로 숨길 수 있다.

---

## #4 마이페이지 — 자주 묻는 질문

현재 `/ready`("서비스 준비중입니다") 로 연결된다. 콘텐츠·형식(노션 링크 / 인앱 페이지)이 정해지면 FE 작업 가능. 기획 대기.

---

## #10 북마크 식당 관리 / 추천 제외 식당 관리 — 저장한 목록이 안 보임

**증상**: 북마크·제외 식당을 저장했는데 목록 화면에 나타나지 않음.

**확인한 것**

- API 경로는 맞다. 토큰 없이 호출하면 `GET /v1/user/preference/bookmark`, `.../excluded` 모두 `401 no token`(경로 존재)이고, 다른 후보 경로는 404 다.
- 서버 Swagger(`/api-json`)의 응답 스키마는 `data: { id, externalUUID, name, address, phone }[]` 로 FE 의 `GetPreferenceRes` 와 **정확히 일치**한다. 아래 "가능한 원인" 1번(응답 모양 불일치)은 이것으로 배제된다.
- 같은 구조(`useUser` → 토큰·사용자 id 가 준비되면 `useQuery`)로 동작하는 "작성한 리뷰 관리" 는 목록이 나온다(QA #8 스크린샷). 즉 FE 쿼리 패턴의 문제가 아니라 **이 API 응답**을 봐야 한다.
- 로그인 세션이 없어 실제 응답 본문은 이번에 확인하지 못했다.

**가능한 원인**

1. ~~응답이 FE 가 기대하는 배열 모양이 아니다~~ → Swagger 스키마가 FE 타입과 일치해 배제.
2. 저장은 되지만 조회가 빈 배열을 돌려준다(저장 시 쓰는 `restaurantId` 와 조회 기준이 다름 등). 이 경우 "북마크한 식당이 없어요" 빈 화면이 보인다. **현재 가장 유력.**
3. (예전 FE 결함) 쿼리가 꺼져 있거나 실패했을 때 로딩/에러 표시가 없어 **제목만 있는 흰 화면**이 됐다. 토큰 만료 직후나 사용자 정보 로딩 중에 이렇게 보인다.

**FE 에서 한 것**

- 로그인 전 / 로딩 중 / 요청 실패 상태를 각각 화면에 표시한다. (3번 원인은 이것으로 해소)
- 응답이 배열이 아니면 렌더가 깨지지 않도록 방어한다.

**후속 작업 (확인 방법)**

로그인한 브라우저의 `token` 쿠키 값으로 아래를 실행해 응답 본문을 확인하면 1·2번 중 어느 쪽인지 바로 갈린다.

```bash
TOKEN='<token 쿠키 값>'
curl -s -H "Authorization: Bearer $TOKEN" \
  https://tastetionary-server-production.up.railway.app/v1/user/preference/bookmark
curl -s -H "Authorization: Bearer $TOKEN" \
  https://tastetionary-server-production.up.railway.app/v1/user/preference/excluded
```

- 빈 배열이면 → BE 에서 저장/조회 기준 불일치 확인. (저장 요청은 `POST /v1/user/preference/{category}` body `{ restaurantId }` 로 식당 추첨 응답의 `id` 를 보낸다.)
- 데이터가 있는데 화면에 안 나오면 → FE 쪽이므로 응답 본문을 첨부해 다시 조사.

---

## 참고: 조사 과정에서 같이 보인 것

- 서버 Swagger 가 열려 있다: `https://tastetionary-server-production.up.railway.app/api` (JSON: `/api-json`). 응답 모양이 궁금할 때 먼저 볼 것.
- 리뷰 목록 응답(`ReviewsByUser.reviews[]`)에는 `category` 가 없다(Swagger 확인). 그래서 리뷰 수정 화면에서 음식 종류는 미리 채울 수 없다. BE 가 목록에 `category` 를 넣어주면 FE 는 추가 수정 없이 자동으로 채운다(#9 수정에 이미 반영).

- `useLoginMutate` 는 서버 `errorCode` 가 없으면 항상 `로그인에 실패했어요.` 만 보여준다. 구글 실패처럼 서버가 `errorCode` 없이 401 을 돌려주는 경우 사용자에게 원인을 전달할 방법이 없다. BE 가 `errorCode` 를 붙여주면 FE `ERROR_CODE` 표에 문구를 추가할 수 있다.
