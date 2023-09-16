import CHeader from '@/components/c-header';
import * as S from './page.styled';

export default function Terms() {
  return (
    <>
      <CHeader title="약관 동의" isBackBtn />
      <S.Wrapper>
        <S.Title>
          서비스 이용을 위해 <br />
          아래 약관에 동의해주세요.
        </S.Title>
        <S.SubTitle>
          서비스 이용을 위해 동의가 필요합니다. <br /> 정책 및 약관을 확인 후 회원가입을 진행해주세요.
        </S.SubTitle>
      </S.Wrapper>
    </>
  );
}
