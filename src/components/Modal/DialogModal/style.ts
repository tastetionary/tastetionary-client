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
  'z-100 sm:max-w-[calc(100vs - 40px)] flex w-full max-w-[320px] flex-col justify-between rounded-2 border-2 border-solid border-neutral-bg80 bg-white',
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

export const dialogModalButtonVariants = cva('py-8 px-16 h-48 text-[14px] font-normal', {
  variants: {
    color: {
      default: 'text-secondary-o70',
      isSecondary: 'text-neutral-bg40',
    },
  },
});
