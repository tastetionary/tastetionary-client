import { cva } from 'class-variance-authority';

export const buttonBgVariants = cva('default-btn disabled:bg-opacity-40', {
  variants: {
    bgColor: {
      orange: 'bg-secondary-o40',
      yellow: 'bg-primary-y70',
      gray: 'bg-white',
      none: 'bg-transparent',
    },
  },
});
