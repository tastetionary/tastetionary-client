import { cn } from '@/utils/styles.utils';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import * as S from './style';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg?: string;
}

function TextInput(
  { label, errorMsg, disabled = false, ...rest }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const hasError = Boolean(errorMsg);

  const inputStyleBgColorState = disabled ? 'disabled' : hasError ? 'hasError' : 'default';
  const inputStyleColorState = disabled ? 'disabled' : 'default';

  const containerStyleBorderState = hasError ? 'hasError' : 'default';
  const containerStyleBgColorState = disabled ? 'disabled' : 'default';

  return (
    <div className="flex flex-col gap-xs">
      {label && <label className="body2 !font-pretendard">{label}</label>}

      <div
        className={cn(
          S.textInputContainerVariants({ bgColor: containerStyleBgColorState, border: containerStyleBorderState })
        )}
      >
        <input
          style={{ width: 'inherit' }}
          className={cn(S.textInputVariants({ color: inputStyleColorState, bgColor: inputStyleBgColorState }))}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
      </div>

      {errorMsg && <div className="body2 text-red-r50 !font-pretendard">{errorMsg}</div>}
    </div>
  );
}

export default forwardRef<HTMLInputElement, TextInputProps>(TextInput);
