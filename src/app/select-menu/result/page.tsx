'use client';

import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CStickyMemo from '@/components/c-sticky-memo';
import { selectResultState } from '@/lib/atom';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import MENU_KOREAN from '../../../../public/image/Menu/menu_korean.svg';
import * as S from './page.styled';

export default function SelectMenuResult() {
  const router = useRouter();

  const food = useRecoilValue(selectResultState)?.food?.name;

  return (
    <>
      <CHeader isLogo isBackBtn title="맛셔너리" />

      <S.Container>
        <S.ResultTitle>오늘의 점심 메뉴는...</S.ResultTitle>

        <CStickyMemo>
          <S.MemoTitle>{food ? `${food}!` : ''}</S.MemoTitle>

          <MENU_KOREAN width={160} height={160} />
        </CStickyMemo>

        <S.ButtonContainer>
          <CRecommendButton btnText="다시 선택하기" selectType="food" />

          <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-menu')} />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
