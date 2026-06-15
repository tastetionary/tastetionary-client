import * as S from './page.styled';
import CHeader from '@/components/c-header';

export default function PrivacyNotice() {
  const privacyNotice = {
    title:
      '<맛셔너리팀/맛셔너리>은(는) 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립․공개합니다.',
    first: `1. 개인정보의 처리목적 \n<맛셔너리팀/맛셔너리>은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.`,
    firstSection: `a. 회원 가입 및 관리 : 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의여부 확인, 각종 고지․통지, 고충처리 등을 목적으로 개인정보를 처리합니다. 
b. 서비스 제공 : 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 이미지 정보 업로드 등을 목적으로 개인정보를 처리합니다. 
c. 고충처리 : 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다. 
d. 개인정보 처리업무 : <개인정보 처리업무에 따른 처리목적>으로 개인정보를 처리합니다.`,
    second: '<맛셔너리팀/맛셔너리>은(는) 원활한 서비스 제공을 위하여 아래와 같은 개인정보를 수집합니다.',
    secondSection: `a. 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의하고 수집하는 정보: 성명, 이메일
b. 서비스 이용 과정에서 자동으로 생성/수집되는 정보 : 서비스 이용 기록, 사용자 위치 정보`,
    third: `<맛셔너리팀/맛셔너리>은(는) 개인정보 수집에 대한 동의를 받습니다. 회원의 개인정보 수집과 관련하여 회사의 개인정보보호 방침 또는 이용 약관의 내용에 대해 '동의' 여부를 체크할 수 있는 절차를 마련하여, 회원가입 시 '동의'를 체크하면 개인정보 수집에 동의한 것으로 간주합니다.`,
    fourth: `a. 개인정보 처리 및 보유 원칙
<맛셔너리팀/맛셔너리>은(는) 법령에 따른 개인정보 보유·이용 기간 또는 정보 주체로부터 개인정보를 수집 시 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.`,
  };
  return (
    <>
      <CHeader title="개인정보 처리방침" />
      <S.Wrapper>
        <S.Title>개인정보 처리방침</S.Title>
        <S.SubTitle>개정일 : 2023.09.06</S.SubTitle>
        <S.Description>
          {privacyNotice.title}
          <br />
          <br />
          <S.First>{privacyNotice.first}</S.First>
          <br />
          <S.Section>{privacyNotice.firstSection}</S.Section>
          <br />
          {'2. 개인정보 수집항목'}
          <br />
          <S.First>{privacyNotice.second}</S.First>
          <S.Section>{privacyNotice.secondSection}</S.Section>
          <br />

          {'3. 개인정보 수집에 대한 동의'}
          <br />
          <S.First>{privacyNotice.third}</S.First>
          <br />
          <br />

          {'4. 개인정보 처리 및 보유 기간'}
          <br />
          <S.First>{privacyNotice.fourth}</S.First>
        </S.Description>
      </S.Wrapper>
    </>
  );
}
