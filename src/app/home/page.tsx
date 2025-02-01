'use client';

import IC_CHEVRON from '@/assets/common/Icons/chevron.svg';
import IC_POSITION from '@/assets/common/system.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';

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
    </>
  );
}
