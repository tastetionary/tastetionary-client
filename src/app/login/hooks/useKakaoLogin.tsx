interface Props {
  successEvent: (provider: string, providerId: string) => void;
}

export default function useKakaoLogin({ successEvent }: Props) {
  const kakaoInit = () => {
    const kakao = (window as any).Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY);
    }

    return kakao;
  };

  const loginPopup = () => {
    kakaoInit();

    window.Kakao.Auth.loginForm({
      success(authObj: any) {
        console.log(authObj);

        window.Kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: { id: number }) => {
            console.log(res);
            const providerId = res?.id;

            if (providerId) {
              successEvent('kakao', providerId + '');
            }
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
      },
      fail(err: any) {
        console.log(err);
      },
    });
  };

  return { loginPopup };
}
