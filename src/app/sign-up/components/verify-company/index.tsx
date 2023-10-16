'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { Controller, useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  userProperty: {
    companyName: string;
    companyEmail: string;
  };
}

interface Props {
  onNext: () => void;
}

export default function VerifyCompany({ onNext }: Props) {
  const {
    register,
    formState: { errors, isDirty, isValid },
  } = useFormContext<FormValue>();

  return (
    <>
      <CHeader title="회사 인증" isBackBtn />

      <S.Wrapper>
        <S.Title>회사 인증을 진행해주세요.</S.Title>
        <S.SubTitle>반드시 소속 회사의 이메일을 입력해주세요.</S.SubTitle>

        <S.InputContainer>
          <Controller
            name="userProperty.companyName"
            render={() => {
              return (
                <TextInput
                  label="회사명"
                  placeholder="회사명"
                  type="text"
                  errorMsg={errors.userProperty?.companyName ? errors.userProperty.companyName.message : undefined}
                  {...register('userProperty.companyName', { required: '회사명을 입력해주세요.' })}
                />
              );
            }}
          />

          <Controller
            name="userProperty.companyEmail"
            render={() => {
              return (
                <TextInput
                  label="회사 이메일"
                  placeholder="이메일 주소 입력"
                  type="email"
                  errorMsg={errors.userProperty?.companyEmail ? errors.userProperty.companyEmail.message : undefined}
                  {...register('userProperty.companyEmail', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
                      message: '이메일 형식이 맞지 않습니다.',
                    },
                  })}
                />
              );
            }}
          />
        </S.InputContainer>

        <S.SubButton type="submit">회사 인증 다음에 하기</S.SubButton>

        <MainButton btnText="다음" disabled={!isDirty || !isValid} onClick={onNext} />
      </S.Wrapper>
    </>
  );
}
