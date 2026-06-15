'use client';

import { useRouter } from 'next/navigation';
import COMPLETE from '@/assets/logo/complete.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import { useReviewPlaceInfoStore } from '@/store/useReviewPlaceInfoStore';
import { useReviewStore } from '@/store/useReviewStore';

export default function ReviewComplete() {
  const router = useRouter();
  const { resetReviewState } = useReviewStore();
  const { resetReviewPlaceInfo } = useReviewPlaceInfoStore();

  const resetReviewData = () => {
    resetReviewState();
    resetReviewPlaceInfo();
  };

  const handleWriteRestaurantReview = () => {
    resetReviewData();
    router.push('/register-review/restaurant');
  };

  const handleMoveToHome = () => {
    resetReviewData();
    router.push('/explore');
  };

  return (
    <>
      <CHeader title="리뷰 작성" noBackBtn />
      <div className="relative flex h-full flex-col items-center py-20 pb-30 text-center">
        <COMPLETE />
        <div className="title2 mt-5 font-bold">리뷰 작성을 완료했어요.</div>
        <p className="body2 my-[15px] mb-[100px] text-neutral-bg60">
          작성해주신 리뷰는 해당 식당을 평가하는 데에 좋은 정보가 됩니다.
        </p>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="gray"
            customStyle="w-full py-[12px] px-[16px] mb-[25px]"
            onClick={handleWriteRestaurantReview}
          >
            <span className="body1">다른 식당 리뷰하기</span>
          </DefaultButton>

          <DefaultButton bgColor="yellow" customStyle="flex w-full py-[12px] px-[16px]" onClick={handleMoveToHome}>
            <span className="!font-pretendard text-white">메인 화면으로</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
