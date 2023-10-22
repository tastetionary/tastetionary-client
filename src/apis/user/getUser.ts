import http from '../http';

interface IRegion {
  latitude: number;
  longitude: number;
  category: 'activity_area' | 'dining_area';
  address: string;
}

export interface UserRes {
  id: number;
  nickname: string;
  activity_area: IRegion;
  dining_area: IRegion;
}

export const getUser = async (token?: string) => {
  const res = await http.get<{ data?: UserRes }>(
    '/apis/v1/user',
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
