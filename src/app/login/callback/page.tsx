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
  const { mutate: login } = useLoginMutate();

  const [hash, setHash] = useState('');
  const [value, setValue] = useState<string | null>(null);

  console.log('value', value);
  console.log('hash', hash);

  const category = searchParams.get('category') as undefined | TloginCategory;
  const code = searchParams.get('code');

  console.log({ category, code });

  useEffect(() => {
    if (!value || value === '' || !category) return;

    login({ category, code: value, identification: '', password: '' });
  }, [value, category]);

  useEffect(() => {
    if (category === 'kakao' || category === 'google') setValue(code); // kakao / google

    const handleHashChange = () => {
      setHash(window.location.hash?.replace('#', '')); // URL의 hash 값 추출
    };

    // 처음 렌더링 시 hash 값 설정
    handleHashChange();

    // hash 값이 변경될 때마다 값을 업데이트
    window.addEventListener('hashchange', handleHashChange);

    // cleanup 이벤트 리스너
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
          height={200}
          width={200}
        />
      </div>
    </div>
  );
}
