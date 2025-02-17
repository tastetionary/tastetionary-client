import ARROW from '@/assets/common/Icons/arrow.svg';
import USER_ICON from '@/assets/common/user.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import { useRouter } from 'next/navigation';

interface Props {
  isLogo?: boolean;
  title: string;
  noBackBtn?: boolean;
  isHome?: boolean;
}

// 호진FIXME: noBackBtn -> negative로 조건을 분기하는것보다 positive로 조건을 만드는게 좋아보임
// EX) noBackBtn -> isBackBtn
export default function CHeader({ isLogo = false, title, noBackBtn = false, isHome }: Props) {
  const { back } = useRouter();

  const renderLeftItems = () => {
    if (isHome) {
      return (
        <button className="flex h-55 w-56 items-center justify-center">
          <USER_ICON width={24} height={24} />
        </button>
      );
    }

    if (!noBackBtn) {
      return (
        <button className="flex h-55 w-56 items-center justify-center" onClick={back}>
          <ARROW width={24} height={24} />
        </button>
      );
    }

    return <div className="w-56"></div>;
  };

  return (
    <div className="fixed top-0 z-3 flex h-56 w-500 items-center justify-between gap-md border-b-1 border-solid border-b-neutral-bg20 bg-white mobile:w-full">
      {renderLeftItems()}
      <div className="body2 flex items-center justify-center !font-pretendard font-normal">
        {isLogo && <MAIN_LOGO width={40} height={30} />}
        {title}
      </div>

      <div className="w-56"></div>
    </div>
  );
}
