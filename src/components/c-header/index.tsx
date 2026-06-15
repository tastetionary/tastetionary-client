'use client';

import { useRouter } from 'next/navigation';
import ARROW from '@/assets/common/Icons/arrow.svg';
import USER_ICON from '@/assets/common/user.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';

interface Props {
  isLogo?: boolean;
  title: string;
  noBackBtn?: boolean;
  isHome?: boolean;
  onBackPress?: () => void;
}

// 호진FIXME: noBackBtn -> negative로 조건을 분기하는것보다 positive로 조건을 만드는게 좋아보임
// EX) noBackBtn -> isBackBtn
export default function CHeader({ isLogo = false, title, noBackBtn = false, isHome, onBackPress }: Props) {
  const { back, push } = useRouter();

  const handleBackPress = () => {
    onBackPress?.();
    back();
  };

  const renderLeftItems = () => {
    if (isHome) {
      // 로그인 기능 - 임시 비활성화 (프로필 아이콘)
      return <div className="w-56" />;
      /*
      return (
        <button className="flex h-55 w-56 items-center justify-center" type="button">
          <USER_ICON width={24} height={24} onClick={() => push('/mypage')} />
        </button>
      );
      */
    }
    if (!noBackBtn) {
      return (
        <button className="flex h-55 w-56 items-center justify-center" onClick={handleBackPress} type="button">
          <ARROW width={24} height={24} />
        </button>
      );
    }

    return <div className="w-56"></div>;
  };

  return (
    <div className="fixed inset-x-0 top-0 z-3 mx-auto flex h-56 w-[calc(100%-16px)] max-w-[484px] items-center justify-between gap-md border-b-1 border-solid border-b-neutral-bg20 bg-white">
      {renderLeftItems()}

      <div
        onClick={() => push('/explore')}
        className="body2 flex cursor-pointer items-center justify-center !font-pretendard font-normal"
      >
        {isLogo && <MAIN_LOGO width={40} height={30} />}
        {title}
      </div>

      <div className="w-56"></div>
    </div>
  );
}
