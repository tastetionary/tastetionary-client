/**
 * 회원가입 퍼널의 단계별 컨텍스트.
 *
 * 단계가 진행될수록 필수값이 늘어난다. 앞 단계의 값이 없으면 다음 단계로 갈 수 없다는 것을 타입으로 보장해,
 * 예전처럼 하나의 거대한 폼을 모든 단계가 공유하면서 "지금 이 값이 있는지"를 런타임에 추측하지 않아도 된다.
 *
 * 컨텍스트는 sessionStorage 에 담겨 새로고침·뒤로가기에도 유지된다. (shared/lib/use-funnel)
 * 그래서 비밀번호는 여기에 넣지 않는다. (SignUpComponent 의 state 에만 둔다)
 */
export interface SignUpArea {
  address: string;
  latitude: number;
  longitude: number;
}

interface Verified {
  email: string;
  /** 인증이 끝난 authentication id. 가입 요청에 그대로 실어 보낸다 */
  authenticationId: number;
}

export type SignUpSteps = {
  약관동의: object;
  이메일입력: object;
  /** historyId: 인증 메일을 보낼 때 받은 id. 코드 확인 요청에 쓴다 */
  인증코드: { email: string; historyId: number };
  회원정보: Verified;
  지역설정: Verified & { nickname: string };
  가입완료: object;
};
