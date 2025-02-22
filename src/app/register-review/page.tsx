'use client';

import { postRestarantReview } from '@/apis/restaurant/review';
import { getRestaurantReviewOption } from '@/apis/restaurant/review/option';
import ARROW_RIGHT from '@/assets/common/Icons/arrow_right.svg';
import IC_MAP from '@/assets/common/map.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import TextArea from '@/components/Input/TextArea';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import useUser from '@/hooks/useUser';
import { useReviewPlaceInfoStore } from '@/store/useReviewPlaceInfoStore';
import { useReviewStore } from '@/store/useReviewStore';
import { theme } from '@/styles/theme';
import { getByte, getLimitedByteText } from '@/utils';
import { RestaurantCategory, RestaurantKeyword } from '@taehoya/tastetionary/lib/domain/restaurant/restaurant.enum';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectSection from '../select-menu/components/SelectSection';
import SelectPrice from '../select-restaurant/components/SelectPrice';
import * as S from './page.styled';

interface FormValue {
  review: string;
}

export default function RegisterReview() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { token } = useUser();
  const { data } = useQuery({
    queryKey: ['restaurant-review-option'],
    queryFn: () => getRestaurantReviewOption(),
    staleTime: 0,
  });

  const { resetReviewState, category: reviewCategory, keyword: reviewKeyword, prices: reviewPrice } = useReviewStore();
  const { resetReviewPlaceInfo, id, latitude, longitude, placeName, place_url, address } = useReviewPlaceInfoStore();
  const [revisit, setRevisit] = useState<null | boolean>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const { mutate: registerReview, isSuccess } = useMutation({
    mutationFn: (summary: string) =>
      postRestarantReview(
        {
          review: {
            category: reviewCategory[0] as RestaurantCategory,
            keywords: reviewKeyword as RestaurantKeyword[],
            prices: reviewPrice,
            summary,
            opinion: revisit === true ? 'Y' : 'N',
          },
          external: {
            externalUUID: +id,
            name: placeName,
            latitude: +latitude,
            longitude: +longitude,
            ...(place_url
              ? {
                  referenceLink: place_url,
                }
              : {}),
          },
        },
        token
      ),
    onSuccess: () => {
      const clickEvent = () => {
        resetReviewState();
        resetReviewPlaceInfo();
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
  });

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    registerReview(data?.review);
  };

  useEffect(() => {
    if (id === '' && !isSuccess) {
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
  }, [id, isSuccess]);

  return (
    <>
      <CHeader title="식당 리뷰 작성" isBackBtn />

      <S.TitleSection>
        <S.RestaurantName>{placeName ?? ''}</S.RestaurantName>
      </S.TitleSection>

      <S.AddressSection>
        <IC_MAP width={12} height={12} />

        <S.Address>{address ?? ''}</S.Address>
      </S.AddressSection>

      <form className="w-full px-xl" id="register-review-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <SelectSection title={{ bold: '음식 종류', normal: '를 선택하세요.' }} subtitle="여러 개 선택 가능합니다.">
          <CSelectCategory data={data?.categories} selectType="review" isDuplicate={true} />
        </SelectSection>

        <SelectSection title={{ bold: '키워드', normal: '를 선택하세요.' }} subtitle="여러 개 선택 가능합니다.">
          <CSelectKeyword data={data?.keywords} selectType="review" />
        </SelectSection>

        <SelectSection title={{ bold: '가격대', normal: '를 선택하세요.' }}>
          <SelectPrice type={'review'} />
        </SelectSection>

        <SelectSection title={{ bold: '한 줄 리뷰', normal: '를 작성해 주세요. (선택)' }}>
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

          <div className="mt-sm flex items-center justify-between">
            <span className="body2 text-neutral-bg80">리뷰 작성 시 유의사항</span>
            <ARROW_RIGHT width={16} height={16} color={theme.colors.neutral.bg40} />
          </div>
        </SelectSection>

        <SelectSection title={{ bold: '재방문 의사', normal: '를 선택해 주세요.' }}>
          <div className="flex w-full items-center gap-md">
            <DefaultButton
              bgColor="gray"
              type="button"
              customStyle={'py-15 flex gap-xs flex-grow' + (revisit === true ? ' selected' : '')}
              onClick={() => setRevisit(true)}
            >
              있음
            </DefaultButton>
            <DefaultButton
              bgColor="gray"
              type="button"
              customStyle={'py-15 flex gap-xs flex-grow' + (revisit === false ? ' selected' : '')}
              onClick={() => setRevisit(false)}
            >
              없음
            </DefaultButton>
          </div>
        </SelectSection>

        <div className="h-[150px] w-full" />

        <BottomButtonContainer>
          <DefaultButton
            bgColor="yellow"
            disabled={revisit === null || reviewCategory?.length === 0 || reviewKeyword?.length === 0}
            customStyle="flex-grow py-12"
          >
            <span className="body1 text-white">리뷰 등록하기</span>
          </DefaultButton>
        </BottomButtonContainer>
      </form>
    </>
  );
}
