import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AgreeTermState {
  all: boolean;
  moreThan14: boolean;
  privacy: boolean;
  marketing: boolean;
  service: boolean;
  locationBased: boolean;
  setAllToggle: (value: boolean) => void;
  setToggle: (key: string, value: boolean) => void;
}

export const useAgreeTermStore = create<AgreeTermState>()(
  devtools(set => ({
    all: false,
    privacy: false,
    marketing: false,
    service: false,
    moreThan14: false,
    locationBased: false,
    setAllToggle: value =>
      set({
        all: value,
        privacy: value,
        marketing: value,
        service: value,
        moreThan14: value,
        locationBased: value,
      }),
    setToggle: (key, value) =>
      set({
        [key]: value,
      }),
  }))
);
