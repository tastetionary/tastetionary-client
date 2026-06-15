import { cva } from 'class-variance-authority';

export const menuTitleVariants = cva('text-14 text-normal text-center', {
  variants: {
    isSelected: {
      default: 'text-neutral-bg80',
      selected: 'text-secondary-o50',
    },
  },
});
