import INPUT_ERROR from '@/assets/Input/InputError.svg';
import INPUT_INACTIVE from '@/assets/Input/InputInactive.svg';
import INPUT_TYPED from '@/assets/Input/InputTyped.svg';
import { cn } from '@/utils/styles.utils';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from 'react';
import * as S from './style';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMsg?: string;
}

function TextArea({ label, errorMsg, ...rest }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(errorMsg);

  const containerStyleBorderState = hasError ? 'hasError' : focused ? 'focused' : 'default';
  const containerStyleBgColorState = hasError ? 'hasError' : 'default';

  return (
    <div>
      {label && <label className="mb-6 inline-block text-12 font-normal text-neutral-bg80">{label}</label>}

      <div
        className={cn(
          S.textAreaContainerVariants({ bgColor: containerStyleBgColorState, border: containerStyleBorderState })
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <textarea className={cn(S.textAreaVariants({ bgColor: containerStyleBgColorState }))} ref={ref} {...rest} />

        {hasError ? <INPUT_ERROR /> : focused ? <INPUT_TYPED /> : <INPUT_INACTIVE />}
      </div>

      {errorMsg && <div className="ml-14 mt-8 !font-pretendard text-12 font-normal text-simentic-r90">{errorMsg}</div>}
    </div>
  );
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(TextArea);
