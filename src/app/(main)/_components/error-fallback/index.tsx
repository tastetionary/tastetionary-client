'use client';

import DefaultButton from '@/shared/ui/Button/DefaultButton';

export default function ErrorFallback() {
  return (
    <div className="mx-auto my-4 flex w-[300px] flex-col p-4 text-center">
      <p className="title4 font-bold">잠시 후 다시 시도해주세요</p>
      <p className="title3 text-[#546E7A]">요청사항을 처리하는데 실패했습니다.</p>

      <DefaultButton
        bgColor="orange"
        customStyle="flex w-full py-[16px] px-[16px] mt-2"
        onClick={() => window.location.reload()}
      >
        <span className="!font-pretendard text-white">새로고침</span>
      </DefaultButton>
    </div>
  );
}
