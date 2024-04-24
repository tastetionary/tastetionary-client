import http from '@/apis/http';

interface Params {
  restaurantId: string;
}

export const getRestaurantReviewComment = async ({ restaurantId }: Params) => {
  const token = sessionStorage?.getItem('token');

  const response = await http.get(`/apis/v1/restaurant/${restaurantId}/review`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
