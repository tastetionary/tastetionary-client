import { cva } from 'class-variance-authority';

export const keyboardButtonVariants = cva('px-16 py-13 text-14 font-normal', {
  variants: {
    isSelected: {
      default: 'border-2 border-solid border-neutral-bg20 bg-white text-black',
      selected: 'border-2 border-solid border-secondary-o70 bg-primary-y70 text-white',
    },
  },
});
