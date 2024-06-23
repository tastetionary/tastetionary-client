'use client';

import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CReviewBrowserNoItem from '@/components/c-review-broswer-noitem';
import CReviewBrowserItem from '@/components/c-review-browser-item';
import { useEffect } from 'react';

interface IPosition {
  title: string;
  address: string;
}

export default function ReviewBrowse() {
  const { openModal } = useModal();

  const modal = (positions?: IPosition[]) => {
    console.log(positions);

    openModal(MODAL_TYPES.bottom, {
      content: (
        <>
          {positions && positions?.length > 0 ? (
            positions?.map((p, i) => <CReviewBrowserItem key={i} title={p.title} address={p.address} />)
          ) : (
            <CReviewBrowserNoItem />
          )}
        </>
      ),
      removeExpandBtn: !positions || !(positions?.length > 1),
    });
  };

  const getKakaoMap = (positions: IPosition[]) => {
    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를

        const setBounds = () => {
          // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
          // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
          map.setBounds(bounds);
        };

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds(); // 추가한 코드

        const coordMap: { [key: string]: IPosition[] } = {};

        positions?.forEach(position => {
          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(position.address, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const coordKey = `${result[0].y},${result[0].x}`;

              if (!coordMap[coordKey]) {
                coordMap[coordKey] = [];
              }

              coordMap[coordKey].push(position); // 동일 좌표인 경우 묶기

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

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              setBounds(); //추가한 코드
            }
          });
        });
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
    const positions = [
      { title: '포파이브 오투타워점', address: '서울 영등포구 의사당대로 83 오투타워 1층 103호' },
      { title: '진주집', address: '서울 영등포구 국제금융로6길 33 지하 1층' },
      { title: '봉추찜닭 여의도파이낸스타워점', address: '서울 영등포구 국제금융로2길 32 3층' },
      { title: '별미볶음점', address: '서울 영등포구 국제금융로6길 33 여의도백화점 지하 1층' },
      { title: '브루클린더버거조인트 여의도점', address: '서울 영등포구 국제금융로2길 24 1층 2호' },
      { title: '해바라기', address: '서울 영등포구 국제금융로6길 33 맨하탄빌딩 지하1층35-1호 해바라기' },
      { title: '서청미역 여의도점', address: '서울 영등포구 국제금융로2길 32 지하1층 102호' },
      { title: '피그인더가든 여의도점', address: '서울 영등포구 여의대로 56 한화손해보험빌딩 1층' },
      { title: '일일향 여의도점', address: '서울 영등포구 의사당대로 83 오투타워 2층' },
      { title: '하동관 여의도점', address: '서울 영등포구 여의나루로 50 한국교직원공제회관 지하1층 b1-8호' },
    ];

    getKakaoMap(positions);
  }, []);

  return (
    <>
      <CHeader title="리뷰 둘러보기" isBackBtn />

      <div id="map" className="h-[calc(100%-267px)] w-full" />
    </>
  );
}
