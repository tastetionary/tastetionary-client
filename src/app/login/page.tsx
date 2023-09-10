'use client';

import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './pagd.styled';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(false);

  return (
    <>
      <CHeader title="로그인" isBackBtn />

      <S.Container>
        <S.FormContainer>
          <S.FormShadow />

          <S.FormHeader></S.FormHeader>
          <S.Form>
            <TextInput
              type="email"
              label="아이디"
              placeholder="아이디 입력"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <div style={{ width: '100%', height: 20 }} />

            <TextInput
              type="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <div style={{ width: '100%', height: 20 }} />

            <CheckBox2
              checkBoxId="login-state"
              label="로그인 상태 유지"
              checked={loginState}
              onChangeEvent={checked => setLoginState(checked)}
            />

            <div style={{ width: '100%', height: 40 }} />

            <MainButton type="button" btnText="로그인" disabled={email === '' || password.length < 8} />
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
