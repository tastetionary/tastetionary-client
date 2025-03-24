import IC_CHEVRON from '@/assets/common/Icons/chevron.svg';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { useRouter } from 'next/navigation';
import ReviewItem from './ReviewItem';

export default function RestaurantReview() {
  const { push } = useRouter();
  const { restaurant } = useSelectResultStore();

  return (
    <div className="pb-[120px]">
      <div className="mt-xxl flex w-full items-center justify-between px-xl">
        <div className="title2">
          <strong className="title2 font-bold">리뷰 </strong>
          {restaurant?.reviews.length ?? 0}개
        </div>

        <div
          className="flex cursor-pointer items-center gap-xxs"
          onClick={() => push(`/select-restaurant/result/review/${restaurant?.id}`)}
        >
          <span className="body2">리뷰 더 보기</span>

          <IC_CHEVRON width={16} height={16} />
        </div>
      </div>

      <div className="mt-md">{restaurant?.reviews?.map(review => <ReviewItem key={review.id} {...review} />)}</div>
    </div>
  );
}
