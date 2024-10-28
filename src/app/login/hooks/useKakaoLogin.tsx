export default function useKakaoLogin() {
  const loginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&redirect_uri=${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}?category=kakao&response_type=code`;
  };

  return { loginHandler };
}
