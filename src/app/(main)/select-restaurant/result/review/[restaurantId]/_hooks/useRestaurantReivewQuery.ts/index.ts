import { useQuery } from '@tanstack/react-query';
import { type RestaurantReview } from '@/apis/restaurant/recommend';
import reviewRepository from '@/apis/restaurant/review/comment';
import { type GetRestaurantKeywordReviewRes } from '@/types/review';

interface Props {
  restaurantId: string;
}

export default function useRestaurantReviewQuery({ restaurantId }: Props) {
  const { data } = useQuery<{
    keywordReviews: GetRestaurantKeywordReviewRes;
    reviews: RestaurantReview[];
  }>({
    queryKey: ['review-comment', restaurantId],
    queryFn: async () => {
      return (await reviewRepository().getComment({ restaurantId })) as {
        keywordReviews: GetRestaurantKeywordReviewRes;
        reviews: RestaurantReview[];
      };
    },
    staleTime: 0,
  });

  return { restaurantReviews: data?.reviews, keywordReviews: data?.keywordReviews };
}
