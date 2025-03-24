'use client';

import TextInput from '@/components/Input/TextInput';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';

export default function RegisterReviewRestaurant() {
  const router = useRouter();

  return (
    <>
      <CHeader isLogo={true} title="맛셔너리" />

      <CChangeRegion type="activity_area" />

      <div className="px-xl pt-[36px]">
        <h1 className="title2 font-bold">식당을 검색해서 리뷰를 작성해 보세요. ✍️</h1>

        <div className="h-sm" />

        <p className="body2 text-neutral-bg80">설정하신 주소 지역 반경 1km의 식당에 한해 리뷰 작성이 가능해요.</p>

        <div className="h-xxl" />

        <TextInput
          label="식당 검색"
          placeholder="이곳을 눌러 식당을 검색해 보세요."
          readOnly
          onClick={() => router.push('/register-review/restaurant/search')}
        />
      </div>
    </>
  );
}
