'use client';

import TextInput from '@/components/Input/TextInput';
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';

export default function ExampleInput() {
  const [text, setText] = useState('');

  return (
    <Main>
      <TextInput
        placeholder="아이디를 입력해 주세요"
        value={text}
        onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
      />

      <TextInput
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        value={text}
        onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
      />

      <TextInput
        errorMsg="ERROR TEXT ERROR TEXT ERROR"
        placeholder="아이디를 입력해 주세요"
        value={text}
        onChange={(e: { target: { value: SetStateAction<string> } }) => setText(e.target.value)}
      />
    </Main>
  );
}

const Main = styled.div`
  background-color: #edeff1;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
`;
