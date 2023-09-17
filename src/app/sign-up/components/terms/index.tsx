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
        <S.PrivacyNoticeWrapper>
          <S.PrivacyNoticeCheckboxContainer>
            <CheckBox2 checkBoxId="privacy-notice" onChangeEvent={() => console.log('click')} checked={false} />
          </S.PrivacyNoticeCheckboxContainer>
          <S.PrivacyNoticeContainer>
            <S.PrivacyNoticeTitle>[필수] 개인정보 처리방침</S.PrivacyNoticeTitle>
            <S.PrivacyNoticeLook>보기</S.PrivacyNoticeLook>
          </S.PrivacyNoticeContainer>
        </S.PrivacyNoticeWrapper>

        <S.MarketingWrapper>
          <S.MarketingCheckboxContainer>
            <CheckBox2 checkBoxId="privacy-notice" onChangeEvent={() => console.log('click')} checked={false} />
          </S.MarketingCheckboxContainer>
          <S.MarketingContainer>
            <S.MarketingTitle>[필수] 마케팅 활용 정보 수신 제공</S.MarketingTitle>
            <S.MarketingLook>보기</S.MarketingLook>
          </S.MarketingContainer>
        </S.MarketingWrapper>
      </S.Wrapper>
    </>
  );
}
