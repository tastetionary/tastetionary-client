import { RestaurantReviewItemType } from '@/apis/restaurant/review';
import IC_MORE from '@/assets/common/Icons/more.svg';
import DefaultButton from '@/components/Button/DefaultButton';

export function MyReviewItem({
  keywords,
  restaurant,
  summary,
}: Pick<RestaurantReviewItemType, 'keywords' | 'restaurant' | 'summary'>) {
  return (
    <div className="flex flex-col gap-sm border-b border-solid border-neutral-bg20 px-lg py-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-xxs">
          <div className="body2 font-bold">{restaurant.name}</div>

          <div className="body3 text-neutral-bg60">{restaurant.address}</div>
        </div>

        <button>
          <IC_MORE width={24} height={24} />
        </button>
      </div>

      {summary && <p className="body2 text-neutral-bg80">{summary}</p>}

      <div className="flex flex-wrap items-center gap-xxs">
        {keywords.map(keyword => (
          <DefaultButton bgColor="gray" customStyle="py-2 px-8" key={keyword}>
            <span className="body4">{keyword}</span>
          </DefaultButton>
        ))}
      </div>
    </div>
  );
}
