'use client';

import COMPLETE from '@/assets/logo/complete.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

export default function SignUpComplete() {
  const router = useRouter();

  return (
    <>
      <CHeader title="회원가입 완료" />
      <S.Wrapper>
        <COMPLETE />
        <div className="mt-5 !font-pretendard text-xl font-bold leading-relaxed">회원가입이 완료되었습니다.</div>
        <p className="my-[15px] mb-[100px] !font-pretendard text-sm font-normal leading-[170%] text-neutral-bg60">
          지역 변경을 원하신다면{' '}
          <span className="!font-pretendard text-sm font-bold text-neutral-bg60">개인정보 관리 {'>'} 지역 변경</span>{' '}
          <br />
          또는 <span className="!font-pretendard text-sm font-bold text-neutral-bg60">메인화면</span>에서 위치를
          변경해주세요.
        </p>
      </S.Wrapper>

      <footer className="fixed bottom-[30px] w-[360px] px-25 pb-10 pt-5 mobile:w-full">
        <DefaultButton bgColor="orange" customStyle="flex w-full py-[12px] px-[16px]" onClick={() => router.push('/')}>
          <span className="!font-pretendard text-white">메인 화면으로 이동</span>
        </DefaultButton>
      </footer>
    </>
  );
}
