'use client';

import * as S from '@/app/page.styled';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CPickerButton from '@/components/c-pickerButton';
import GNBLayout from '@/components/layout/gnb-layout';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function Home() {
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
    if (!isLoggedIn) return loginInfoModal();

    router.push('/select-restaurant');
  };

  return (
    <>
      <CHeader title="맛셔너리" noBackBtn />

      <GNBLayout>
        <S.MainContent>
          <CPickerButton
            title={'메뉴 고르기'}
            desc={'오늘은 어떤 음식을 먹을까?'}
            subject={'menu'}
            clickEvent={() => router.push('select-menu')}
          />

          <CPickerButton
            title={'식당 고르기'}
            desc={'오늘은 어떤 식당에 가볼까?'}
            subject={'restaurant'}
            clickEvent={onRestaurantClick}
          />
        </S.MainContent>
      </GNBLayout>
    </>
  );
}
