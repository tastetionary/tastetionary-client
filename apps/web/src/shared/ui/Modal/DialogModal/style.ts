import { cva } from 'class-variance-authority';

export const overlayVariants = cva('overlay', {
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
});

export const dialogModalContainerVariants = cva(
  'z-100 sm:max-w-[calc(100vs - 40px)] flex w-full max-w-[320px] flex-col justify-between rounded-2 border-2 border-solid border-neutral-bg80 bg-white p-24 gap-lg',
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
