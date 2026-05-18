import GNB from '@/components/GNB';
import * as S from './page.styled';

interface Props {
  children: React.ReactNode;
}

export default function GNBLayout({ children }: Props) {
  return (
    <S.Wrapper>
      {children}

      <GNB />
    </S.Wrapper>
  );
}
