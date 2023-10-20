'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useEffect, useRef, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  region: string;
}

interface Props {
  onNext: () => void;
}

export default function RegionSetting({ onNext }: Props) {
  const { setValue } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState('');
  const [openPostCode, setOpenPostCode] = useState(false);

  const completeHandler = (data: any) => {
    setOpenPostCode(false);
    console.log(data);
    setAddress(data?.address);
  };

  useEffect(() => {
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

    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (address?.length > 0) {
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(address, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              setValue('areas[0].latitude', coords.La);
              setValue('areas[0].longitude', coords.Ma);
              setValue('areas[0].address', address);

              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              marker.setMap(map);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        }
      });
    };

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [address]);

  return (
    <>
      <CHeader title="식사 지역 설정" isBackBtn />

      <S.Wrapper>
        <S.Title>
          식사 지역 설정을 하면
          <br />
          식당을 추천받을 수 있어요.
        </S.Title>

        <S.SubTitle>회사 주소를 자세히 설정하면 근처의 식당을 구체적으로 추천해드릴 수 있어요.</S.SubTitle>

        <S.Form>
          {!openPostCode && (
            <TextInput
              label="식사 지역 검색"
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

          <S.MapContainer>
            <div id="map" ref={mapRef} style={{ width: address?.length > 0 ? '100%' : 0, height: '100%' }}></div>
          </S.MapContainer>

          <S.ButtonContainer>
            <MainButton btnText="다음" disabled={address === ''} type="button" onClick={onNext} />
          </S.ButtonContainer>
        </S.Form>
      </S.Wrapper>
    </>
  );
}
