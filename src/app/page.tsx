'use client';

import CHeader from '@/components/c-header';
import CNavButton from '@/components/c-nav-button';
import CPickerButton from '@/components/c-pickerButton';
import * as S from './page.styled';

import HomeIcon from '@/assets/logo/home.svg';
import MypageIcon from '@/assets/logo/my-page.svg';
import ReviewIcon from '@/assets/logo/review.svg';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const pathName = usePathname();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const isLoggedIn = true;
  const hasActivityArea = false;

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

  const needRegisterActivityAreaModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '활동 지역 등록 안내',
      message: '활동 지역을 등록한 회원만\n리뷰 등록이 가능해요.',
      handleConfirm: () => router.push('/'),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      cancelText: '취소',
      confirmText: '등록하기',
      needClose: true,
    });
  };

  const onReviewClick = () => {
    if (!isLoggedIn) {
      loginInfoModal();
    } else if (!hasActivityArea) {
      needRegisterActivityAreaModal();
    }
  };

  return (
    <>
      <CHeader title="맛셔너리" isLogo />
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
          clickEvent={() => loginInfoModal()}
        />
      </S.MainContent>

      <S.NavContainer>
        <CNavButton title="리뷰" icon={<ReviewIcon />} isActive={false} clickEvent={() => onReviewClick()} />
        <CNavButton title="홈" icon={<HomeIcon />} isActive={pathName === '/'} />
        <CNavButton title="마이페이지" icon={<MypageIcon />} isActive={false} />
      </S.NavContainer>
    </>
  );
}
