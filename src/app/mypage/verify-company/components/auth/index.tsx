'use client';

import * as S from '@/app/sign-up/components/verify-number/page.styled';
import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useFormContext } from 'react-hook-form';
import useCompanyAuthentication from '../../hooks/query/useCompanyAuthentication';
import { VerifyCompanyFormValue } from '../verify-company-component';

interface Props {
  onNext: (id: number) => void;
}

export default function CompanyAuth({ onNext }: Props) {
  const {
    register,
    getValues,
    formState: { isValid },
  } = useFormContext<VerifyCompanyFormValue>();

  const companyEmail = getValues('identification');

  const { mutate: retryVerifyCompany } = useCompanyAuthentication({
    onNext,
    email: companyEmail,
    type: 'retry',
  });

  return (
    <>
      <CHeader title="인증코드 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>
          입력하신 회사 이메일 주소로
          <br />
          인증코드를 발송했어요.
        </S.Title>
        <S.SubTitle>
          1시간 안에 이메일로 발송된
          <br />
          인증코드를 입력해주세요.
        </S.SubTitle>

        <S.InputContainer>
          <TextInput label="이메일 주소" disabled={true} value={companyEmail} />

          <TextInput
            label="인증코드 6자리"
            placeholder="인증코드 6자리 숫자 입력"
            type="text"
            maxLength={6}
            {...register('code', {
              required: true,
              maxLength: 6,
              pattern: /^[0-9]{6}$/,
            })}
          />
        </S.InputContainer>
      </S.Wrapper>

      <S.NextButtonWrapper>
        <S.SubButtonContainer>
          <span>인증메일을 받지 못하셨나요?</span>

          <S.SubButton type="button" onClick={() => retryVerifyCompany()}>
            메일 재전송
          </S.SubButton>
        </S.SubButtonContainer>

        <MainButton btnText="다음" disabled={!isValid} type="submit" />
      </S.NextButtonWrapper>
    </>
  );
}
