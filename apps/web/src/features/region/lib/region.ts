export interface Region {
  address: string;
  latitude: number;
  longitude: number;
}

/** 주소와 유효한 좌표(0/NaN 아님)를 모두 갖춘 지역인지 */
export function isValidRegion(region?: Partial<Region>): region is Region {
  if (!region?.address) return false;

  const { latitude, longitude } = region;

  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude !== 0 && longitude !== 0;
}
