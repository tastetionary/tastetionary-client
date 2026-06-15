import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface Region {
  address: string;
  latitude: number;
  longitude: number;
}

interface RegionState {
  region: Region;
  setRegion: (value: Region) => void;
  clearRegion: () => void;
}

const defaultRegion: Region = {
  address: '',
  latitude: 0,
  longitude: 0,
};

export const useRegionStore = create<RegionState>()(
  devtools(
    persist(
      immer(set => ({
        region: defaultRegion,
        setRegion: value =>
          set(state => {
            state.region = {
              address: value.address,
              latitude: value.latitude,
              longitude: value.longitude,
            };
          }),
        clearRegion: () =>
          set(state => {
            state.region = defaultRegion;
          }),
      })),
      {
        name: 'region-storage',
      }
    )
  )
);
