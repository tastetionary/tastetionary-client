'use client';

import FOOD_NO_RESULT from '@/assets/common/food_no_result.svg';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CStickyMemo from '@/components/c-sticky-memo';
import { selectResultState } from '@/lib/atom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import * as S from './page.styled';

export default function SelectMenuResult() {
  const router = useRouter();

  const result = useRecoilValue(selectResultState)?.food;
  const food = result?.name;

  return (
    <>
      <CHeader isLogo isBackBtn title="맛셔너리" />

      <S.Container>
        <S.ResultTitle>오늘의 점심 메뉴는...</S.ResultTitle>

        <CStickyMemo>
          <S.MemoTitle>{food ? `${food}!` : '조건에 맞는\n메뉴가 없어요'}</S.MemoTitle>

          {result?.id && result?.id > 0 ? (
            <Image src={`/image/Food/food_${result.id}.svg`} alt={'menu-result'} width={160} height={160} />
          ) : (
            <FOOD_NO_RESULT width={160} height={160} />
          )}
        </CStickyMemo>

        <S.ButtonContainer>
          <CRecommendButton btnText="다시 선택하기" selectType="food" />

          <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-menu')} />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
