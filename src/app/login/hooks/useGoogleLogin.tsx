interface Props {
  successEvent: (provider: string, providerId: string) => void;
}

export default function useGoogleLogin({ successEvent }: Props) {
  const googleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
     client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
     &redirect_uri=http://localhost:3000/login/callback
     &response_type=code
     &scope=email profile`;
  };

  return { googleLogin };
}
