import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const selectFoodState = atom<{ category: string[]; keyword: string[] }>({
  key: 'foodRecommendState',
  default: {
    category: [],
    keyword: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectRestaurantState = atom<{ category: string[]; keyword: string[]; price: number }>({
  key: 'selectRestaurantState',
  default: {
    category: [],
    keyword: [],
    price: 0,
  },
});

export const selectResultState = atom<{
  food?: {
    name?: string;
  };
  restaurant?: {
    name?: string;
    latitude: number;
    longitude: number;
  };
}>({
  key: 'selectResultState',
  default: {
    food: {
      name: undefined,
    },
    restaurant: {
      name: undefined,
      latitude: 0,
      longitude: 0,
    },
  },
  effects_UNSTABLE: [persistAtom],
});
