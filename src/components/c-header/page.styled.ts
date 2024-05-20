import { cva } from 'class-variance-authority';

export const backBtnVariants = cva('absolute left-0 w-56 h-56 flex justify-center items-center', {
  variants: {
    cursor: {
      default: 'cursor-auto',
      isBackBtn: 'cursor-pointer',
    },
  },
});

export const titleVariants = cva('flex justify-center items-center h-24', {
  variants: {
    cursor: {
      default: 'cursor-auto',
      isLogo: 'cursor-pointer',
    },
  },
});
