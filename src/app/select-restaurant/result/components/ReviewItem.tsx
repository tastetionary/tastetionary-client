import IC_DISLIKE from '@/assets/common/Icons/dislike.svg';
import IC_LIKE from '@/assets/common/Icons/like.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CReviewReportBtn from '@/components/c-review-report-btn';
import { GetRestaurantReviewRes } from '@/types/review';
import dayjs from 'dayjs';

export default function ReviewItem({ user, createdAt, id, keywords, summary, opinion }: GetRestaurantReviewRes) {
  return (
    <div className="flex w-full flex-col gap-sm px-xl pb-lg pt-md not-last:border-b-1 not-last:border-solid not-last:border-neutral-bg20">
      <div className="flex items-center justify-between">
        <div>
          <span className="body2 font-bold">{user?.nickname ?? ''}</span>

          <div className="body3 mt-xxs text-neutral-bg60">
            작성 리뷰 {user?.reviews ?? 0}개 | {dayjs(createdAt).format('YYYY.MM.DD')}
          </div>
        </div>

        <CReviewReportBtn id={id ?? '0'} />
      </div>

      <p className="body2">{summary}</p>

      <div className="flex- flex-g flex flex-wrap gap-xxs">
        {keywords?.map((k, i) => (
          <DefaultButton bgColor="gray" customStyle="py-2 px-8" key={i}>
            <span className="body4">{k}</span>
          </DefaultButton>
        ))}
      </div>

      <div className="flex w-full gap-xxs">
        <DefaultButton
          bgColor="gray"
          customStyle={'py-12 flex gap-xs flex-grow' + (opinion === 'Y' ? ' default-btn selected ' : '')}
        >
          <IC_LIKE />
          <span className="body2">도옴이 돼요</span>
        </DefaultButton>

        <DefaultButton
          bgColor="gray"
          customStyle={'py-12 flex gap-xs flex-grow' + (opinion === 'N' ? ' default-btn selected ' : '')}
        >
          <IC_DISLIKE />
          <span className="body2">도옴 안 돼요</span>
        </DefaultButton>
      </div>
    </div>
  );
}
