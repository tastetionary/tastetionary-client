import reviewRepository from '@/apis/restaurant/review/comment';
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
  }>(['review-comment', restaurantId], () => reviewRepository().getComment({ restaurantId }), {
    staleTime: 0,
  });

  return { restaurantReviews: data?.data.reviews };
}
