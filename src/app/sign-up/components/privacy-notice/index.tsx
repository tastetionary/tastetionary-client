import CHeader from '@/components/c-header';
import * as S from './page.styled';

export default function PrivacyNotice() {
  return (
    <>
      <CHeader title="개인정보 처리방침" isBackBtn />
      <S.Wrapper>
        <S.Title>개인정보 처리방침</S.Title>
        <S.SubTitle>개정일 : 2023.09.06</S.SubTitle>
      </S.Wrapper>
    </>
  );
}
