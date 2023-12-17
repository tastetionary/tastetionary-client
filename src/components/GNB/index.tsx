import * as S from '@/app/page.styled';
import HomeIcon from '@/assets/logo/home.svg';
import MypageIcon from '@/assets/logo/my-page.svg';
import ReviewIcon from '@/assets/logo/review.svg';
import useUser from '@/hooks/useUser';
import { usePathname, useRouter } from 'next/navigation';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';
import CNavButton from '../c-nav-button';

export default function GNB() {
  const pathName = usePathname();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const { isLoggedIn, hasActivityArea } = useUser();

  const onReviewClick = () => {
    if (!isLoggedIn) return loginInfoModal();

    if (!hasActivityArea) return needRegisterActivityAreaModal();

    router.push('/register-review/restaurant');
  };

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
      handleConfirm: () => router.push('/register-review/region-setting'),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      cancelText: '취소',
      confirmText: '등록하기',
      needClose: true,
    });
  };

  return (
    <S.NavContainer>
      <CNavButton title="리뷰" icon={<ReviewIcon />} isActive={false} clickEvent={onReviewClick} />
      <CNavButton title="홈" icon={<HomeIcon />} isActive={pathName === '/'} clickEvent={() => router.push('/')} />
      <CNavButton
        title="마이페이지"
        icon={<MypageIcon />}
        isActive={pathName === '/mypage'}
        clickEvent={() => router.push('/mypage')}
      />
    </S.NavContainer>
  );
}
