import http from '../http';

export interface FoodOptionRes {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
}

export const getFoodOption = async () => {
  return await http.get<FoodOptionRes>(`/apis/v1/food/option`);
};
