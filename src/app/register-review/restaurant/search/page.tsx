'use client';

import DefaultButton from '@/components/Button/DefaultButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import useUser from '@/hooks/useUser';
import { useReviewPlaceInfoStore } from '@/store/useReviewPlaceInfoStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const { data: userData } = useUser();
  const [address, setAddress] = useState('');
  const { setReviewPlaceInfo } = useReviewPlaceInfoStore();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const longitude = userData?.area?.longitude;
  const latitude = userData?.area?.latitude;

  const searchByKeyword = async (keyword: string) => {
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&x=${longitude}&y=${latitude}&radius=1000`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

    return data;
  };

  const { mutate: getSearchList, data } = useMutation({
    mutationFn: (keyword: string) => searchByKeyword(keyword),
    gcTime: 0,
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

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return Math.round(d * 10) / 10;
  };

  return (
    <>
      <CHeader title="식당 검색" isBackBtn />

      <form className="flex w-full flex-1 items-end gap-xs px-xl pt-xxl" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="w-[calc(100%-65px)]">
          <TextInput
            id="keyword"
            label="식당 검색"
            placeholder="식당 이름을 입력해 주세요"
            {...register('name', { required: true })}
          />
        </div>

        <DefaultButton disabled={!isValid} bgColor="yellow" customStyle="w-57 h-49 !font-pretendard text-white">
          검색
        </DefaultButton>
      </form>

      <ul>
        {data?.documents
          ?.filter((d: ISearchKeyword) => d.category_name?.includes('음식점'))
          ?.map((d: ISearchKeyword) => {
            const placeAddress = d.road_address_name !== '' ? d.road_address_name : d.address_name;

            const distance = getDistance(latitude ?? 0, longitude ?? 0, +d?.y, +d?.x);

            return (
              <li
                className="w-full border-b border-solid border-neutral-bg10 px-xl py-md"
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
                      <S.Distance>{distance ? `${distance}km` : ''}</S.Distance>
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
                    <div className="my-md h-[calc(100vw-64px)] w-full">
                      <div id="map" style={{ width: placeAddress?.length > 0 ? '100%' : 0, height: '100%' }}></div>
                    </div>

                    <DefaultButton
                      bgColor="yellow"
                      customStyle=" w-full h-xxl !font-pretendard text-white"
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
                    >
                      이 식당 리뷰쓰기
                    </DefaultButton>
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
}
