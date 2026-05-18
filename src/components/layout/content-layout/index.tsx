import { cn } from '@/utils/styles.utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ContentLayout({ children, className }: Props) {
  return <div className={cn('px-xl pb-[120px]', className)}>{children}</div>;
}
