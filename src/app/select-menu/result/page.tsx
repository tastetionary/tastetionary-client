'use client';

import MainButton from '@/components/Button/MainButton';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CStickyMemo from '@/components/c-sticky-memo';
import { useRouter } from 'next/navigation';
import MENU_KOREAN from '../../../../public/image/Menu/menu_korean.svg';
import * as S from './page.styled';

export default function SelectMenuResult() {
  const router = useRouter();

  return (
    <>
      <CHeader isLogo isBackBtn title="맛셔너리" />

      <S.Container>
        <S.ResultTitle>오늘의 점심 메뉴는...</S.ResultTitle>

        <CStickyMemo>
          <S.MemoTitle>김치찌개!</S.MemoTitle>

          <MENU_KOREAN width={160} height={160} />
        </CStickyMemo>

        <S.ButtonContainer>
          <MainButton btnText="다시 선택하기" />

          <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-menu')} />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
