import reviewRepository from '@/apis/restaurant/review/comment';
import { GetRestaurantReviewRes } from '@/types/review';
import { useQuery } from '@tanstack/react-query';

interface Props {
  restaurantId: string;
}

export default function useRestaurantReviewQuery({ restaurantId }: Props) {
  const { data } = useQuery<{
    reviews: GetRestaurantReviewRes[];
  }>(['review-comment', restaurantId], () => reviewRepository().getComment({ restaurantId }));

  return { restaurantReviews: data?.reviews };
}
