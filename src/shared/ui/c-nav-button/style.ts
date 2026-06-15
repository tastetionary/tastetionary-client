import { cva } from 'class-variance-authority';

export const navButtonVariants = cva(
  'flex h-60 w-120 flex-col items-center justify-center gap-4 border-solid border-[#ced9db]',
  {
    variants: {
      background: {
        default: 'bg-neutral-bg05',
        isActive: 'bg-white',
      },
      border: {
        default: 'border-2',
        isActive: 'border-t-0',
      },
    },
  }
);
