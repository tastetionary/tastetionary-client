'use client';

import CHeader from '@/components/c-header';
import CReviewItem from '@/components/c-review-item';
import useRestaurantReviewQuery from './_hooks/useRestaurantReivewQuery.ts';

export default function SelectRestaurantResultReview() {
  const { restaurantReviews } = useRestaurantReviewQuery({ restaurantId: 25 });

  return (
    <>
      <CHeader title="리뷰" isBackBtn />

      <div>{restaurantReviews?.map(reviews => <CReviewItem reviews={reviews} />)}</div>
    </>
  );
}
