import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ReviewPlaceInfoState {
  id: string;
  placeName: string;
  address: string;
  latitude: string;
  longitude: string;
  place_url?: string;
  setReviewPlaceInfo: (value: {
    id: string;
    placeName: string;
    address: string;
    latitude: string;
    longitude: string;
    place_url?: string;
  }) => void;
  resetReviewPlaceInfo: () => void;
}

export const useReviewPlaceInfoStore = create<ReviewPlaceInfoState>()(
  devtools(
    persist(
      set => ({
        id: '',
        placeName: '',
        address: '',
        latitude: '',
        longitude: '',
        resetReviewPlaceInfo: () =>
          set({
            id: '',
            placeName: '',
            address: '',
            latitude: '',
            longitude: '',
          }),
        setReviewPlaceInfo: value =>
          set({
            id: value.id,
            placeName: value.placeName,
            address: value.address,
            latitude: value.latitude,
            longitude: value.longitude,
            place_url: value?.place_url,
          }),
      }),
      {
        name: 'review-place-info-store',
      }
    )
  )
);
