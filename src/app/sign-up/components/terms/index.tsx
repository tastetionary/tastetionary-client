import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function Terms({ onNext }: Props) {
  const router = useRouter();

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
          <S.Divider isActive></S.Divider>
          <S.CheckboxContainer isActive>
            <CheckBox2
              checkBoxId="terms-of-agree"
              label="이용 약관 전체 동의"
              onChangeEvent={() => console.log('click')}
              checked={true}
            />
          </S.CheckboxContainer>
        </S.CheckboxWrapper>
        <S.PrivacyNoticeWrapper>
          <S.PrivacyNoticeCheckboxContainer>
            <CheckBox2 checkBoxId="privacy-notice" onChangeEvent={() => console.log('click')} checked={true} />
          </S.PrivacyNoticeCheckboxContainer>
          <S.PrivacyNoticeContainer>
            <S.PrivacyNoticeTitle>[필수] 개인정보 처리방침</S.PrivacyNoticeTitle>
            <S.PrivacyNoticeLook onClick={() => router.push('/sign-up?step=privacy-notice')}>보기</S.PrivacyNoticeLook>
          </S.PrivacyNoticeContainer>
        </S.PrivacyNoticeWrapper>

        <S.MarketingWrapper>
          <S.MarketingCheckboxContainer>
            <CheckBox2 checkBoxId="marketing" onChangeEvent={() => console.log('click')} checked={true} />
          </S.MarketingCheckboxContainer>
          <S.MarketingContainer>
            <S.MarketingTitle>[필수] 마케팅 활용 정보 수신 제공</S.MarketingTitle>
            <S.MarketingLook onClick={() => router.push('/sign-up?step=opt-in-marketing')}>보기</S.MarketingLook>
          </S.MarketingContainer>
        </S.MarketingWrapper>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={false} onClick={onNext} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
