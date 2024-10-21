'use client';

import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CReviewBrowserNoItem from '@/components/c-review-broswer-noitem';
import CReviewBrowserItem from '@/components/c-review-browser-item';
import { debounce } from 'es-toolkit';
import { useEffect, useState } from 'react';
import useMapDataQuery, { MapData } from './hooks/useMapDataQuery';

type LatLng = {
  lat: number;
  lng: number;
};

export default function ReviewBrowse() {
  const [center, setCenter] = useState<LatLng>({
    lat: 37.52114898171651,
    lng: 126.9254755390151,
  });

  const [loadComplete, setLoadComplete] = useState(false);
  const { openModal } = useModal();

  const { mapData } = useMapDataQuery({ ...center });

  const modal = (mapData?: MapData[]) => {
    openModal(MODAL_TYPES.bottom, {
      content: (
        <>
          {mapData && mapData?.length > 0 ? (
            mapData?.map((p, i) => <CReviewBrowserItem key={i} title={p.name} address={p.category} />)
          ) : (
            <CReviewBrowserNoItem />
          )}
        </>
      ),
      removeExpandBtn: !mapData || !(mapData?.length > 1),
    });
  };

  const getKakaoMap = (mapDataList: MapData[]) => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng), // 지도의 중심좌표
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 지도가 이동할때마다 해당 좌표값을 가져오는 코드!
    window.kakao.maps.event.addListener(
      map,
      'bounds_changed',
      debounce(() => {
        const center = map.getCenter();
        setCenter({
          lat: center.Ma,
          lng: center.La,
        });
      }, 500)
    );

    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    var bounds = new kakao.maps.LatLngBounds(); // 추가한 코드

    const coordMap: { [key: string]: MapData[] } = {};

    mapDataList?.forEach(mapData => {
      const coords = new window.kakao.maps.LatLng(mapData.latitude, mapData.longitude);
      const coordKey = `${mapData.latitude},${mapData.longitude}`;
      if (!coordMap[coordKey]) {
        coordMap[coordKey] = [];
      }

      coordMap[coordKey].push(mapData); // 동일 좌표인 경우 묶기

      var imageSrc = '/image/Map/map.svg', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(32, 32), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(14, 32) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
        image: markerImage,
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, 'click', () => modal(coordMap[coordKey])); // 마커 클릭 이벤트 추가

      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(coords); //추가한 코드, 현재 코드에서 좌표정보는 point[i]가 아닌 coords이다.
    });
  };

  useEffect(() => {
    if (loadComplete) {
      if (mapData) {
        getKakaoMap(mapData.data);
      }
    }
  }, [loadComplete, mapData]);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
        setLoadComplete(true);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <>
      <CHeader title="리뷰 둘러보기" isBackBtn />

      <div id="map" className="h-[calc(100%-267px)] w-full" />
    </>
  );
}
