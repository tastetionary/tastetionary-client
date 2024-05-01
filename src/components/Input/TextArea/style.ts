import { cva } from 'class-variance-authority';

export const textAreaContainerVariants = cva(
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
      },
    },
  }
);

export const textAreaVariants = cva(
  'w-full min-h-[174px] resize-none text-16 leading-[150%] font-normal text-neutral-bg80 placeholder:text-[14px] placeholder:text-neutral-bg20',
  {
    variants: {
      bgColor: {
        default: 'bg-white',
        hasError: 'bg-secondary-o05',
      },
    },
  }
);
