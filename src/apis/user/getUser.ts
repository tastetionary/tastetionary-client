import http from '../http';

interface IRegion {
  category: 'activity_area' | 'dining_area';
  id: number;
  userId: number;
  order: number;
  address: string;
  latitude: number;
  longitude: number;
}

export interface UserRes {
  id: number;
  nickname: string;
  area: IRegion;
  account: {
    accountEmail: string;
  };
}

export const getUser = async (token?: string) => {
  if (!token) {
    throw new Error('Token is required to fetch user data');
  }

  const res = await http.get<UserRes>(`/apis/v1/user`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return res;
};
