import mapRepository from '@/apis/restaurant/review/map';
import { useQuery } from '@tanstack/react-query';

type LatLng = {
  lat: number;
  lng: number;
};

export type MapData = {
  aggregateReviews: {
    avgPrice: number;
    revisitRatio: number;
    totalCount: number;
  };
  category: string;
  distance: number;
  latitude: number;
  longitude: number;
  name: string;
  restaurantId: string;
};

const useMapDataQuery = ({ lat, lng }: LatLng) => {
  const { data } = useQuery<{
    data: MapData[];
  }>(['map', lat, lng], () => mapRepository().getMapList({ lat, lng }));

  return { mapData: data };
};

export default useMapDataQuery;
