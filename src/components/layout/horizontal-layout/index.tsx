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
    background-size:
      20px,
      20px,
      20px 20px,
      20px 20px;
    background-image: linear-gradient(90deg, transparent 1px, transparent 1px),
      linear-gradient(90deg, transparent 1px, transparent 1px),
      ${({ theme, subject }) =>
        subject === 'menu'
          ? `linear-gradient(${theme.colors.secondary.o10} 0.5px, transparent 0.5px)`
          : `linear-gradient(${theme.colors.primary.y10} 0.5px, transparent 0.5px)`},
      linear-gradient(#00000004 1px, transparent 1px);
  `,
};
