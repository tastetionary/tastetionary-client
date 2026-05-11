import restaurantRepository from '@/apis/restaurant';
import { type RestaurantReview } from '@/apis/restaurant/recommend';
import IC_DISLIKE from '@/assets/common/Icons/dislike.svg';
import IC_LIKE from '@/assets/common/Icons/like.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CReviewReportBtn from '@/components/c-review-report-btn';
import useToken from '@/hooks/useToken';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { cn } from '@/utils/styles.utils';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function ReviewItem({ user, createdAt, id, keywords, summary, userReaction }: RestaurantReview) {
  const { restaurant, updateReviewReact } = useSelectResultStore();
  const { token } = useToken();

  const { mutate: updateReact } = useMutation({
    mutationFn: restaurantRepository().reactRestaurantReview,
    onSuccess: (_, { reactionType }) => {
      updateReviewReact(id, reactionType);
    },
  });

  const handleClickReviewReactBtn = (type: 'L' | 'D') => {
    updateReact({ restaurantId: Number(restaurant?.id), reviewId: Number(id), reactionType: type, token });
  };

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
          customStyle={cn('py-12 flex gap-xs flex-grow', userReaction === 'L' ? 'default-btn selected ' : '')}
          onClick={() => handleClickReviewReactBtn('L')}
        >
          <IC_LIKE />
          <span className="body2">도움이 돼요</span>
        </DefaultButton>

        <DefaultButton
          bgColor="gray"
          customStyle={cn('py-12 flex gap-xs flex-grow', userReaction === 'D' ? 'default-btn selected ' : '')}
          onClick={() => handleClickReviewReactBtn('D')}
        >
          <IC_DISLIKE />
          <span className="body2">도움 안 돼요</span>
        </DefaultButton>
      </div>
    </div>
  );
}
