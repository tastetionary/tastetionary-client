import http from '../http';

interface Res {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
  prices: { id: number; name: string }[];
}

export const getRestaurantOption = async () => {
  const res = await http.get<{ data?: Res }>('/apis/v1/restaurant/option');

  if (res?.data) {
    return res?.data;
  }
};
