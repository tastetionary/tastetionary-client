import http from '@/apis/http';

type LatLng = {
  lat: number;
  lng: number;
};

const token = sessionStorage?.getItem('token');

const mapRepository = () => {
  return {
    getMapList: async ({ lat, lng }: LatLng) =>
      await http.get(`/apis/v1/restaurant/nearby?latitude=${lat}&longitude=${lng}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export default mapRepository;
