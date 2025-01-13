'use client';

import { UserRes } from '@/apis/user/getUser';
import useLogoutMutate from '@/app/login/hooks/useLogoutMutate';
import ARROW_RIGHT from '@/assets/common/Icons/arrow_right.svg';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CMypageMenu from '@/components/c-mypage-menu';
import GNBLayout from '@/components/layout/gnb-layout';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as S from '../page.styled';

export default function MyPagePage({ isLoggedIn, token }: { isLoggedIn: boolean; token?: string }) {
  const { push } = useRouter();
  const { openModal, closeModal } = useModal();
  const { mutate: logoutMutate } = useLogoutMutate();

  const { data, isPending } = useQuery<UserRes>({
    queryKey: ['user'],
    enabled: false,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 데이터를 구식으로 간주하지 않음
  });

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

  return (
    <>
      <CHeader title="마이페이지" isLogo />

      <GNBLayout>
        <S.NotLogInContainer>
          <div className="flex w-full flex-col gap-3">
            {isLoggedIn && isPending ? (
              <div className="h-32 w-2/3 rounded-7 bg-neutral-bg10" />
            ) : (
              <p className="title2 flex cursor-pointer items-center font-bold" onClick={() => push('/login')}>
                {isLoggedIn && data ? data.nickname : '로그인'}
                <ARROW_RIGHT width={24} height={24} />
              </p>
            )}

            {isLoggedIn && isPending ? (
              <div className="h-22 w-2/3 rounded-7 bg-neutral-bg10" />
            ) : (
              <p className="body2">
                {isLoggedIn && data ? data.account?.accountEmail : '맛셔너리 서비스 이용을 위해 로그인해주세요.'}
              </p>
            )}
          </div>
        </S.NotLogInContainer>

        <S.MenuList>
          {isLoggedIn && (
            <CMypageMenu
              items={[
                { name: '개인정보 관리', clickEvent: () => push('/mypage/user/manage-info') },
                { name: '작성한 리뷰 관리' },
                { name: '북마크 식당 관리' },
                { name: '추천 제외 식당 보기' },
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
              { name: '자주 묻는 질문' },
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
        </S.MenuList>
      </GNBLayout>
    </>
  );
}
