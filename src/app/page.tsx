'use client';

import CHeader from '@/components/c-header';
import CPickerButton from '@/components/c-pickerButton';
import * as S from './page.styled';

export default function Home() {
  return (
    <>
      <CHeader title="맛셔너리" isLogo />
      <S.MainContent>
        <CPickerButton title={'메뉴 고르기'} desc={'오늘은 어떤 음식을 먹을까?'} subject={'menu'} />
        <CPickerButton title={'식당 고르기'} desc={'오늘은 어떤 식당에 가볼까?'} subject={'restaurant'} />
      </S.MainContent>
    </>
  );
}
