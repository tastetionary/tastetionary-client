'use client';

import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import { useEffect } from 'react';

export default function ReviewBrowse() {
  const { openModal } = useModal();

  const getKakaoMap = (placeAddress: string) => {
    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (placeAddress?.length > 0) {
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(placeAddress, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
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

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        }
      });
    };

    // DOM을 이용하여 script 태그를 만들어주자.
    const mapScript = document.createElement('script');
    // script.async = true 라면,
    // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미한다.
    mapScript.async = true;
    // script.src에 map을 불러오는 api를 넣어주자.
    // 여기에서 우리가 기존에 발급 받았던 apiKey를 넣어주면 된다.
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&libraries=services&autoload=false`;

    // 이제 우리가 만든 script를 document에 붙여주자.
    document.head.appendChild(mapScript);

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener('load', () => {
      window.kakao.maps.load(onLoadKakaoMap);
    });
  };

  useEffect(() => {
    getKakaoMap('서울 영등포구 의사당대로 83');
  }, []);

  return (
    <>
      <CHeader title="리뷰 둘러보기" isBackBtn />

      <div id="map" className="h-[calc(100%-267px)] w-full" />
    </>
  );
}
