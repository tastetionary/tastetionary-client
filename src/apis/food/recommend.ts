import { FoodCategory, FoodKeyword } from '@homekeeper89/taste_dict/lib/domain/food/food.enum';
import http from '../http';

interface Req {
  categories: FoodCategory[];
  keywords: FoodKeyword[];
}

export interface FoodRecommendRes {
  name: string;
}

export const postFoodRecommend = async (req: Req, token?: string) => {
  const res = await http.post<{ data?: FoodRecommendRes }, Req>(
    '/apis/v1/food/recommendation',
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
