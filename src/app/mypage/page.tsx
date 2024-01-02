'use client';

import CHeader from '@/components/c-header';
import CMypageMenu from '@/components/c-mypage-menu';
import CMyPageUserInfo from '@/components/c-mypage-user-info';
import GNBLayout from '@/components/layout/gnb-layout';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

export default function MyPage() {
  const { push } = useRouter();
  const { isLoggedIn } = useUser();

  return (
    <>
      <CHeader title="맛셔너리" isLogo />

      <GNBLayout>
        {isLoggedIn ? (
          <CMyPageUserInfo />
        ) : (
          <S.NotLogInContainer>
            <S.NotLoginText onClick={() => push('/login')}>로그인하기</S.NotLoginText>

            <S.NotLoginText onClick={() => push('/login')}>{'>'}</S.NotLoginText>
          </S.NotLogInContainer>
        )}

        <S.MenuList>
          {isLoggedIn && (
            <CMypageMenu
              title="계정"
              items={[
                { name: '개인정보 관리', hasArrow: true, pathname: '/mypage/user/manage-info' },
                { name: '내 리뷰 관리' },
                { name: '북마크 목록' },
                { name: '추천 제외 식당 보기' },
              ]}
            />
          )}

          <CMypageMenu
            title="게시판"
            items={[{ name: '공지사항' }, { name: '자주 묻는 질문' }, { name: '의견 보내기' }]}
          />

          <CMypageMenu
            title="약관 및 정책"
            items={[
              { name: '서비스 이용약관', pathname: '/sign-up?step=terms-of-service' },
              { name: '개인정보 처리 방침', pathname: '/sign-up?step=privacy-notice' },
            ]}
          />
        </S.MenuList>
      </GNBLayout>
    </>
  );
}
