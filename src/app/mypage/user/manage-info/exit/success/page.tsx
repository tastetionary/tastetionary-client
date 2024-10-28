'use client';

import * as S from '@/app/sign-up/components/complete/page.styled';
import COMPLETE from '@/assets/logo/complete.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';

export default function MyPageUserExitSuccess() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="회원 탈퇴 완료" noBackBtn />

      <S.Wrapper>
        <COMPLETE />

        <div className="title2 mt-5 font-bold leading-[150%]">회원 탈퇴가 완료되었습니다.</div>
        <p className="body2 my-4 mb-[100px] leading-[170%] text-neutral-bg60">
          지금까지 맛셔너리를 이용해주셔서 감사합니다. <br />더 나은 서비스를 위해 노력하겠습니다.
        </p>
      </S.Wrapper>

      <footer className="fixed bottom-[30px] w-[360px] px-25 pb-10 pt-5 mobile:w-full">
        <DefaultButton
          bgColor="orange"
          customStyle="flex w-full py-[12px] px-[16px] mt-6"
          onClick={() => push('/')}
          type="button"
        >
          <span className="!font-pretendard text-white">메인 화면으로 이동</span>
        </DefaultButton>
      </footer>
    </>
  );
}
