'use client';

import TextInput from '@/components/Input/TextInput';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

export default function RegisterReviewRestaurant() {
  const router = useRouter();

  return (
    <>
      <CHeader isLogo={true} title="맛셔너리" />

      <CChangeRegion region="논현동" type="activity_area" />

      <S.Container>
        <S.Title>
          식당을 선택한 후 <br />
          리뷰를 작성해 보세요.
        </S.Title>

        <S.SubTitle>활동 지역 반경 1km 이내의 식당에 한해서만 리뷰 작성이 가능해요.</S.SubTitle>

        <TextInput
          label="식당 검색"
          placeholder="이곳을 눌러 식당을 검색해 보세요."
          readOnly
          onClick={() => router.push('/register-review/restaurant/search')}
        />
      </S.Container>
    </>
  );
}
