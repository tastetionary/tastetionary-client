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
        className={`not-disabled:hover:bg-opacity-8 flex items-center justify-center active:bg-opacity-20 disabled:bg-opacity-40 ${customStyle && `${customStyle}`}`}
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
