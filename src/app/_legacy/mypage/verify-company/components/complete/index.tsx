'use client';

import { useRouter } from 'next/navigation';
import * as S from '@/app/_legacy/sign-up/components/complete/page.styled';
import COMPLETE from '@/assets/logo/complete.svg';
import MainButton from '@/shared/ui/Button/MainButton';
import CHeader from '@/shared/ui/c-header';

export default function VerifyCompanyComplete() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="회사 인증 완료" />
      <S.Wrapper>
        <COMPLETE />
        <S.Title>회사 인증이 완료되었습니다.</S.Title>
        <S.SubTitle>
          새로운 회사로 인증이 완료되었습니다.
          <br />
          맛셔너리 서비스를 이용해 보세요.
        </S.SubTitle>
      </S.Wrapper>

      <S.NextButtonWrapper>
        <MainButton type="button" btnText="홈 화면으로" onClick={() => push('/explore')} />
      </S.NextButtonWrapper>
    </>
  );
}
