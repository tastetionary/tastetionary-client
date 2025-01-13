import { FoodCategory, FoodKeyword } from '@taehoya/tastetionary/lib/domain/food/food.enum';
import http from '../http';

interface Req {
  categories: FoodCategory[];
  keywords: FoodKeyword[];
}

export interface FoodRecommendRes {
  id: number;
  name: string;
}

export const postFoodRecommend = async (req: Req, token?: string) => {
  return await http.post<FoodRecommendRes, Req>(
    `/apis/v1/food/recommendation`,
    req,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
};
