import INPUT_ERROR from '@/assets/Input/InputError.svg';
import INPUT_INACTIVE from '@/assets/Input/InputInactive.svg';
import INPUT_TYPED from '@/assets/Input/InputTyped.svg';
import { InputHTMLAttributes, useState } from 'react';
import * as S from './page.styled';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg?: string;
}

export default function TextInput({ label, errorMsg, ...rest }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(errorMsg);

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <S.InputContainer
        $focused={focused}
        $hasError={hasError}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <S.Input $hasError={hasError} {...rest} />

        {hasError ? <INPUT_ERROR /> : focused ? <INPUT_TYPED /> : <INPUT_INACTIVE />}
      </S.InputContainer>

      {errorMsg && <S.ErrorMsg>{errorMsg}</S.ErrorMsg>}
    </S.Container>
  );
}
