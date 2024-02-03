import INPUT_ERROR from '@/assets/Input/InputError.svg';
import INPUT_INACTIVE from '@/assets/Input/InputInactive.svg';
import INPUT_TYPED from '@/assets/Input/InputTyped.svg';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from 'react';
import * as S from './page.styled';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg?: string;
}

function TextInput(
  { label, errorMsg, disabled = false, ...rest }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(errorMsg);

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <S.InputContainer
        $disabled={disabled}
        $focused={focused}
        $hasError={hasError}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <S.Input $hasError={hasError} disabled={disabled} ref={ref} {...rest} />

        {hasError ? <INPUT_ERROR /> : focused ? <INPUT_TYPED /> : <INPUT_INACTIVE />}
      </S.InputContainer>

      {errorMsg && <S.ErrorMsg>{errorMsg}</S.ErrorMsg>}
    </S.Container>
  );
}

export default forwardRef<HTMLInputElement, TextInputProps>(TextInput);
