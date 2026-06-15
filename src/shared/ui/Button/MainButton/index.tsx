import { ButtonHTMLAttributes } from 'react';
import * as S from './page.styled';

export interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

export default function MainButton({ btnText, ...rest }: MainButtonProps) {
  return <S.Button {...rest}>{btnText}</S.Button>;
}
