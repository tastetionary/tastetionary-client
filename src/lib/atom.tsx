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
  effects_UNSTABLE: [persistAtom],
});

export const selectResultState = atom<{
  food?: {
    id: number;
    name?: string;
  };
  restaurant?: {
    name?: string;
    latitude: number;
    longitude: number;
    review?: {
      total: number;
      keywords: string[];
      aggregatePrice: {
        avg: number;
        [key: string]: number;
      };
      revisitRatio: number;
    };
  };
}>({
  key: 'selectResultState',
  default: {
    food: {
      id: 0,
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

export const reviewState = atom<{ category: string[]; keyword: string[]; price: number }>({
  key: 'reviewState',
  default: {
    category: [],
    keyword: [],
    price: 0,
  },
});

export const reviewPlaceInfoState = atom<{
  id: string;
  placeName: string;
  address: string;
  latitude: string;
  longitude: string;
  place_url?: string;
}>({
  key: 'reviewPlaceInfoState',
  default: {
    id: '',
    placeName: '',
    address: '',
    latitude: '',
    longitude: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const agreeTermState = atom<{
  all: boolean;
  privacy: boolean;
  marketing: boolean;
  service: boolean;
}>({
  key: 'agreeTermState',
  default: {
    all: false,
    privacy: false,
    marketing: false,
    service: false,
  },
});
