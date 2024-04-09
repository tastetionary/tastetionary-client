'use client';

import CHeader from '@/components/c-header';
import CReviewItem from '@/components/c-review-item';

export default function SelectRestaurantResultReview() {
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
