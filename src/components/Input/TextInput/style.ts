import { cva } from 'class-variance-authority';

export const textInputContainerVariants = cva(
  'relative w-full px-12 py-13 [&>svg]:absolute [&>svg]:bottom-0 [&>svg]:right-0 border-2 border-solid',
  {
    variants: {
      border: {
        default: 'border-neutral-bg10',
        hasError: 'border-simentic-r60',
        focused: 'border-neutral-bg20',
      },
      bgColor: {
        default: 'bg-white',
        hasError: 'bg-secondary-o05',
        disabled: 'bg-neutral-bg05',
      },
    },
  }
);

export const textInputVariants = cva(
  'w-[calc(100%-24px)] bg-white text-16 font-normal text-neutral-bg80 placeholder:text-[14px] placeholder:text-neutral-bg20',
  {
    variants: {
      color: {
        default: 'text-neutral-bg80',
        disabled: 'text-neutral-bg30',
      },
      bgColor: {
        default: 'bg-white',
        hasError: 'bg-secondary-o05',
      },
    },
  }
);
