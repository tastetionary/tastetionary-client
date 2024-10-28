export default function useGoogleLogin() {
  const loginHandler = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}?category=google&response_type=code&scope=email+profile`;
  };

  return { loginHandler };
}
