import INPUT_ERROR from '@/assets/Input/InputError.svg';
import INPUT_INACTIVE from '@/assets/Input/InputInactive.svg';
import INPUT_TYPED from '@/assets/Input/InputTyped.svg';
import { cn } from '@/utils/styles.utils';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from 'react';
import * as S from './style';

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

  const inputStyleBgColorState = hasError ? 'hasError' : 'default';
  const inputStyleColorState = disabled ? 'disabled' : 'default';

  const containerStyleBorderState = hasError ? 'hasError' : focused ? 'focused' : 'default';
  const containerStyleBgColorState = disabled ? 'disabled' : hasError ? 'hasError' : 'default';

  return (
    <div>
      {label && <label className="mb-6 inline-block text-12 font-normal text-neutral-bg80">{label}</label>}

      <div
        className={cn(
          S.textInputContainerVariants({ bgColor: containerStyleBgColorState, border: containerStyleBorderState })
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <input
          className={cn(S.textInputVariants({ color: inputStyleColorState, bgColor: inputStyleBgColorState }))}
          disabled={disabled}
          ref={ref}
          {...rest}
        />

        {hasError ? <INPUT_ERROR /> : focused ? <INPUT_TYPED /> : <INPUT_INACTIVE />}
      </div>

      {errorMsg && <div className="ml-14 mt-8 !font-pretendard text-12 font-normal text-simentic-r90">{errorMsg}</div>}
    </div>
  );
}

export default forwardRef<HTMLInputElement, TextInputProps>(TextInput);
