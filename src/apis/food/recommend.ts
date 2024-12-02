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
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.tastetionary.com';

  const res = await http.post<{ data?: FoodRecommendRes }, Req>(
    `${baseUrl}/apis/v1/food/recommendation`,
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
