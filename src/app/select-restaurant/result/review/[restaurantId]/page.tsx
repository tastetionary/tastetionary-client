'use client';

import CHeader from '@/components/c-header';
import CReviewItem from '@/components/c-review-item';
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
      <CHeader title="리뷰" isBackBtn />

      <div>{restaurantReviews?.map(reviews => <CReviewItem reviews={reviews} />)}</div>
    </>
  );
}
