import ARROW from '@/assets/common/Icons/arrow.svg';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  noBackBtn?: boolean;
}

export default function Header({ title, noBackBtn }: Props) {
  const { back } = useRouter();

  return (
    <div className="fixed top-0 z-1 flex h-56 w-360 items-center justify-between gap-md border-b-1 border-solid border-b-neutral-bg20 bg-white mobile:w-full">
      {!noBackBtn ? (
        <button className="flex h-55 w-56 items-center justify-center" onClick={back}>
          <ARROW width={24} height={24} />
        </button>
      ) : (
        <div className="w-56"></div>
      )}

      <div className="body2 !font-pretendard font-normal">{title}</div>

      <div className="w-56"></div>
    </div>
  );
}
