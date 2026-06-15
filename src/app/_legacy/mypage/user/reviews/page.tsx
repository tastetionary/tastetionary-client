'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MyReviewItem } from './components/MyReviewItem';
import IMG_ERROR from '@/assets/common/error.svg';
import { RestaurantReviewItemType, restaurantReviewRepository } from '@/features/reviews/api';
import useUser from '@/shared/hooks/useUser';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';

export default function MyReviews() {
  const router = useRouter();
  const { token, data: userData } = useUser();
  const { data } = useQuery({
    queryKey: ['my-reivews'],
    queryFn: async () => {
      return await restaurantReviewRepository().getUsersRestaurantReview({ reviewer_id: userData?.id ?? 0, token });
    },
    enabled: Boolean(token) && Boolean(userData?.id),
  });

  return (
    <>
      <CHeader title="리뷰 관리" />

      <div>
        {data?.reviews.length === 0 && (
          <div className="flex flex-col items-center gap-md">
            <IMG_ERROR />

            <div className="title2 font-bold">작성한 리뷰가 없어요</div>

            <p className="body2 mt-xs text-neutral-bg60">최근 방문한 식당을 찾아 리뷰를 작성해보세요.</p>

            <BottomButtonContainer>
              <footer className="w-full">
                <DefaultButton
                  bgColor="yellow"
                  customStyle="flex w-full py-[12px] px-[16px]"
                  onClick={() => router.push('/register-review')}
                >
                  <span className="!font-pretendard text-white">리뷰 작성하기</span>
                </DefaultButton>
              </footer>
            </BottomButtonContainer>
          </div>
        )}

        {data?.reviews?.map((r: RestaurantReviewItemType) => (
          <MyReviewItem key={r.id} id={r.id} keywords={r.keywords} restaurant={r.restaurant} summary={r.summary} />
        ))}
      </div>
    </>
  );
}
