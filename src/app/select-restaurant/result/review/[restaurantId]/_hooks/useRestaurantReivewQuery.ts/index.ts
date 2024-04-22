import { getRestaurantReviewComment } from '@/apis/restaurant/review/comment';
import { GetRestaurantReviewRes } from '@/types/review';
import { useQuery } from '@tanstack/react-query';

interface Props {
  restaurantId: string;
}

export default function useRestaurantReviewQuery({ restaurantId }: Props) {
  const { data } = useQuery<{
    data: {
      reviews: GetRestaurantReviewRes[];
    };
  }>(['review-comment', restaurantId], () => getRestaurantReviewComment({ restaurantId }));

  return { restaurantReviews: data?.data.reviews };
}
