'use client';

import CHeader from '@/components/c-header';
import CMypageMenu from '@/components/c-mypage-menu';
import CMyPageUserInfo from '@/components/c-mypage-user-info';
import GNBLayout from '@/components/layout/gnb-layout';
import useUser from '@/hooks/useUser';
import * as S from './page.styled';

export default function MyPage() {
  const { isLoggedIn } = useUser();

  return (
    <>
      <CHeader title="마이페이지" isLogo />

      <GNBLayout>
        {isLoggedIn && <CMyPageUserInfo />}

        <S.MenuList>
          {isLoggedIn && (
            <CMypageMenu
              title="계정"
              items={[
                { name: '개인정보 관리', hasArrow: true },
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

          <CMypageMenu title="약관 및 정책" items={[{ name: '서비스 이용약관' }, { name: '개인정보 처리 방침' }]} />
        </S.MenuList>
      </GNBLayout>
    </>
  );
}
