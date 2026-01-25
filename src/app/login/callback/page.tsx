'use client';

import { TloginCategory } from '@/apis/auth';
import Loading from '@/assets/animation/loading.json';
import { overlayVariants } from '@/components/Modal/DialogModal/style';
import * as S from '@/components/Modal/LoadingModal/style';
import { cn } from '@/utils/styles.utils';
import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLoginMutate from '../hooks/useLoginMutate';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const { mutate: login, isSuccess, data } = useLoginMutate(); // isSuccess, data 추가

  const [hash, setHash] = useState('');
  const [value, setValue] = useState<string | null>(null);

  const category = searchParams.get('category') as undefined | TloginCategory;
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
    login({ category, code: value, identification: '', password: '' });
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