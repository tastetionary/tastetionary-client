import { cva } from 'class-variance-authority';

export const overlayVariants = cva('overlay items-end p-0', {
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

export const bottomModalContainerVariants = cva(
  'mobile:max-w-full z-100 flex max-h-[calc(100vh-148px)] w-full max-w-[360px] flex-col rounded-2 border-t-2 border-solid border-neutral-bg80 bg-white',
  {
    variants: {
      animation: {
        default: 'animate-slideDown',
        visible: 'animate-slideUp',
      },
    },
  }
);
