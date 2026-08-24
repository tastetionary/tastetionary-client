import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  // body2 는 globals.css 의 @layer base 에 정의한 클래스라 Tailwind 유틸이 아니다.
  // v3 는 이런 클래스도 variant 대상으로 등록해줬지만 v4 는 등록하지 않아
  // `peer-[.checkbox]:body2` 가 CSS 를 만들지 못한다(폰트가 픽셀체로 떨어짐).
  // label 은 항상 input.checkbox.peer 바로 뒤에 오므로 조건 없이 그냥 붙인다.
  'body2 pl-[28px] peer-[.checkbox]:flex peer-[.checkbox]:w-full peer-[.checkbox]:cursor-pointer peer-[.checkbox]:items-center peer-[.checkbox]:bg-ic_checkbox_inactive peer-[.checkbox]:bg-no-repeat',
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
      },
    ],
  }
);
