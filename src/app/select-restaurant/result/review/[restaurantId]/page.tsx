'use client';

import CHeader from '@/components/c-header';
import CReviewItem from '@/components/c-review-item';
import useRestaurantReviewQuery from './_hooks/useRestaurantReivewQuery.ts';

export default function SelectRestaurantResultReview() {
  const { data } = useRestaurantReviewQuery({ restaurantId: 25 });

  console.log('data', data);
  return (
    <>
      <CHeader title="리뷰" isBackBtn />

      <div>
        <CReviewItem />
        <CReviewItem />
        <CReviewItem />
        <CReviewItem />
      </div>
    </>
  );
}
