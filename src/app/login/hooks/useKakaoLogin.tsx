interface Props {
  successEvent: (provider: string, providerId: string) => void;
}

export default function useKakaoLogin({ successEvent }: Props) {
  const loginHandler = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&redirect_uri=${`http://localhost:3000/login/callback`}&response_type=code`;
    window.location.href = link;
  };

  return { loginHandler };
}
