import * as api from '@homekeeper89/taste_dict/lib/api';
import { FoodCategory, FoodKeyword } from '@homekeeper89/taste_dict/lib/domain/food/food.enum';

interface Req {
  categories: FoodCategory[];
  keywords: FoodKeyword[];
}

export interface FoodRecommendRes {
  name: string;
}

export const postFoodRecommend = async (req: Req, token?: string) => {
  const res = await api.functional.v1.food.recommendation.getRecommentation(
    {
      host: 'http://127.0.0.1:3000',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    req
  );

  if (res?.data) {
    return res?.data;
  }
};
