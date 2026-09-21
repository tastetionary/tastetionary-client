'use client';

import { useEffect, useRef, useState } from 'react';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

export interface RegionArea {
  address: string;
  latitude: number;
  longitude: number;
}

interface Props {
  /** 주소가 좌표로 변환된 뒤에만 호출된다 */
  onNext: (area: RegionArea) => void;
  category?: 'activity_area' | 'dining_area';
  isSubmitting?: boolean;
}

let kakaoMapSdk: Promise<void> | null = null;

/** 카카오 지도 SDK 는 한 번만 붙인다. (예전에는 주소를 바꿀 때마다 script 태그가 하나씩 늘어났다) */
const loadKakaoMapSdk = () => {
  kakaoMapSdk ??= new Promise<void>((resolve, reject) => {
    // 다른 화면에서 이미 붙인 SDK 가 있으면 그대로 쓴다
    if (window.kakao?.maps?.load) return window.kakao.maps.load(() => resolve());

    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&libraries=services&autoload=false`;
    mapScript.addEventListener('load', () => window.kakao.maps.load(() => resolve()));
    mapScript.addEventListener('error', () => {
      kakaoMapSdk = null;
      reject(new Error('kakao map sdk load failed'));
    });
    document.head.appendChild(mapScript);
  });

  return kakaoMapSdk;
};

export default function RegionSetting({ onNext, category = 'dining_area', isSubmitting = false }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState('');
  // 주소를 좌표로 바꾸는 데 성공해야 값이 생긴다. 이 값이 없으면 다음으로 넘어갈 수 없다.
  const [area, setArea] = useState<RegionArea | null>(null);
  const [openPostCode, setOpenPostCode] = useState(false);

  const completeHandler = (data: any) => {
    setOpenPostCode(false);
    setArea(null);
    setAddress(data?.address);
  };

  useEffect(() => {
    if (!address) return;

    let ignore = false;

    loadKakaoMapSdk()
      .then(() => {
        if (ignore || !mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (ignore || status !== window.kakao.maps.services.Status.OK) return;

          // 카카오 LatLng 내부 속성(.Ma/.La)은 SDK 버전에 따라 바뀌므로
          // 지오코더 결과값(y=위도, x=경도)을 직접 숫자로 변환해 사용한다.
          const latitude = Number(result[0].y);
          const longitude = Number(result[0].x);
          const coords = new window.kakao.maps.LatLng(latitude, longitude);

          const marker = new window.kakao.maps.Marker({ position: coords });
          marker.setMap(map);
          map.setCenter(coords);

          setArea({ address, latitude, longitude });
        });
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [address]);

  return (
    <>
      <CHeader title={category === 'activity_area' ? '활동 지역 설정' : '지역 설정'} />

      <div className="relative mt-xl h-full px-xl pb-[120px]">
        <header>
          <h1 className="title2 font-bold">
            지역을 설정하면 <br />
            근처에 있는 식당들을 추천받을 수 있어요. 🍽️
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            주소를 자세히 설정하면 근처의 식당들을 더 구체적으로 추천해드릴 수 있어요.
          </p>
        </header>

        <div className="mt-xl w-full">
          {!openPostCode && (
            <TextInput
              label={category === 'activity_area' ? '활동 지역 검색' : '지역 검색'}
              readOnly={true}
              value={address}
              placeholder="이곳을 눌러 지역을 설정해주세요."
              onClick={() => setOpenPostCode(true)}
            />
          )}

          {openPostCode && (
            <DaumPostcodeEmbed
              onComplete={completeHandler} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: '100',
                height: '100%',
              }}
            />
          )}

          {/* isolate: 카카오 지도 내부의 z-index 가 하단 고정 버튼 위로 올라오지 않게 쌓임 맥락을 가둔다 */}
          <div className="relative isolate mt-lg h-500 w-full">
            <div id="map" ref={mapRef} style={{ width: address?.length > 0 ? '100%' : 0, height: '100%' }}></div>
          </div>
        </div>
      </div>

      {!openPostCode && (
        <BottomButtonContainer>
          <footer className="w-full">
            <DefaultButton
              bgColor="yellow"
              customStyle="flex w-full py-[12px] px-[16px] mt-6"
              disabled={!area || isSubmitting}
              type="button"
              onClick={() => area && onNext(area)}
            >
              <span className="!font-pretendard text-white">다음</span>
            </DefaultButton>
          </footer>
        </BottomButtonContainer>
      )}
    </>
  );
}
