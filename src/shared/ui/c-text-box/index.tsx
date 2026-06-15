import { HTMLAttributes, ReactNode } from 'react';
import * as S from './page.styled';
import { cn } from '@/shared/utils/styles.utils';

interface TextBoxProps extends HTMLAttributes<HTMLDivElement> {
  bgColor: 'orange' | 'yellow' | 'gray' | 'none';
  customStyle?: string;
  children: ReactNode;
}

export default function DefaultTextBox({ bgColor, customStyle, children, ...rest }: TextBoxProps) {
  if (bgColor === 'none')
    return (
      <div {...rest} className={`border-none-btn flex items-center justify-center ${customStyle && `${customStyle}`}`}>
        {children}
      </div>
    );

  return (
    <div {...rest} className={cn(S.textBoxBgVariants({ bgColor }), customStyle && `${customStyle}`)}>
      {children}
    </div>
  );
}
