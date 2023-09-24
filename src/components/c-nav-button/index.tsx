import * as S from './page.styled';

interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
}

export default function CNavButton({ title, icon, isActive }: Props) {
  return (
    <>
      <S.Button isActive={isActive}>
        <S.Icon>{icon}</S.Icon>
        <S.Title>{title}</S.Title>
      </S.Button>
    </>
  );
}
