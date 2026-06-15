'use client';

import { useRouter } from 'next/navigation';
import IC_MENU_SELECT from '@/assets/common/Icons/menu_select.svg';
import IC_RESTAURANT_SELECT from '@/assets/common/Icons/restaurant_select.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import useUser from '@/hooks/useUser';

export default function MenuSelection() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const { isLoggedIn } = useUser();

  const loginInfoModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '로그인 안내',
      message: '내 주변의 식당을 고르기 위해\n로그인이 필요해요.',
      handleConfirm: () => router.push('/login'),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      cancelText: '취소',
      confirmText: '로그인 하기',
      needClose: true,
    });
  };

  const onRestaurantClick = () => {
    // 비로그인 사용 기능: 식당 고르기는 로그인 없이 접근 가능
    router.push('/select-restaurant');
  };

  const handleMoveToMenuSelect = () => {
    router.push('/select-menu');
  };

  const handleMoveToRestaurantSelect = () => {
    onRestaurantClick();
  };

  return (
    <div className="px-32 py-24">
      <p className="title4 font-bold">오늘 뭐 먹지? 🤔</p>
      <p className="body2 pt-12">점심 메뉴가 고민될 때에는 메뉴 고르기, 식당을 찾고 싶을 때에는 식당 고르기</p>

      <div className="flex gap-[14px] pt-24">
        <DefaultButton
          bgColor="gray"
          customStyle="flex items-center gap-[12px] py-4 pr-12 pl-8 grow h-[98px] flex-col"
          onClick={handleMoveToMenuSelect}
        >
          <IC_MENU_SELECT />
          <span>메뉴 고르기</span>
        </DefaultButton>

        <DefaultButton
          bgColor="gray"
          customStyle="flex items-center gap-[12px] py-4 pr-12 pl-8 grow flex-col"
          onClick={handleMoveToRestaurantSelect}
        >
          <IC_RESTAURANT_SELECT />
          <span>식당 고르기</span>
        </DefaultButton>
      </div>
    </div>
  );
}
