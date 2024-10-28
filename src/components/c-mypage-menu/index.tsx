import * as S from './page.styled';

interface Props {
  items: {
    name: string;
    hasArrow?: boolean;
    clickEvent?: () => void;
    mail?: string;
  }[];
}

export default function CMypageMenu({ items }: Props) {
  return (
    <S.Menu>
      {items?.map((d, i) => {
        if (d.mail) {
          return (
            <a
              className="flex cursor-pointer items-center justify-between px-20 py-[17px] text-sm font-normal leading-[14px]"
              key={i}
              onClick={() => {
                if (d.clickEvent) d.clickEvent();
              }}
              href={'mailto:tastetionary@gmail.com'}
            >
              <span className="!font-pretendard">{d.name}</span>
              {d?.hasArrow && <span>{'>'}</span>}
            </a>
          );
        }

        return (
          <div
            className="flex cursor-pointer items-center justify-between px-20 py-[17px] text-sm font-normal leading-[14px]"
            key={i}
            onClick={() => {
              if (d.clickEvent) d.clickEvent();
            }}
          >
            <span className="!font-pretendard">{d.name}</span>
            {d?.hasArrow && <span>{'>'}</span>}
          </div>
        );
      })}
    </S.Menu>
  );
}
