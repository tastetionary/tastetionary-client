export interface GetRestaurantKeywordReviewRes {
  revisitRatio: number;
  total: number;
  keywordCounts: {
    name: string;
    count: number;
  }[];
}
