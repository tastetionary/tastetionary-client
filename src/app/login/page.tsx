'use client';

import IC_EMAIL from '@/assets/common/Icons/email.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import LOGO_APPLE from '@/assets/logo/sns/logo_apple.svg';
import LOGO_GOOGLE from '@/assets/logo/sns/logo_google.svg';
import LOGO_KAKAO from '@/assets/logo/sns/logo_kakao.svg';
import LOGO_NAVER from '@/assets/logo/sns/logo_naver.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import Header from '@/components/Header';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { push } = useRouter();

  const loginButtonDefaultStyle = (bgColor: string) => {
    return `login-btn bg-${bgColor}`;
  };

  return (
    <>
      <Header title="로그인" />

      <div className="= mt-xxxl flex w-full flex-col items-center px-xl pb-xxxl">
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
          <button className={`login-btn w-full gap-xs bg-[#fae64d] py-sm`}>
            <LOGO_KAKAO width={20} height={20} />
            <span className="body1">카카오 로그인</span>
          </button>

          <div className="bg-tran mt-xl flex justify-center gap-lg">
            <button className={clsx(`login-btn h-48 w-48 bg-[#5AC467]`)}>
              <LOGO_NAVER width={24} height={24} />
            </button>

            <button className={clsx(`${loginButtonDefaultStyle('white')} h-48 w-48`)}>
              <LOGO_GOOGLE width={24} height={24} />
            </button>

            <button className={clsx(`${loginButtonDefaultStyle('black')} h-48 w-48`)}>
              <LOGO_APPLE width={24} height={24} />
            </button>

            <button
              className={clsx(`${loginButtonDefaultStyle('white')} h-48 w-48`)}
              onClick={() => push('/login/email')}
            >
              <IC_EMAIL width={24} height={24} />
            </button>
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
