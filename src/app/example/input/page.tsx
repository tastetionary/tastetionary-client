'use client';

import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import TextInput from '@/components/Input/TextInput';
import { useState } from 'react';
import styled from 'styled-components';

export default function ExampleInput() {
  const [text, setText] = useState('');

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  console.log(check1, check2, check3);

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

      <CheckBox2 checkBoxId="check1" checked={check1} onChangeEvent={checked => setCheck1(checked)} />
      <CheckBox2
        checkBoxId="check2"
        checked={check2}
        onChangeEvent={checked => setCheck2(checked)}
        label="체크 테스트"
      />
      <CheckBox2
        checkBoxId="check3"
        checked={check3}
        onChangeEvent={checked => setCheck3(checked)}
        label="체크 테스트"
      />

      <MainButton btnText="테스트" />

      <MainButton btnText="disabled btn" disabled={true} />
    </Main>
  );
}

const Main = styled.div`
  background-color: #edeff1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
`;
