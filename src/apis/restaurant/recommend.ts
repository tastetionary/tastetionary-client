import { RestaurantCategory } from '@homekeeper89/taste_dict/lib/domain/restaurant/restaurant.enum';
import http from '../http';

interface Req {
  excludeIds: number[];
  category: RestaurantCategory;
  keywords: string[];
  price: number;
}

export interface RestaurantRecommendRes {
  id: string;
  name: string;
  referenceLink: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const postRestaurantRecommend = async (req: Req, token?: string) => {
  const res = await http.post<{ data?: RestaurantRecommendRes }, Req>(
    '/apis/v1/restaurant/recommendation',
    req,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );

  if (res?.data) {
    return res?.data;
  }
};
