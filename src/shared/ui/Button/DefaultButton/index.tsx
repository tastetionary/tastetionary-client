import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './page.styled';
import { cn } from '@/utils/styles.utils';

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
        className={cn('border-none-btn flex items-center justify-center disabled:bg-opacity-40', customStyle)}
      >
        {children}
      </button>
    );

  return (
    <button {...rest} className={cn(S.buttonBgVariants({ bgColor }), customStyle && `${customStyle}`)}>
      {children}
    </button>
  );
}
