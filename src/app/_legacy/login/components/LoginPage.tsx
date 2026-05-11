'use client';

import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import LoginBtn from '../components/LoginBtn';
import useGoogleLogin from '../hooks/useGoogleLogin';
import useKakaoLogin from '../hooks/useKakaoLogin';
// import useNaverLogin from '../hooks/useNaverLogin';

export default function LoginPage() {
  const { push } = useRouter();
  const { loginHandler: kakaoLogin } = useKakaoLogin();
  const { loginHandler: googleLogin } = useGoogleLogin();
  // const { loginHandler: naverLogin } = useNaverLogin();

  const searchParams = useSearchParams();

  // 앱의 시스템 브라우저에서 열린 경우 자동으로 Google 로그인 시작
  useEffect(() => {
    const source = searchParams.get('source');
    const returnUrl = searchParams.get('returnUrl');

    if (source === 'app' && returnUrl) {
      // returnUrl 저장
      sessionStorage.setItem('app_return_url', returnUrl);

      // 자동으로 Google OAuth 시작
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}?category=google&response_type=code&scope=email+profile`;
    }
  }, [searchParams]);

  return (
    <>
      <CHeader title="로그인" />

      <div className="mt-xxxl flex w-full flex-col items-center px-xl pb-xxxl">
        <MAIN_LOGO width={80} height={80} />

        <h1 className="title2 mt-xs break-keep text-center font-bold ">
          맛셔너리,
          <br />
          직장인을 위한 맞춤 점심 추천
        </h1>

        <p className="body2 mt-xs break-keep text-center text-neutral-bg60">
          키워드로 메뉴부터 식당까지, 맛셔너리가 추천해드립니다.
        </p>

        <div className="mt-xxl w-full">
          <LoginBtn loginType="kakao" onClick={kakaoLogin} />

          <div className="bg-tran mt-xl flex justify-center gap-lg">
            {/* <LoginBtn loginType="naver" onClick={naverLogin} /> */}

            <LoginBtn loginType="google" onClick={googleLogin} />

            {/* <LoginBtn loginType="apple" /> */}

            <LoginBtn loginType="email" onClick={() => push('/login/email')} />
          </div>
        </div>

        <div className="mt-xl flex w-full items-center justify-center">
          <DefaultButton bgColor="none" customStyle="py-5 w-100" onClick={() => push('/ready')}>
            <span className="body2 !font-pretendard">아이디 찾기</span>
          </DefaultButton>

          <div className="h-20 w-1 bg-neutral-bg20" />

          <DefaultButton bgColor="none" customStyle="py-5 w-100" onClick={() => push('/sign-up')}>
            <span className="body2 !font-pretendard">회원가입</span>
          </DefaultButton>
        </div>
      </div>
    </>
  );
}
