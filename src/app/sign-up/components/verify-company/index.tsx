import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { companyInfoState } from '@/lib/atom';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import useCompanyAuthCodeMutate from '../../hooks/query/useCompanyAuthCodeMutate';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
  setCompanyEmailAuthId: (value: number) => void;
}

export default function VerifyCompany({ onNext, setCompanyEmailAuthId }: Props) {
  const [companyInfo, setCompanyInfo] = useRecoilState(companyInfoState);
  const { mutate: companyAuthCodeMutate } = useCompanyAuthCodeMutate({ onNext, setCompanyEmailAuthId });

  const enableButtonState = companyInfo.companyEmail.length > 0 && companyInfo.companyName.length > 0;

  const onCompanyEmailAuthRequest = () => {
    companyAuthCodeMutate({ identification: companyInfo.companyEmail, type: 'email' });
  };

  const handleChangeCompanyInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };

  return (
    <>
      <CHeader title="회사 인증" isBackBtn />

      <S.Wrapper>
        <S.Title>회사 인증을 진행해주세요.</S.Title>
        <S.SubTitle>반드시 소속 회사의 이메일을 입력해주세요.</S.SubTitle>

        <S.InputContainer>
          <TextInput
            label="회사명"
            placeholder="회사명"
            type="text"
            name="companyName"
            onChange={handleChangeCompanyInfo}
          />

          <TextInput
            label="회사 이메일"
            placeholder="이메일 주소 입력"
            type="text"
            name="companyEmail"
            onChange={handleChangeCompanyInfo}
          />
        </S.InputContainer>

        <S.SubButton type="submit">회사 인증 다음에 하기</S.SubButton>

        <MainButton btnText="다음" disabled={enableButtonState === false} onClick={onCompanyEmailAuthRequest} />
      </S.Wrapper>
    </>
  );
}
