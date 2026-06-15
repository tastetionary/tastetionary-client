'use client';

import { useRouter } from 'next/navigation';
import ReviewContent, { Reviews } from '../review-content';
import DefaultButton from '@/shared/ui/Button/DefaultButton';

interface Props {
  reviews: Reviews[];
}

export default function RecentReviews({ reviews }: Props) {
  const router = useRouter();

  return (
    <div className="px-32 pb-24 pt-[48px]">
      <p className="title4 font-bold">오늘 리뷰가 등록된 식당이 있어요 ✍️</p>
      <p className="body2 pt-12">최근 다녀온 식당의 리뷰를 작성해 보세요.</p>

      <div className="pt-24 [&>div:last-child]:border-none">
        {reviews.map((review, idx) => (
          <ReviewContent
            key={`review_content-${idx}`}
            address={review.address}
            name={review.name}
            summary={review.summary}
          />
        ))}
      </div>

      <div className="mx-auto flex max-w-322 items-center pt-8">
        <DefaultButton
          bgColor="yellow"
          customStyle="flex-grow py-12"
          onClick={() => router.push('/register-review/restaurant')}
        >
          <span className="body1 text-white">리뷰 작성하기</span>
        </DefaultButton>
      </div>
    </div>
  );
}
