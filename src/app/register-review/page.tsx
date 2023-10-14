'use client';

import { getRestaurantOption } from '@/apis/restaurant/option';
import IC_MAP from '@/assets/common/map.svg';
import MainButton from '@/components/Button/MainButton';
import TextArea from '@/components/Input/TextArea';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { reviewPlaceInfoState, reviewState } from '@/lib/atom';
import { getByte, getLimitedByteText } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import * as S from './page.styled';

interface FormValue {
  review: string;
}

export default function RegisterReview({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data } = useQuery(['restaurant-option'], () => getRestaurantOption(), {
    cacheTime: 0,
    staleTime: 0,
  });

  const reviewValue = useRecoilValue(reviewState);
  const reviewPlaceInfoValue = useRecoilValue(reviewPlaceInfoState);
  const [revisit, setRevisit] = useState<null | boolean>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    console.log(data?.review);
  };

  return (
    <>
      <CHeader title="식당 리뷰 작성" isBackBtn />

      <S.TitleSection>
        <S.RestaurantName>{reviewPlaceInfoValue?.placeName ?? '롤링파스타 종로점'}</S.RestaurantName>
      </S.TitleSection>

      <S.AddressSection>
        <IC_MAP width={12} height={12} />

        <S.Address>{reviewPlaceInfoValue?.address ?? '서울 종로구 삼일대로 392'}</S.Address>
      </S.AddressSection>

      <S.Form id="register-review-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <CSelectSection title="음식 종류" subtitle="(복수 선택 가능)">
          <CSelectCategory data={data?.categories} selectType="restaurant" />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="restaurant" />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider markData={data?.prices ?? []} type="review" />
        </CSelectSection>

        <CSelectSection
          title="한 줄 리뷰"
          subtitle="(선택)"
          link={{
            text: '리뷰 작성 시 유의사항 >',
            route: '/register-review/caution',
          }}
        >
          <TextArea
            {...register('review', {
              onChange: e => {
                const byte = getByte(e.target.value);

                if (byte <= 100) {
                  setValue('review', e.target.value);
                } else {
                  setValue('review', getLimitedByteText(e.target.value, 100));
                }
              },
            })}
            placeholder={`좋은 표현을 사용하여 작성해 주세요.\n좋은 정보가 있다면 함께 남겨 주세요.`}
          />

          <S.Byte>{getByte(watch('review')) ?? 0} / 100byte</S.Byte>
        </CSelectSection>

        <CSelectSection title="재방문 의사">
          <S.SelectButtonContainer>
            <S.SelectButton type="button" $isSelected={revisit === true} onClick={() => setRevisit(true)}>
              재방문 의사 있음
            </S.SelectButton>
            <S.SelectButton type="button" $isSelected={revisit === false} onClick={() => setRevisit(false)}>
              재방문 의사 없음
            </S.SelectButton>
          </S.SelectButtonContainer>
        </CSelectSection>

        <S.ButtonContainer>
          <MainButton
            btnText="리뷰 등록하기"
            form="register-review-form"
            disabled={revisit === null || reviewValue?.category?.length === 0 || reviewValue?.keyword?.length === 0}
          />
        </S.ButtonContainer>
      </S.Form>
    </>
  );
}
