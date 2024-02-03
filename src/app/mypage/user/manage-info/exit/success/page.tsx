'use client';

import * as S from '@/app/sign-up/components/complete/page.styled';
import COMPLETE from '@/assets/logo/complete.svg';
import MainButton from '@/components/Button/MainButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';

export default function MyPageUserExitSuccess() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="회원 탈퇴 완료" />

      <S.Wrapper>
        <COMPLETE />

        <S.Title>회원 탈퇴가 완료되었습니다.</S.Title>
        <S.SubTitle>
          지금까지 맛셔너리를 이용해주셔서 감사합니다. <br />더 나은 서비스를 위해 노력하겠습니다.
        </S.SubTitle>

        <S.NextButtonWrapper>
          <MainButton type="button" btnText="홈 화면으로" onClick={() => push('/')} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
