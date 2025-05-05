import CRecommendButton from '@/components/c-recommend-button';
import ReviewContent, { Reviews } from '../review-content';

interface Props {
  reviews: Reviews[];
}

export default function RecentReviews({ reviews }: Props) {
  return (
    <div className="px-32 pb-24 pt-[48px]">
      <p className="title4 font-bold">오늘 리뷰가 등록된 식당이 있어요 ✍️</p>
      <p className="body2 pt-12">최근 다녀온 식당의 리뷰를 작성해 보세요.</p>

      <div className="pt-24 [&>div:last-child]:border-none">
        {reviews.map(review => (
          <ReviewContent address={review.address} name={review.name} summary={review.summary} />
        ))}
      </div>

      {/* 호진FIXME: width 고정 px로 선언한 부분 제거 */}
      <div className="mx-auto flex w-[322px] items-center pt-8">
        <CRecommendButton btnText="메뉴 고르기" selectType="home" disabled={false} />
      </div>
    </div>
  );
}
