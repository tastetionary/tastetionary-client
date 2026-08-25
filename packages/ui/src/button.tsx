import type { ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

/**
 * 패키지 배선이 실제로 동작하는지 확인하려고 넣어둔 최소 예시 컴포넌트다.
 * 실제 공용 컴포넌트를 옮겨올 때 이 파일을 지우거나 대체하면 된다.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-8 px-16 py-8 transition-colors',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'ghost' && 'bg-transparent',
        className
      )}
      {...props}
    />
  );
}
