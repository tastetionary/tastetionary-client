import { cva } from 'class-variance-authority';

/*
 * 원본 styled-components 의 modalSettings() 가 z-index: 15 를 마지막에 덮어써서
 * Overlay 의 zIndex prop(기본 30)과 Container 의 100 은 실제로 적용된 적이 없다. 그 결과를 그대로 옮긴다.
 */
const modalSettings = {
  visibility: {
    default: 'invisible',
    visible: 'visible',
  },
  animation: {
    default: 'animate-fadeOut',
    visible: 'animate-fadeIn',
  },
} as const;

export const overlayVariants = cva(
  'b-safe fixed left-0 right-0 top-0 z-15 flex h-[-webkit-fill-available] w-full items-center justify-center bg-black/60 transition-visibility duration-250 ease-in-out',
  { variants: modalSettings }
);

// max-[320px] 는 v4 에서 `width < 320px`(320 미포함)로 나가서 원본의 `max-width: 320px`(320 포함)와 달라진다.
// 320px 짜리 기기에서 실제로 갈리므로 미디어쿼리를 직접 적는다.
export const containerVariants = cva(
  'z-15 flex h-auto min-h-[169px] w-full max-w-320 flex-col justify-between rounded-20 bg-white p-16 transition-visibility duration-250 ease-in-out [@media(max-width:320px)]:max-w-[calc(100vw-40px)]',
  { variants: modalSettings }
);

export const buttonVariants = cva('h-48 w-full rounded-12 px-16 py-13', {
  variants: {
    color: {
      default: 'bg-[#4F4FF6] text-white',
      isSecondary: 'bg-[#F1F3F5] text-neutral-bg80',
    },
  },
});
