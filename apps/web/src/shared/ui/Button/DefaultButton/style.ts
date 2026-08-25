import { cva } from 'class-variance-authority';

/*
 * disabled 일 때 배경을 40% 로 흐리게 만든다.
 *
 * v3 에서는 base 에 `disabled:bg-opacity-40` 하나만 두면 됐다.
 * bg-* 유틸이 rgb(... / var(--tw-bg-opacity)) 형태였어서 변수 하나로 색을 가릴 수 있었기 때문이다.
 * v4 는 bg-* 가 색을 직접 넣으므로 그 방식이 통하지 않는다. 색마다 /40 을 붙여준다.
 */
export const buttonBgVariants = cva('default-btn', {
  variants: {
    bgColor: {
      orange: 'bg-secondary-o40 disabled:bg-secondary-o40/40',
      yellow: 'bg-primary-y70 disabled:bg-primary-y70/40',
      gray: 'bg-white disabled:bg-white/40',
      none: 'bg-transparent',
    },
  },
});
