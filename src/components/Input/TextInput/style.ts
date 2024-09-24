import { cva } from 'class-variance-authority';

export const textInputContainerVariants = cva('default-input w-full px-12 py-13', {
  variants: {
    border: {
      default: '',
      hasError: 'error-input',
    },
    bgColor: {
      default: 'bg-white',
      disabled: 'bg-neutral-bg05',
    },
  },
});

export const textInputVariants = cva(
  'bg-white body2 !font-pretendard text-neutral-bg80 placeholder:text-neutral-bg20',
  {
    variants: {
      color: {
        default: 'text-neutral-bg80',
        disabled: 'text-neutral-bg30',
      },
      bgColor: {
        default: 'bg-white',
        disabled: 'bg-neutral-bg05',
        hasError: '',
      },
    },
  }
);
