import INPUT_ERROR from '@/assets/Input/InputError.svg';
import INPUT_INACTIVE from '@/assets/Input/InputInactive.svg';
import INPUT_TYPED from '@/assets/Input/InputTyped.svg';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from 'react';
import * as S from './page.styled';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMsg?: string;
}

function TextArea({ label, errorMsg, ...rest }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
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
        <S.Textarea $hasError={hasError} ref={ref} {...rest} />

        {hasError ? <INPUT_ERROR /> : focused ? <INPUT_TYPED /> : <INPUT_INACTIVE />}
      </S.InputContainer>

      {errorMsg && <S.ErrorMsg>{errorMsg}</S.ErrorMsg>}
    </S.Container>
  );
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(TextArea);
