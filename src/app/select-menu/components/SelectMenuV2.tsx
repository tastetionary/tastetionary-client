'use client';

import { getFoodOption } from '@/apis/food/option';
import ARROW from '@/assets/common/Icons/arrow.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function SelectMenuV2() {
  const router = useRouter();
  const { category, keyword, resetSelectFood } = useSelectFoodStore();

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
    enabled: false,
  });

  const handleBack = () => {
    resetSelectFood();
    router.back();
  };

  return (
    <div className="relative min-h-full bg-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/image/MenuIntro/menu_intro_bg.svg"
          alt=""
          className="h-full min-h-[60vh] w-full object-cover object-top opacity-90"
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-30 mx-auto flex h-56 w-full max-w-500 items-center justify-center bg-white mobile:max-w-full">
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-0 top-0 flex h-56 w-56 items-center justify-center"
          aria-label="뒤로 가기"
        >
          <ARROW width={24} height={24} />
        </button>
        <h1 className="body2 text-center text-16 leading-[1.6] !text-neutral-bg90">메뉴 고르기</h1>
        <div className="absolute bottom-0 left-1 right-1 h-4 bg-neutral-bg90" aria-hidden />
      </header>

      <main className="relative z-10 px-20 pb-[120px] pt-36 bg-white">
        <div className="flex flex-col">
          <h2 className="text-center text-24 font-normal leading-[1.6] !text-neutral-bg90">
            어떤 메뉴를 펼쳐볼까요?
          </h2>

          <section className="flex flex-col mt-10" aria-labelledby="v2-menu-category-heading">
            <p id="v2-menu-category-heading" className="body1 text-center text-14 leading-[1.6] !text-neutral-bg90">
              [ 메뉴 분류 ]
            </p>
            <div className="px-12 mt-4">
              <CSelectCategory data={data?.categories} selectType="food" />
            </div>
          </section>

          <section className="flex flex-col mt-10" aria-labelledby="v2-menu-keyword-heading">
            <p id="v2-menu-keyword-heading" className="body1 text-center text-14 leading-[1.6] !text-neutral-bg90">
              [ 오늘의 키워드 ]
            </p>
            <div className="px-12 mt-4">
              <CSelectKeyword data={data?.keywords} selectType="food" />
            </div>
          </section>
        </div>
      </main>

      <BottomButtonContainer className="z-30">
        <RefreshButton btnText="초기화" onClick={resetSelectFood} disabled={refreshBtnDisabled} />
        <CRecommendButton
          btnText="메뉴 추첨 시작"
          selectType="food"
          disabled={recommendBtnDisabled}
        />
      </BottomButtonContainer>
    </div>
  );
}
