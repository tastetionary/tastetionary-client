'use client';

import Lottie from 'lottie-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useLoginMutate from '../hooks/useLoginMutate';
import { getSocialRedirectUri } from '../lib/socialRedirectUri';
import Loading from '@/assets/animation/loading.json';
import { TloginCategory } from '@/shared/api/auth';
import { overlayVariants } from '@/shared/ui/Modal/DialogModal/style';
import * as S from '@/shared/ui/Modal/LoadingModal/style';
import { cn } from '@/shared/utils/styles.utils';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { mutate: login, isError } = useLoginMutate();
  // 같은 인가 코드는 한 번만 쓸 수 있다. (effect 가 다시 돌아도 중복 요청하지 않는다)
  const requestedCode = useRef<string | null>(null);

  // 네이버 로그인은 URL 해시로 토큰을 돌려준다. 현재 비활성이지만 부활 가능성 때문에
  // 리스너와 state 를 의도적으로 남겨둔 자리라, 읽는 곳이 없어도 지우지 않는다.
  // oxlint-disable-next-line no-unused-vars
  const [hash, setHash] = useState('');
  const [value, setValue] = useState<string | null>(null);

  // 어느 소셜에서 왔는지는 state 로 받는다.
  // (redirect_uri 에 ?category= 를 붙이면 카카오 콘솔에 등록할 수 없어 KOE006 이 난다.)
  // category 쿼리는 아직 이 방식을 쓰는 네이버 콜백용 폴백.
  const category = (searchParams.get('state') ?? searchParams.get('category')) as undefined | TloginCategory;
  const code = searchParams.get('code');

  useEffect(() => {
    if (!value || value === '' || !category) return;
    if (requestedCode.current === value) return;
    requestedCode.current = value;

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

  // 이 화면은 로딩 오버레이뿐이라, 로그인이 진행될 수 없는 경우엔 로그인 화면으로 돌려보낸다.
  // - 동의 화면에서 취소: ?error=access_denied 로 돌아오고 code 가 없다
  // - 로그인 실패: 안내 모달은 useLoginMutate 가 띄우고(전역 모달이라 이동해도 유지된다) 여기서는 빠져나가기만 한다
  const isCanceled = (category === 'kakao' || category === 'google') && !code;

  useEffect(() => {
    if (isCanceled || isError) replace('/login');
  }, [isCanceled, isError, replace]);

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
