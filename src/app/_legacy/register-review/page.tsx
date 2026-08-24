'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectSection from '@/app/(main)/select-menu/components/SelectSection';
import SelectPrice from '@/app/(main)/select-restaurant/components/SelectPrice';
import ARROW_RIGHT from '@/assets/common/Icons/arrow_right.svg';
import IC_MAP from '@/assets/common/map.svg';
import CSelectCategory from '@/features/recommendation/components/c-select-category';
import CSelectKeyword from '@/features/recommendation/components/c-select-keyword';
import { restaurantReviewRepository } from '@/features/reviews/api';
import { getRestaurantReviewOption } from '@/features/reviews/api/option';
import { useReviewPlaceInfoStore } from '@/features/reviews/store/useReviewPlaceInfoStore';
import { useReviewStore } from '@/features/reviews/store/useReviewStore';
import useUser from '@/shared/hooks/useUser';
import { RestaurantCategory, RestaurantKeyword } from '@/shared/types/enums';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import TextArea from '@/shared/ui/Input/TextArea';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/shared/ui/Toast';
import { getByte, getLimitedByteText } from '@/shared/utils';
import { colors } from '@/styles/colors';

interface FormValue {
  review: string;
}

export default function RegisterReview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();
  const { token } = useUser();
  const { data } = useQuery({
    queryKey: ['restaurant-review-option'],
    queryFn: () => getRestaurantReviewOption(),
    staleTime: 0,
  });

  const reviewId = searchParams.get('update');
  const isUpdate = reviewId && !isNaN(+reviewId);

  const { category: reviewCategory, keyword: reviewKeyword, prices: reviewPrice } = useReviewStore();
  const { id, latitude, longitude, placeName, place_url, address } = useReviewPlaceInfoStore();
  const [revisit, setRevisit] = useState<null | boolean>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const { mutate: registerReview, isSuccess } = useMutation({
    mutationFn: (summary: string) =>
      restaurantReviewRepository().postRestaurantReview({
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
          address,
          ...(place_url
            ? {
                referenceLink: place_url,
              }
            : {}),
        },
        token,
      }),
    onSuccess: () => {
      router.push('/register-review/complete');
    },
  });

  const { mutate: updateReview } = useMutation({
    mutationFn: restaurantReviewRepository().updateRestaurantReview,
    onSuccess: () => {
      iconToast('리뷰가 수정되었어요', 'check');
      router.push('/mypage/user/reviews');
    },
  });

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    if (isUpdate) {
      updateReview({
        reviewId: String(reviewId),
        category: reviewCategory[0] as RestaurantCategory,
        keywords: reviewKeyword as RestaurantKeyword[],
        prices: reviewPrice,
        summary: data.review,
        opinion: revisit === true ? 'Y' : 'N',
        token,
      });
    } else {
      registerReview(data?.review);
    }
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
      <CHeader title={isUpdate ? '식당 리뷰 수정' : '식당 리뷰 작성'} />

      <section className="w-full px-20 pt-20 pb-4">
        <div className="text-20 leading-[36px] font-bold">{placeName ?? ''}</div>
      </section>

      <section className="flex w-full items-center gap-[4px] bg-neutral-bg05 px-20 py-13">
        <IC_MAP width={12} height={12} />

        <span className="text-12 leading-[120%] font-normal text-neutral-bg40">{address ?? ''}</span>
      </section>

      <form className="w-full" id="register-review-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="px-xl">
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

            <div className="mt-[10px] w-full text-right text-12 leading-[100%] font-normal text-neutral-bg40">
              {getByte(watch('review')) ?? 0} / 100byte
            </div>

            <div className="mt-sm flex items-center justify-between">
              <span className="body2 text-neutral-bg80">리뷰 작성 시 유의사항</span>
              <ARROW_RIGHT width={16} height={16} color={colors.neutral.bg40} />
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
        </div>

        <div className="h-[150px] w-full" />

        <BottomButtonContainer>
          <DefaultButton
            bgColor="yellow"
            disabled={revisit === null || reviewCategory?.length === 0 || reviewKeyword?.length === 0}
            customStyle="flex-grow py-12"
          >
            <span className="body1 text-white">{isUpdate ? '리뷰 수정하기' : '리뷰 등록하기'}</span>
          </DefaultButton>
        </BottomButtonContainer>
      </form>
    </>
  );
}
