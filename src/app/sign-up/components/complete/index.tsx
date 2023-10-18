'use client';

import COMPLETE from '@/assets/logo/complete.svg';
import MainButton from '@/components/Button/MainButton';
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
        <S.Title>
          맛셔너리 회원가입이
          <br />
          완료되었습니다.
        </S.Title>
        <S.SubTitle>
          지금 바로 맛셔너리를 통해
          <br />
          오늘의 점심 메뉴와 식당을 골라보세요.
        </S.SubTitle>
        <MainButton btnText="홈 화면으로" onClick={() => router.push('/')} />
      </S.Wrapper>
    </>
  );
}
