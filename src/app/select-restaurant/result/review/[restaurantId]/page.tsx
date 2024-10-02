'use client';

import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import ReviewItem from '../../components/ReviewItem';
import useRestaurantReviewQuery from './_hooks/useRestaurantReivewQuery.ts';

interface Props {
  params: {
    restaurantId: string;
  };
}

export default function SelectRestaurantResultReview({ params }: Props) {
  const { restaurantReviews, keywordReviews } = useRestaurantReviewQuery({ restaurantId: params.restaurantId });

  return (
    <>
      <CHeader title="리뷰 더 보기" isBackBtn />

      <div className="pb-xl pt-lg">
        <div className="w-full px-xl">
          <DefaultButton bgColor="orange" customStyle="flex-grow py-12 w-full">
            <span className="body1 text-white">리뷰 작성하러 가기</span>
          </DefaultButton>
        </div>

        <div className="mt-md ">{restaurantReviews?.map((reviews, i) => <ReviewItem reviews={reviews} key={i} />)}</div>
      </div>
    </>
  );
}
