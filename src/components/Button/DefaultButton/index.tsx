import { cn } from '@/utils/styles.utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './page.styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: 'orange' | 'yellow' | 'gray' | 'none';
  customStyle?: string;
  children: ReactNode;
}

export default function DefaultButton({ bgColor, customStyle, children, ...rest }: Props) {
  if (bgColor === 'none')
    return (
      <button
        {...rest}
        className={`border-none-btn flex items-center justify-center disabled:bg-opacity-40 ${customStyle && `${customStyle}`}`}
      >
        {children}
      </button>
    );

  return (
    <button
      {...rest}
      className={cn(
        S.buttonBgVariants({ bgColor, active: bgColor, hover: bgColor, disabled: bgColor }),
        customStyle && `${customStyle}`
      )}
    >
      {children}
    </button>
  );
}
