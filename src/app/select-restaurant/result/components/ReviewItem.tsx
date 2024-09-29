import IC_DISLIKE from '@/assets/common/Icons/dislike.svg';
import IC_LIKE from '@/assets/common/Icons/like.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CReviewReportBtn from '@/components/c-review-report-btn';
import { GetRestaurantReviewRes } from '@/types/review';
import dayjs from 'dayjs';

interface Props {
  reviews?: GetRestaurantReviewRes;
}

export default function ReviewItem({ reviews }: Props) {
  return (
    <div className="flex w-full flex-col gap-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="body2 font-bold">{reviews?.user?.nickname ?? ''}</span>

          <div className="body3 mt-xxs text-neutral-bg60">
            작성 리뷰 {reviews?.user?.reviews ?? 0}개 | {dayjs(reviews?.createdAt).format('YYYY.MM.DD')}
          </div>
        </div>

        <CReviewReportBtn id={reviews?.id ?? '0'} />
      </div>

      <p className="body2">{reviews?.summary}</p>

      <div className="flex- flex-g flex flex-wrap gap-xxs">
        {reviews?.keywords?.map((k, i) => (
          <DefaultButton bgColor="gray" customStyle="py-2 px-8" key={i}>
            <span className="body4">{k}</span>
          </DefaultButton>
        ))}
      </div>

      <div className="flex w-full gap-xxs">
        <DefaultButton bgColor="gray" customStyle="py-12 flex gap-xs flex-grow">
          <IC_LIKE />
          <span className="body2">도옴이 돼요</span>
        </DefaultButton>

        <DefaultButton bgColor="gray" customStyle="py-12 flex gap-xs flex-grow">
          <IC_DISLIKE />
          <span className="body2">도옴 안 돼요</span>
        </DefaultButton>
      </div>
    </div>
  );
}
