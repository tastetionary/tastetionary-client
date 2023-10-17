'use client';

import { getRestaurantOption } from '@/apis/restaurant/option';
import { postRestarantReview } from '@/apis/restaurant/review';
import IC_MAP from '@/assets/common/map.svg';
import MainButton from '@/components/Button/MainButton';
import TextArea from '@/components/Input/TextArea';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { reviewPlaceInfoState, reviewState } from '@/lib/atom';
import { getByte, getLimitedByteText } from '@/utils';
import { RestaurantCategory, RestaurantKeyword } from '@homekeeper89/taste_dict/lib/domain/restaurant/restaurant.enum';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as S from './page.styled';

interface FormValue {
  review: string;
}

export default function RegisterReview() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { data } = useQuery(['restaurant-option'], () => getRestaurantOption(), {
    cacheTime: 0,
    staleTime: 0,
  });

  const [reviewValue, setReviewValue] = useRecoilState(reviewState);
  const [reviewPlaceInfoValue, setReviewPlaceInfoValue] = useRecoilState(reviewPlaceInfoState);
  const [revisit, setRevisit] = useState<null | boolean>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const { mutate: registerReview, isSuccess } = useMutation(
    (summary: string) =>
      postRestarantReview(
        {
          review: {
            category: reviewValue?.category[0] as RestaurantCategory,
            keywords: reviewValue?.keyword as RestaurantKeyword[],
            price: 10000 + 1000 * reviewValue?.price,
            summary,
          },
          external: {
            externalUUID: +reviewPlaceInfoValue?.id,
            name: reviewPlaceInfoValue?.placeName,
            latitude: +reviewPlaceInfoValue?.latitude,
            longitude: +reviewPlaceInfoValue?.longitude,
            ...(reviewPlaceInfoValue?.place_url
              ? {
                  referenceLink: reviewPlaceInfoValue?.place_url,
                }
              : {}),
          },
        },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN
      ),
    {
      onSuccess: () => {
        const clickEvent = () => {
          setReviewValue({
            category: [], // review 데이터 recoil 저장 값 초기화
            keyword: [],
            price: 0,
          });

          setReviewPlaceInfoValue({
            id: '', // review 식당 검색 결과 recoil 저장 값 초기화
            placeName: '',
            address: '',
            latitude: '',
            longitude: '',
          });
        };

        openModal(MODAL_TYPES.dialog, {
          title: '리뷰 등록 완료',
          message: '작성하신 리뷰가 식당 추첨에 반영되었어요!',
          cancelText: '다른 가게 리뷰하기',
          confirmText: '홈으로 가기',
          handleConfirm: () => {
            router.push('/');
            closeModal(MODAL_TYPES.dialog);
            clickEvent();
          },
          handleClose: () => {
            router.push('/register-review/restaurant');
            closeModal(MODAL_TYPES.dialog);
            clickEvent();
          },
        });
      },
    }
  );

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    registerReview(data?.review);
  };

  useEffect(() => {
    if (reviewPlaceInfoValue?.id === '' && !isSuccess) {
      return openModal(MODAL_TYPES.dialog, {
        title: '페이지 이동 오류',
        message: '먼저 식당을 선택한 후 리뷰등록 페이지로 이동해주세요.',
        confirmText: '확인',
        handleConfirm: () => {
          router.push('/register-review/restaurant');
          closeModal(MODAL_TYPES.dialog);
        },
      });
    }
  }, [reviewPlaceInfoValue, isSuccess]);

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
        <CSelectSection title="음식 종류">
          <CSelectCategory data={data?.categories} selectType="review" isDuplicate={false} />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="review" />
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
