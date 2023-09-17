import { ReactNode } from 'react';
import * as S from './page.styled';

interface CStickyMemoProps {
  children: ReactNode;
}

export default function CStickyMemo({ children }: CStickyMemoProps) {
  return (
    <S.Container>
      <S.Shadow />
      <S.StickyMemoHeader />
      <S.StickyMemo>{children}</S.StickyMemo>
    </S.Container>
  );
}
