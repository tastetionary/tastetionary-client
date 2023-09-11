'use client';

import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './pagd.styled';

interface FormValue {
  email: string;
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

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    console.log(data);
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
              type="email"
              label="아이디"
              placeholder="아이디 입력"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />

            <TextInput
              type="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              errorMsg={errors?.password?.message}
              {...register('password', {
                required: true,
                minLength: { value: 8, message: '8글자 이상 입력해 주세요.' },
              })}
            />

            <CheckBox2
              checkBoxId="login-state"
              label="로그인 상태 유지"
              checked={loginState}
              onChangeEvent={checked => setLoginState(checked)}
            />

            <MainButton btnText="로그인" disabled={!isDirty || !isValid} />
          </S.Form>
        </S.FormContainer>

        <S.NavContainer>
          <S.NavItem onClick={() => router.push('/')}>아이디 찾기</S.NavItem>
          <S.NavDivider />
          <S.NavItem onClick={() => router.push('/')}>비밀번호 찾기</S.NavItem>
          <S.NavDivider />
          <S.NavItem onClick={() => router.push('/')}>회원가입</S.NavItem>
        </S.NavContainer>
      </S.Container>
    </>
  );
}
