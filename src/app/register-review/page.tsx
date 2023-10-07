'use client';

import IC_MAP from '@/assets/common/map.svg';
import restaurant_set from '@/assets/data/restaurant_set.json';
import MainButton from '@/components/Button/MainButton';
import TextArea from '@/components/Input/TextArea';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { getByte, getLimitedByteText } from '@/utils';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  review: string;
}

export default function RegisterReview() {
  const categoryData = restaurant_set?.category;
  const keywordData = restaurant_set?.keyword;

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [revisit, setRevisit] = useState<null | boolean>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    console.log(selectedCategory, selectedKeyword, price, data?.review, revisit);
  };

  return (
    <>
      <CHeader title="식당 리뷰 작성" isBackBtn />

      <S.TitleSection>
        <S.RestaurantName>롤링파스타 종로점</S.RestaurantName>
      </S.TitleSection>

      <S.AddressSection>
        <IC_MAP width={12} height={12} />

        <S.Address>서울 종로구 삼일대로 392</S.Address>
      </S.AddressSection>

      <S.Form id="register-review-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <CSelectSection title="음식 종류" subtitle="(복수 선택 가능)">
          <CSelectCategory
            data={categoryData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword
            data={keywordData}
            selectedKeyword={selectedKeyword}
            setSelectedKeyword={setSelectedKeyword}
          />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider value={price} changeEvent={value => setPrice(value)} />
        </CSelectSection>

        <CSelectSection title="한 줄 리뷰" subtitle="(선택)">
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
            disabled={revisit === null || selectedCategory?.length === 0 || selectedKeyword?.length === 0}
          />
        </S.ButtonContainer>
      </S.Form>
    </>
  );
}
