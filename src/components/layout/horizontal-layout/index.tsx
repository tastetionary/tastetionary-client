import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
  subject: 'menu' | 'restaurant';
}
export default function HorizontalLayout({ children, subject }: Props) {
  return <S.Wrapper subject={subject}>{children}</S.Wrapper>;
}

const S = {
  Wrapper: styled.div<{ subject: 'menu' | 'restaurant' }>`
    background: ${({ theme, subject }) =>
      subject === 'menu'
        ? `radial-gradient(circle at bottom , ${theme.colors.secondary.o10} 0.5px, transparent 0) top/1px 20px;`
        : `radial-gradient(circle at bottom , ${theme.colors.primary.y10} 0.5px, transparent 0) top/1px 20px;`};
  `,
};
