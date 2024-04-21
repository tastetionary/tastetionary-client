import { getRestaurantReviewComment } from '@/apis/restaurant/review/comment';
import { useQuery } from '@tanstack/react-query';

interface Props {
  restaurantId: number;
}

export default function useRestaurantReviewQuery({ restaurantId }: Props) {
  const { data } = useQuery(['review-comment'], () => getRestaurantReviewComment({ restaurantId }), {
    staleTime: 0,
  });

  return { data };
}
