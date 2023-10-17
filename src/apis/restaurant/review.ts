import { RestaurantCategory, RestaurantKeyword } from '@homekeeper89/taste_dict/lib/domain/restaurant/restaurant.enum';
import http from '../http';

interface Req {
  review: {
    category: RestaurantCategory;
    keywords: RestaurantKeyword[];
    price: number;
    summary: string;
  };
  external: {
    externalUUID: number;
    name: string;
    latitude: number;
    longitude: number;
    referenceLink?: string;
  };
}

interface Res {}

export const postRestarantReview = async (req: Req, token?: string) => {
  const res = await http.post<{ data?: Res }, Req>(
    '/apis/v1/restaurant/review',
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
