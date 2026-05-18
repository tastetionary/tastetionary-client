import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ReviewType {
  id: string;
  placeName: string;
  address: string;
  latitude: string;
  longitude: string;
  place_url?: string;
}

interface ReviewPlaceInfoState extends ReviewType {
  setReviewPlaceInfo: (value: ReviewType) => void;
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
