import { cva } from 'class-variance-authority';

export const textBoxBgVariants = cva('default-text-box', {
  variants: {
    bgColor: {
      orange: 'bg-secondary-o40',
      yellow: 'bg-primary-y70',
      gray: 'bg-white',
      none: 'bg-transparent',
    },
  },
});
