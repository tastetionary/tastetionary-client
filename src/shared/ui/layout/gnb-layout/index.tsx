import * as S from './page.styled';
import GNB from '@/shared/ui/GNB';

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
