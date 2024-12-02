import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  'peer-[.checkbox]:body2 pl-[28px] peer-[.checkbox]:flex peer-[.checkbox]:w-full peer-[.checkbox]:cursor-pointer peer-[.checkbox]:items-center peer-[.checkbox]:bg-ic_checkbox_inactive peer-[.checkbox]:bg-no-repeat',
  {
    variants: {
      bg: {
        default: 'peer-[.checkbox]:peer-checked:bg-ic_checkbox_active',
        orange: 'peer-[.checkbox]:peer-checked:bg-ic_checkbox_bg_orange_active',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        bg: 'default',
        checked: true,
        className: 'text-white',
      },
    ],
  }
);
