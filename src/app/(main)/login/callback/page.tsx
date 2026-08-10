'use client';

import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLoginMutate from '../hooks/useLoginMutate';
import { getSocialRedirectUri } from '../lib/socialRedirectUri';
import Loading from '@/assets/animation/loading.json';
import { TloginCategory } from '@/shared/api/auth';
import { overlayVariants } from '@/shared/ui/Modal/DialogModal/style';
import * as S from '@/shared/ui/Modal/LoadingModal/style';
import { cn } from '@/shared/utils/styles.utils';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const { mutate: login, isSuccess, data } = useLoginMutate(); // isSuccess, data 추가

  const [hash, setHash] = useState('');
  const [value, setValue] = useState<string | null>(null);

  // 어느 소셜에서 왔는지는 state 로 받는다.
  // (redirect_uri 에 ?category= 를 붙이면 카카오 콘솔에 등록할 수 없어 KOE006 이 난다.)
  // category 쿼리는 아직 이 방식을 쓰는 네이버 콜백용 폴백.
  const category = (searchParams.get('state') ?? searchParams.get('category')) as undefined | TloginCategory;
  const code = searchParams.get('code');

  // ✅ 추가: 로그인 성공 시 앱으로 리다이렉트
  useEffect(() => {
    if (isSuccess && data) {
      const returnUrl = sessionStorage.getItem('app_return_url');

      if (returnUrl) {
        // 앱에서 온 경우 → 딥링크로 토큰 전달
        sessionStorage.removeItem('app_return_url');

        const appUrl = `${returnUrl}?accessToken=${encodeURIComponent(data.accessToken)}&refreshToken=${encodeURIComponent(data.refreshToken)}`;
        console.log('앱으로 리다이렉트:', appUrl);

        // 약간의 딜레이 후 리다이렉트
        setTimeout(() => {
          window.location.href = appUrl;
        }, 500);
        return;
      }

      // 웹에서 온 경우 → 기존 로직 (예: 홈으로 이동)
      // router.push('/');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!value || value === '' || !category) return;

    // 인가 코드를 받을 때 쓴 redirect_uri 를 그대로 동봉한다.
    // (서버가 이 값으로 카카오/구글에 토큰을 요청하므로 값이 다르면 invalid_grant 로 실패한다.)
    login({
      category,
      code: value,
      identification: '',
      password: '',
      redirectUri: getSocialRedirectUri(),
    });
  }, [value, category, login]);

  useEffect(() => {
    if (category === 'kakao' || category === 'google') setValue(code);

    const handleHashChange = () => {
      setHash(window.location.hash?.replace('#', ''));
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [category, code]);

  // ✅ 수정: 웹뷰에서 토큰 받기 (RN에서 postMessage로 전달한 경우)
  useEffect(() => {
    const handleAppMessage = (event: CustomEvent) => {
      const { type, payload } = event.detail;

      if (type === 'GOOGLE_LOGIN_SUCCESS') {
        // 기존 방식: code로 로그인 (이제 사용 안 함)
        login({ category: 'google', code: payload.code, identification: '', password: '' });
      }
    };

    window.addEventListener('appMessage', handleAppMessage as EventListener);
    return () => window.removeEventListener('appMessage', handleAppMessage as EventListener);
  }, [login]);

  return (
    <div className={cn(overlayVariants({ visibility: 'visible', animation: 'visible' }))}>
      <div className={cn(S.loadingModalContainerVariants({ visibility: 'visible', animation: 'visible' }))}>
        <Lottie
          autoPlay={true}
          loop={true}
          rendererSettings={{
            preserveAspectRatio: '',
          }}
          animationData={Loading}
          height={80}
          width={80}
        />
      </div>
    </div>
  );
}
