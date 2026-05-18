import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ReviewState {
  category: string[];
  keyword: string[];
  prices: string[];
  resetReviewState: () => void;
  setReviewCategory: (value: string[]) => void;
  setReviewKeyword: (value: string[]) => void;
  setReviewPrice: (value: string[]) => void;
}

export const useReviewStore = create<ReviewState>()(
  devtools(set => ({
    category: [],
    keyword: [],
    prices: [],
    resetReviewState: () =>
      set({
        category: [],
        keyword: [],
        prices: [],
      }),
    setReviewCategory: value =>
      set({
        category: value,
      }),
    setReviewKeyword: value =>
      set({
        keyword: value,
      }),
    setReviewPrice: value =>
      set({
        prices: value,
      }),
  }))
);
