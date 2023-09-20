'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  companyName: string;
  email: string;
}

export default function VerifyCompany({ setStep }: { setStep: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    console.log(data);
  };

  return (
    <>
      <CHeader title="회사 인증" isBackBtn />

      <S.Wrapper>
        <S.Title>회사 인증을 진행해주세요.</S.Title>
        <S.SubTitle>반드시 소속 회사의 이메일을 입력해주세요.</S.SubTitle>

        <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
          <S.InputContainer>
            <TextInput
              label="회사명"
              placeholder="회사명"
              type="text"
              {...register('companyName', { required: true })}
            />

            <TextInput
              label="회사 이메일"
              placeholder="이메일 주소 입력"
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </S.InputContainer>

          <S.SubButton type="button">회사 인증 다음에 하기</S.SubButton>

          <MainButton btnText="다음" disabled={!isDirty || !isValid} onClick={() => setStep()} />
        </S.Form>
      </S.Wrapper>
    </>
  );
}
