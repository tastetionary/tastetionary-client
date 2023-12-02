import { useRouter } from 'next/navigation';
import * as S from './page.styled';

interface Props {
  title: string;
  items: {
    name: string;
    hasArrow?: boolean;
    pathname?: string;
  }[];
}

export default function CMypageMenu({ title, items }: Props) {
  const router = useRouter();

  return (
    <S.Menu>
      <S.MenuTitle>{title}</S.MenuTitle>

      {items?.map((d, i) => (
        <S.MenuItem
          key={i}
          onClick={() => {
            if (!d?.pathname) return;

            router.push(d.pathname);
          }}
        >
          <span>{d.name}</span>

          {d?.hasArrow && <span>{'>'}</span>}
        </S.MenuItem>
      ))}
    </S.Menu>
  );
}
