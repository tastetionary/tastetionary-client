'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import { useState } from 'react';
import styled from 'styled-components';

export default function ExampleInput() {
  const [text, setText] = useState('');

  return (
    <Main>
      <TextInput placeholder="아이디를 입력해 주세요" value={text} onChange={e => setText(e.target.value)} />

      <TextInput
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <TextInput
        errorMsg="ERROR TEXT ERROR TEXT ERROR"
        placeholder="아이디를 입력해 주세요"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <MainButton btnText="테스트" />

      <MainButton btnText="disabled btn" disabled={true} />
    </Main>
  );
}

const Main = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
`;
