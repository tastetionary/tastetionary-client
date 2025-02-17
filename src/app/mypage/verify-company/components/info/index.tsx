'use client';

import * as S from '@/app/sign-up/components/verify-company/page.styled';
import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { emailRegex } from '@/constants';
import { useFormContext } from 'react-hook-form';
import useCompanyAuthentication from '../../hooks/query/useCompanyAuthentication';
import { VerifyCompanyFormValue } from '../verify-company-component';

interface Props {
  onNext: (id: number) => void;
}

export default function CompanyInfo({ onNext }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useFormContext<VerifyCompanyFormValue>();

  const email = getValues('identification');

  const buttonDisabledState = email?.length > 0 && getValues('companyName')?.length > 0 && isValid;

  const { mutate: reqVerifyCompany } = useCompanyAuthentication({
    onNext,
    email,
  });

  return (
    <>
      <CHeader title="회사 인증" />

      <S.Wrapper>
        <S.Title>회사 인증을 진행해주세요.</S.Title>
        <S.SubTitle>반드시 소속 회사의 이메일을 입력해주세요.</S.SubTitle>

        <S.InputContainer>
          <TextInput
            label="회사명"
            placeholder="회사명"
            type="text"
            {...register('companyName', {
              required: false,
            })}
          />

          <TextInput
            label="회사 이메일"
            placeholder="이메일 주소 입력"
            type="text"
            errorMsg={errors.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('identification', { required: false, pattern: emailRegex })}
          />
        </S.InputContainer>
      </S.Wrapper>

      <S.NextButtonWrapper style={{ padding: '20px 20px 40px' }}>
        <MainButton btnText="다음" disabled={!buttonDisabledState} onClick={() => reqVerifyCompany()} type="button" />
      </S.NextButtonWrapper>
    </>
  );
}
