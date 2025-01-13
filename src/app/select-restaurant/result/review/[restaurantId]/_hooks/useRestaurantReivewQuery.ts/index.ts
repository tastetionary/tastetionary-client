import reviewRepository from '@/apis/restaurant/review/comment';
import { GetRestaurantKeywordReviewRes, GetRestaurantReviewRes } from '@/types/review';
import { useQuery } from '@tanstack/react-query';

interface Props {
  restaurantId: string;
}

export default function useRestaurantReviewQuery({ restaurantId }: Props) {
  const { data } = useQuery<{
    keywordReviews: GetRestaurantKeywordReviewRes;
    reviews: GetRestaurantReviewRes[];
  }>({
    queryKey: ['review-comment', restaurantId],
    queryFn: async () => {
      return (await reviewRepository().getComment({ restaurantId })) as {
        keywordReviews: GetRestaurantKeywordReviewRes;
        reviews: GetRestaurantReviewRes[];
      };
    },
    staleTime: 0,
  });

  return { restaurantReviews: data?.reviews, keywordReviews: data?.keywordReviews };
}
