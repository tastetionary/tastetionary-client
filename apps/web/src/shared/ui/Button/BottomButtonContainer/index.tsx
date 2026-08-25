import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/styles.utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function BottomButtonContainer({ children, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 mx-auto flex w-[calc(100%-16px)] max-w-[484px] gap-[14px] bg-white px-xl py-xl',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
