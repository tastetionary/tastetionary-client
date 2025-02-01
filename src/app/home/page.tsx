'use client';

import IC_CHEVRON from '@/assets/common/Icons/chevron.svg';
import IC_POSITION from '@/assets/common/system.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import MenuSwiper from './_components/menu-swiper';
import ReviewContent from './_components/review-content';

export default function Home() {
  return (
    <>
      <CHeader title="맛셔너리" noBackBtn isLogo />

      <div className="p-12">
        <div className="flex items-center justify-between rounded border border-solid border-neutral-bg10 bg-neutral-bg05 px-16 py-13">
          <div className="flex items-center gap-2">
            <IC_POSITION width={16} height={16} />
            <p className="body2">지역을 설정하세요.</p>
          </div>
          <div>
            <DefaultButton bgColor="gray" customStyle="flex items-center gap-xxs py-4 pr-12 pl-8">
              <span className="body2">지역 변경</span>

              <IC_CHEVRON width={16} height={16} />
            </DefaultButton>
          </div>
        </div>
      </div>

      <div className="px-32 py-24">
        <p className="title4 font-bold">오늘 뭐 먹지? 🤔</p>
        <p className="body2 pt-12">점심 메뉴가 고민될 때에는 메뉴 고르기, 식당을 찾고 싶을 때에는 식당 고르기</p>

        <div className="flex gap-[14px] pt-24">
          <DefaultButton bgColor="gray" customStyle="flex items-center gap-xxs py-4 pr-12 pl-8 grow h-[98px]">
            <span>메뉴 고르기</span>
          </DefaultButton>

          <DefaultButton bgColor="gray" customStyle="flex items-center gap-xxs py-4 pr-12 pl-8 grow">
            <span>식당 고르기</span>
          </DefaultButton>
        </div>
      </div>

      <div className="h-[500px] w-[500px] bg-neutral-bg05"></div>

      <div className="px-32 pb-24 pt-[48px]">
        <p className="title4 font-bold">오늘 리뷰가 등록된 식당이 있어요 ✍️</p>
        <p className="body2 pt-12">최근 다녀온 식당의 리뷰를 작성해 보세요.</p>

        <div className="pt-24 [&>div:last-child]:border-none">
          <ReviewContent />
          <ReviewContent />
          <ReviewContent />
        </div>

        {/* 호진FIXME: width 고정 px로 선언한 부분 제거 */}
        <div className="mx-auto flex w-[322px] items-center pt-8">
          <CRecommendButton btnText="메뉴 고르기" selectType="food" disabled={false} />
        </div>
      </div>

      <div className="px-32 pt-48">
        <p className="title4 font-bold">오늘 많이 고른 메뉴 🔥</p>
        <p className="body2 pt-12">사람들이 오늘 가장 많이 고른 메뉴를 확인하세요.</p>
      </div>
      <div className="pt-24">
        <MenuSwiper />
      </div>

      <div className="pt-48">
        <div className="flex justify-between px-38 pt-32">
          <span className="body2">서비스 이용약관</span>
          <span className="body2">개인정보처리방침</span>
          <span className="body2">공지사항</span>
          <span className="body2">Q&A</span>
          <span className="body2">의견 보내기</span>
        </div>
        <p className="body3 pt-8 text-center">Copyright © Tastetionary All rights reserved.</p>
      </div>
    </>
  );
}
