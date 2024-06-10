import { GetRestaurantReviewRes } from '@/types/review';
import dayjs from 'dayjs';
import { useState } from 'react';
import CReviewLikeBtn from './c-review-like-btn';
import CReviewReportBtn from './c-review-report-btn';

interface Props {
  reviews?: GetRestaurantReviewRes;
}

export default function CReviewItem({ reviews }: Props) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  return (
    <div className="flex w-full flex-col gap-12 border-solid border-neutral-bg10 bg-white p-24 [&:not(:last-child)]:border-b-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-10">
          <span className="text-14 font-bold leading-[14px]">{reviews?.user.nickname}</span>
          <span className="text-12 font-normal leading-[12px] text-neutral-bg20">
            작성리뷰 {reviews?.user.reviews}개 | {dayjs(reviews?.createdAt).format('YYYY-MM-DD')}
          </span>
        </div>

        <button>
          <CReviewReportBtn id={reviews?.id} />
        </button>
      </div>

      <p className="text-14 leading-[25.2px]">{reviews?.summary}</p>

      <div className="flex flex-wrap gap-4">
        {reviews?.keywords.map((k, i) => (
          <div
            key={i}
            className="border-1 border-solid border-neutral-bg20 p-10 text-12 leading-[12px] text-neutral-bg60"
          >
            {k}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <CReviewLikeBtn
          text="도움이 돼요"
          value={reviews?.like as number}
          clicked={like}
          onClickEvent={() => {
            setLike(prev => !prev);
            setDislike(like);
          }}
        />

        <CReviewLikeBtn
          text="도움 안돼요"
          value={reviews?.dislike as number}
          clicked={dislike}
          onClickEvent={() => {
            setDislike(prev => !prev);
            setLike(dislike);
          }}
        />
      </div>
    </div>
  );
}
