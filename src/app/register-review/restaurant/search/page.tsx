'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { reviewPlaceInfoState } from '@/lib/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import * as S from './page.styled';

interface FormValue {
  name: string;
}

interface ISearchKeyword {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export default function RestaurantSearch() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const setReviewPlaceInfo = useSetRecoilState(reviewPlaceInfoState);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const searchByKeyword = async (keyword: string) => {
    const { data } = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });

    return data;
  };

  const { mutate: getSearchList, data } = useMutation((keyword: string) => searchByKeyword(keyword), {
    cacheTime: 0,
  });

  const onSubmitHandler: SubmitHandler<FormValue> = ({ name }) => {
    getSearchList(name);
  };

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

  return (
    <>
      <CHeader title="식당 검색" isBackBtn />

      <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
        <S.InputContainer>
          <TextInput id="keyword" placeholder="식당 이름 검색" {...register('name', { required: true })} />
        </S.InputContainer>

        <S.SearchButton disabled={!isValid}>검색</S.SearchButton>
      </S.Form>

      <S.PlaceList>
        {data?.documents?.map((d: ISearchKeyword) => {
          const placeAddress = d.road_address_name !== '' ? d.road_address_name : d.address_name;
          const showMap = placeAddress !== '' && placeAddress === address;

          return (
            <S.PlaceListItem
              key={d.id}
              onClick={() => {
                setAddress(placeAddress);
                getKakaoMap(placeAddress);
              }}
            >
              <S.PlaceContainer>
                <div>
                  <S.FlexBox>
                    <S.PlaceName>{d.place_name}</S.PlaceName>
                    <S.Distance>{d?.distance}</S.Distance>
                  </S.FlexBox>

                  <S.PlaceAddress>{d.road_address_name}</S.PlaceAddress>

                  <S.RoadAddressFlexBox>
                    <S.RoadAddressTag>지번</S.RoadAddressTag>

                    <S.RoadAddress>{d?.address_name}</S.RoadAddress>
                  </S.RoadAddressFlexBox>

                  <S.Phone as="a" href={`tel:${d?.phone}`}>
                    {d?.phone}
                  </S.Phone>
                </div>
              </S.PlaceContainer>

              {placeAddress !== '' && placeAddress === address && (
                <>
                  <S.MapContainer>
                    <div id="map" style={{ width: placeAddress?.length > 0 ? '100%' : 0, height: '100%' }}></div>
                  </S.MapContainer>

                  <MainButton
                    btnText="식당 선택"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setReviewPlaceInfo({
                        address: placeAddress,
                        id: d?.id,
                        latitude: d?.y,
                        longitude: d?.x,
                        placeName: d?.place_name,
                        place_url: d?.place_url,
                      });
                      return router.push(`/register-review`, {
                        scroll: true,
                      });
                    }}
                  />
                </>
              )}
            </S.PlaceListItem>
          );
        })}
      </S.PlaceList>
    </>
  );
}
