import http from '../http';

interface AuthRepository {
  reactRestaurantReview: ({
    restaurantId,
    reviewId,
    reactionType,
    token,
  }: {
    restaurantId: number;
    reviewId: number;
    reactionType: 'L' | 'D';
    token: string;
  }) => Promise<any>;
}

const restaurantRepository = (): AuthRepository => {
  return {
    reactRestaurantReview: async ({ restaurantId, reviewId, reactionType, token }) =>
      await http.put(
        `/apis/v1/restaurant/${restaurantId}/review/${reviewId}/react`,
        { reaction_type: reactionType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  };
};

export default restaurantRepository;
