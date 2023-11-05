import * as S from './page.styled';

interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
  clickEvent?: () => void;
}

export default function CNavButton({ title, icon, isActive, clickEvent }: Props) {
  return (
    <>
      <S.Button
        $isActive={isActive}
        onClick={() => {
          if (clickEvent) clickEvent();
        }}
      >
        <S.Icon>{icon}</S.Icon>
        <S.Title>{title}</S.Title>
      </S.Button>
    </>
  );
}
