'use client';

import useLogoutMutate from '@/app/login/hooks/useLogoutMutate';
import ARROW_RIGHT from '@/assets/common/Icons/arrow_right.svg';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CMypageMenu from '@/components/c-mypage-menu';
import GNBLayout from '@/components/layout/gnb-layout';
import useUser from '@/hooks/useUser';
import { cn } from '@/utils/styles.utils';
import { useRouter } from 'next/navigation';
import * as S from '../page.styled';

export default function MyPagePage() {
  const { push } = useRouter();
  const { token, isLoggedIn, data, isPending } = useUser();
  const { openModal, closeModal } = useModal();
  const { mutate: logoutMutate } = useLogoutMutate();

  const showSkeleton = typeof window === 'undefined' || (isLoggedIn && isPending);

  const logoutModal = () => {
    if (!openModal || !closeModal) {
      console.error('useModal 훅에서 상태를 가져오는 데 실패했습니다.');
      return;
    }

    openModal(MODAL_TYPES.dialog, {
      title: '로그아웃 하시겠습니까?',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: async () => {
        if (token) {
          try {
            await logoutMutate({ token });
          } catch (error) {
            console.error('Logout failed:', error);
          }
        }
      },
    });
  };

  const handleLoginClick = () => {
    if (isLoggedIn && data) {
      return;
    }

    push('/login');
  };

  return (
    <>
      <CHeader title="마이페이지" isLogo />

      <GNBLayout>
        <S.NotLogInContainer>
          <div className="flex w-full flex-col gap-3">
            {showSkeleton ? (
              <div className="h-32 w-2/3 rounded-7 bg-neutral-bg05" />
            ) : (
              <p
                className={cn('title2 flex items-center font-bold', isLoggedIn && data ? '' : 'cursor-pointer')}
                onClick={handleLoginClick}
              >
                {isLoggedIn && data ? data.nickname : '로그인'}
                <ARROW_RIGHT width={24} height={24} />
              </p>
            )}

            {showSkeleton ? (
              <div className="h-22 w-2/3 rounded-7 bg-neutral-bg05" />
            ) : (
              <p className="body2">
                {isLoggedIn && data ? data.account?.accountEmail : '맛셔너리 서비스 이용을 위해 로그인해주세요.'}
              </p>
            )}
          </div>
        </S.NotLogInContainer>

        {showSkeleton ? (
          <div className="flex flex-col gap-[20px] p-[20px]">
            <div className="h-180 w-full rounded-7 bg-neutral-bg05" />
            <div className="h-145 w-full rounded-7 bg-neutral-bg05" />
            <div className="h-100 w-full rounded-7 bg-neutral-bg05" />
            <div className="h-50 w-full rounded-7 bg-neutral-bg05" />
          </div>
        ) : (
          <div>
            {isLoggedIn && (
              <CMypageMenu
                items={[
                  { name: '개인정보 관리', clickEvent: () => push('/mypage/user/manage-info') },
                  { name: '작성한 리뷰 관리', clickEvent: () => push('/ready') },
                  { name: '북마크 식당 관리', clickEvent: () => push('/ready') },
                  { name: '추천 제외 식당 보기', clickEvent: () => push('/ready') },
                ]}
              />
            )}

            <CMypageMenu
              items={[
                {
                  name: '공지사항',
                  clickEvent: () =>
                    window.open(
                      'https://tastetionary.notion.site/03ebf00931f44926b889e085cabbd02c?v=5c1337997b384b15a63e6d89a3708ed9&pvs=74'
                    ),
                },
                { name: '자주 묻는 질문', clickEvent: () => push('/ready') },
                { name: '의견 보내기', mail: 'tastetionary@gmail.com' },
              ]}
            />

            <CMypageMenu
              items={[
                { name: '서비스 이용약관', clickEvent: () => push('/sign-up?step=terms-of-service') },
                { name: '개인정보 처리 방침', clickEvent: () => push('/sign-up?step=privacy-notice') },
              ]}
            />
            {isLoggedIn && <CMypageMenu items={[{ name: '로그아웃', clickEvent: () => logoutModal() }]} />}
          </div>
        )}
      </GNBLayout>
    </>
  );
}
