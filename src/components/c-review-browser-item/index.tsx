export default function CReviewBrowserItem() {
  return (
    <div className="w-full border-solid border-neutral-bg20 px-20 py-16 [&:not(:last-child)]:border-b-1">
      <div className="flex items-center gap-6">
        <span className="!font-pretendard text-14 font-bold leading-[22.4px]">봉피양 방이점 본관</span>
        <span className="!font-pretendard text-12 leading-[19.2px] text-neutral-bg40">한식</span>
      </div>
      <div className="!font-pretendard text-12 leading-[19.2px]">서울 관악구 은천로24길 25(봉천동)</div>

      <div className="mt-5 !font-pretendard text-12 leading-[12px]  text-neutral-bg30">
        재방문 의사율 ##% | 평균 ###원 | 리뷰 ##개
      </div>

      <div className="mt-10 flex w-full gap-10">
        <div className="h-116 w-full bg-[#d9d9d9]" />
        <div className="h-116 w-full bg-[#d9d9d9]" />
      </div>
    </div>
  );
}
