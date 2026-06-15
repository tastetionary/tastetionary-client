import http from '../http';

interface Res {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
  prices: { id: number; name: string }[];
}

export const getRestaurantOption = async () => {
  return await http.get<Res>(`/apis/v1/restaurant/option`);
};
