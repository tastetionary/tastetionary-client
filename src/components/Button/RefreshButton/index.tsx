import IC_DINNER from '@/assets/common/dinner.svg';
import IC_EXCEPT from '@/assets/common/except.svg';
import IC_REFRESH from '@/assets/common/refresh_default.svg';
import { ButtonHTMLAttributes } from 'react';
import * as S from './pagd.styled';

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  iconType?: 'refresh' | 'except' | 'dinner';
}

export default function RefreshButton({ btnText, iconType = 'refresh', ...rest }: RefreshButtonProps) {
  return (
    <S.RefreshContainer {...rest}>
      {iconType === 'except' ? <IC_EXCEPT /> : iconType === 'dinner' ? <IC_DINNER /> : <IC_REFRESH />}

      <S.RefreshText>{btnText}</S.RefreshText>
    </S.RefreshContainer>
  );
}
