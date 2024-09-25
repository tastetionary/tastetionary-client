import http from '../http';

interface Res {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
}

export const getFoodOption = async () => {
  const baseUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await http.get<{ data?: Res }>(`${baseUrl}/apis/v1/food/option`);

  if (res?.data) {
    return res?.data as Res;
  }
};
