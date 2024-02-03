import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SelectFoodState {
  category: string[];
  keyword: string[];
  setFoodCategory: (value: string[]) => void;
  setFoodKeyword: (value: string[]) => void;
  resetSelectFood: () => void;
}

export const useSelectFoodStore = create<SelectFoodState>()(
  devtools(
    persist(
      set => ({
        category: [],
        keyword: [],
        setFoodCategory: value =>
          set({
            category: value,
          }),
        setFoodKeyword: value =>
          set({
            keyword: value,
          }),
        resetSelectFood: () =>
          set({
            category: [],
            keyword: [],
          }),
      }),
      {
        name: 'select-food-storage',
      }
    )
  )
);
