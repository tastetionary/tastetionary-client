import { cva } from 'class-variance-authority';

export const overlayVariants = cva('overlay items-end p-0', {
  variants: {
    visibility: {
      default: 'invisible',
      visible: 'visible',
    },
    animation: {
      default: 'animate-fadeOut',
      visible: 'animate-fadeIn',
    },
  },
});

export const bottomModalContainerVariants = cva(
  'mobile:max-w-full z-100 flex w-full max-w-500 flex-col bg-white transition-[max-height] ease-in-out delay-150',
  {
    variants: {
      animation: {
        default: 'animate-slideDown',
        visible: 'animate-slideUp',
      },
      expand: {
        fold: 'max-h-[267px]',
        expand: 'max-h-[calc(100vh-148px)]',
      },
      // default: 지도/리스트 전환용 시트. actionSheet: 항목 몇 개만 고르는 짧은 메뉴 (QA #8)
      variant: {
        default: 'rounded-2 border-t-2 border-solid border-neutral-bg80',
        actionSheet: 'rounded-t-16 pb-[env(safe-area-inset-bottom)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const bottomModalContentVariants = cva('', {
  variants: {
    expand: {
      fold: 'overflow-y-hidden',
      expand: 'overflow-y-auto',
    },
  },
});
