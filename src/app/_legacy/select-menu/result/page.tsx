'use client';

import FOOD_NO_RESULT from '@/assets/common/food_no_result.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SelectMenuResult() {
  const router = useRouter();

  const { food } = useSelectResultStore();
  const foodName = food?.name;

  return (
    <>
      <CHeader title="메뉴 고르기" />

      <div className="mt-xxxl flex flex-col items-center px-xl">
        <div className="body2 text-neutral-bg60">오늘의 점심 메뉴는...</div>

        <div className="title2">
          <strong className="font-bold">{foodName}</strong> 어때요?
        </div>

        <div className="mt-xl">
          {food?.id && food?.id > 0 ? (
            <Image src={`/image/Food/food_${food.id}.svg`} alt={'menu-result'} width={160} height={160} />
          ) : (
            <FOOD_NO_RESULT width={160} height={160} />
          )}
        </div>

        <BottomButtonContainer>
          <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-menu')} />

          <CRecommendButton btnText="한 번 더 돌리기" selectType="food" />
        </BottomButtonContainer>
      </div>
    </>
  );
}
