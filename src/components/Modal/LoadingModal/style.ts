import { cva } from 'class-variance-authority';

export const loadingModalContainerVariants = cva(
  'z-100 sm:max-w-[calc(100vs - 40px)] flex w-full max-w-[300px] flex-col justify-between',
  {
    variants: {
      visibility: {
        default: 'invisible',
        visible: 'visible',
      },
      animation: {
        default: 'animate-fadeOut',
        visible: 'animate-fadeIn',
      },
    },
  }
);
