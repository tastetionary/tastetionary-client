import { cva } from 'class-variance-authority';

export const keyboardButtonVariants = cva('px-24 py-12', {
  variants: {
    isSelected: {
      default: '',
      selected: 'border-2 border-solid border-secondary-o70 bg-primary-y70 text-white',
    },
  },
});
