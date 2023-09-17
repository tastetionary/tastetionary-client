import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import * as S from './page.styled';

export default function Terms() {
  return (
    <>
      <CHeader title="약관 동의" isBackBtn />
      <S.Wrapper>
        <S.TitleContainer>
          <S.Title>
            서비스 이용을 위해 <br />
            아래 약관에 동의해주세요.
          </S.Title>
          <S.SubTitle>
            서비스 이용을 위해 동의가 필요합니다. <br /> 정책 및 약관을 확인 후 회원가입을 진행해주세요.
          </S.SubTitle>
        </S.TitleContainer>
        <S.CheckboxWrapper>
          <S.Divider></S.Divider>
          <S.CheckboxContainer>
            <CheckBox2
              checkBoxId="terms-of-agree"
              label="이용 약관 전체 동의"
              onChangeEvent={() => console.log('click')}
              checked={false}
            />
          </S.CheckboxContainer>
        </S.CheckboxWrapper>
      </S.Wrapper>
    </>
  );
}
