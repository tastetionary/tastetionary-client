import { ButtonHTMLAttributes } from 'react';

export interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

/*
 * bg-transparent 를 같이 두는 이유:
 * 원래 CSS 가 `background: url(...) center no-repeat` 단축 속성이라 background-color 까지 초기화했다.
 * globals.css 의 `button { background-color: inherit }` 를 그대로 두면 부모 배경이 비쳐 보이므로 맞춰준다.
 */
export default function MainButton({ btnText, ...rest }: MainButtonProps) {
  return (
    <button
      {...rest}
      className="flex h-60 w-full items-center justify-center bg-transparent bg-[url(/image/Button/Main_Button_default.svg)] bg-contain bg-center bg-no-repeat text-18 font-normal text-white [text-shadow:0_1px_#FF5601] enabled:active:bg-[url(/image/Button/Main_Button_pressed.svg)] disabled:bg-[url(/image/Button/Main_Button_disabled.svg)] disabled:text-primary-y30 disabled:[text-shadow:none]"
    >
      {btnText}
    </button>
  );
}
