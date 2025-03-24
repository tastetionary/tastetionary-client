'use client';

import CHeader from '@/components/c-header';
import ReviewItem from '../../components/ReviewItem';
import useRestaurantReviewQuery from './_hooks/useRestaurantReivewQuery.ts';

interface Props {
  params: {
    restaurantId: string;
  };
}

export default function SelectRestaurantResultReview({ params }: Props) {
  const { restaurantReviews } = useRestaurantReviewQuery({ restaurantId: params.restaurantId });

  return (
    <>
      <CHeader title="리뷰 더 보기" />

      <div className="pb-xl pt-lg">
        <div className="flex w-full items-center justify-between px-xl">
          <div className="title2">
            <strong className="title2 font-bold">리뷰</strong> {restaurantReviews?.length ?? 0}개
          </div>
        </div>

        <div className="mt-md ">
          {restaurantReviews?.map((reviews, i) => <ReviewItem {...reviews} key={reviews.id} />)}
        </div>
      </div>
    </>
  );
}
