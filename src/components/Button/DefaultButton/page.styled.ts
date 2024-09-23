import { cva } from 'class-variance-authority';

export const buttonBgVariants = cva('default-btn disabled:bg-opacity-40', {
  variants: {
    bgColor: {
      orange: 'bg-secondary-o40',
      yellow: 'bg-primary-y70',
      gray: 'bg-white',
      none: 'bg-transparent',
    },
    hover: {
      orange: 'bg-secondary-o50',
      yellow: 'bg-primary-y80',
      gray: 'bg-neutral-bg10',
      none: 'bg-transparent',
    },
    active: {
      orange: 'bg-secondary-o40',
      yellow: 'bg-primary-y70',
      gray: 'bg-white',
      none: 'bg-transparent',
    },
    disabled: {
      orange: 'bg-secondary-o40',
      yellow: 'bg-primary-y70',
      gray: 'bg-white',
      none: 'bg-transparent',
    },
  },
});
