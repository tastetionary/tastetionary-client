import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/styles.utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function BottomButtonContainer({ children, className, ...rest }: Props) {
  return (
    <div
      className={cn('fixed bottom-0 flex w-500 gap-[14px] bg-white px-xl py-xl mobile:left-0 mobile:w-full', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
