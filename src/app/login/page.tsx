'use client';

import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { emailRegex } from '@/constants';
import { SHA256 } from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLoginMutate from './hooks/useLoginMutate';
import * as S from './pagd.styled';

interface FormValue {
  identification: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const [loginState, setLoginState] = useState(false);
  const { mutate: loginMutate } = useLoginMutate();

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    data.password = SHA256(data.password).toString();
    loginMutate({ ...data, category: 'email' });
  };

  return (
    <>
      <CHeader title="로그인" isBackBtn />

      <S.Container>
        <S.FormContainer>
          <S.FormShadow />

          <S.FormHeader></S.FormHeader>
          <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextInput
              type="text"
              label="아이디"
              placeholder="아이디 입력"
              errorMsg={errors?.identification?.message}
              {...register('identification', {
                required: true,
                pattern: {
                  value: emailRegex,
                  message: '이메일 형식이 맞지 않습니다.',
                },
              })}
            />

            <TextInput
              type="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              errorMsg={errors?.password?.message}
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
                  message: '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.',
                },
              })}
            />

            <CheckBox2
              checkBoxId="login-state"
              label="로그인 상태 유지"
              checked={loginState}
              onChangeEvent={checked => setLoginState(checked)}
            />

            <MainButton btnText="로그인" />
          </S.Form>
        </S.FormContainer>

        <S.NavContainer>
          <S.NavItem onClick={() => router.push('/ready')}>아이디 찾기</S.NavItem>
          <S.NavDivider />
          <S.NavItem onClick={() => router.push('/ready')}>비밀번호 찾기</S.NavItem>
          <S.NavDivider />
          <S.NavItem onClick={() => router.push('/sign-up')}>회원가입</S.NavItem>
        </S.NavContainer>
      </S.Container>
    </>
  );
}
