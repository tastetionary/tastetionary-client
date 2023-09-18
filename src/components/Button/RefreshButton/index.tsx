import IC_REFRESH from '@/assets/common/refresh_default.svg';
import { ButtonHTMLAttributes } from 'react';
import * as S from './pagd.styled';

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

export default function RefreshButton({ btnText, ...rest }: RefreshButtonProps) {
  return (
    <S.RefreshContainer {...rest}>
      <IC_REFRESH />

      <S.RefreshText>{btnText}</S.RefreshText>
    </S.RefreshContainer>
  );
}
