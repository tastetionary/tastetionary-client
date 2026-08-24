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
  const { mutate: login } = useLoginMutate();

  const [hash, setHash] = useState('');
  const [value, setValue] = useState<string | null>(null);

  // 어느 소셜에서 왔는지는 state 로 받는다.
  // (redirect_uri 에 ?category= 를 붙이면 카카오 콘솔에 등록할 수 없어 KOE006 이 난다.)
  // category 쿼리는 아직 이 방식을 쓰는 네이버 콜백용 폴백.
  const category = (searchParams.get('state') ?? searchParams.get('category')) as undefined | TloginCategory;
  const code = searchParams.get('code');

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
