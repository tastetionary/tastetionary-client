import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
