'use client';

import CHeader from '@/components/c-header';
import CReviewItem from '@/components/c-review-item';
import Image from 'next/image';
import RevisitingProgressbar from './_components/revisiting-progressbar';
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
      <CHeader title="리뷰" isBackBtn />

      <div className="mb-48 bg-white">
        <div className="px-24">
          <p className="mb-16 flex items-center gap-4 px-6">
            <Image src={'/image/LikeOn.svg'} alt="like" width={28} height={28} />
            <span className="font-extrabold text-primary-y80">{keywordReviews?.revisitRatio}%</span>{' '}
            <span className="text-14">의 리뷰어가 재방문하고 싶어 해요!</span>
          </p>

          {keywordReviews?.keywordCounts?.map((d, idx) => (
            <RevisitingProgressbar
              key={idx}
              name={d.name}
              cnt={d.count}
              percent={(d.count / keywordReviews?.total) * 100}
            />
          ))}
        </div>

        {restaurantReviews?.map(reviews => <CReviewItem reviews={reviews} />)}
      </div>

      <div className="absolute bottom-0 flex h-48 w-full justify-center bg-primary-y70 mobile:fixed">
        <button className="text-white">리뷰 쓰기</button>
      </div>
    </>
  );
}
