import * as S from './page.styled';

interface Props {
  children: React.ReactNode;
  subject: 'menu' | 'restaurant';
}
export default function HorizontalLayout({ children, subject }: Props) {
  return <S.Wrapper $subject={subject}>{children}</S.Wrapper>;
}
