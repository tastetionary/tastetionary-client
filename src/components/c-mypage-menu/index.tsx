import * as S from './page.styled';

interface Props {
  title: string;
  items: {
    name: string;
    hasArrow?: boolean;
    clickEvent?: () => void;
    mail?: string;
  }[];
}

export default function CMypageMenu({ title, items }: Props) {
  return (
    <S.Menu>
      <S.MenuTitle>{title}</S.MenuTitle>

      {items?.map((d, i) => (
        <S.MenuItem
          key={i}
          onClick={() => {
            if(d.clickEvent) d.clickEvent();
          }}
          as={d.mail ? "a" : undefined}
          href={d.mail ? "mailto:tastetionary@gmail.com" : undefined}
        >
          <span>{d.name}</span>

          {d?.hasArrow && <span>{'>'}</span>}
        </S.MenuItem>
      ))}
    </S.Menu>
  );
}
