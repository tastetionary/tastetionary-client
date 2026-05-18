import * as S from './page.styled';
interface Props {
  children: React.ReactNode;
}
export default function GridLayout({ children }: Props) {
  return <S.Wrapper>{children}</S.Wrapper>;
}
