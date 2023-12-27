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
  area: {
    activityArea: IRegion;
    diningArea: IRegion;
  };
  account: {
    companyEmail?: string;
    accountEmail: string;
  };
}

export const getUser = async (token?: string) => {
  const res = await http.get<{ data?: UserRes }>(
    '/apis/v1/user/profile',
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
