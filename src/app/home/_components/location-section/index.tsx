'use client';

import IC_CHEVRON from '@/assets/common/Icons/chevron.svg';
import IC_POSITION from '@/assets/common/system.svg';
import DefaultButton from '@/components/Button/DefaultButton';

export default function LocationSection() {
  return (
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
  );
}
