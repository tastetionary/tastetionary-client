import IC_DISLIKE from '@/assets/common/Icons/dislike.svg';
import IC_LIKE from '@/assets/common/Icons/like.svg';
import IC_REPORT from '@/assets/common/Icons/report.svg';
import DefaultButton from '@/components/Button/DefaultButton';

export default function ReviewItem() {
  return (
    <div className="flex w-full flex-col gap-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="body2 font-bold">닉네임</span>

          <div className="body3 mt-xxs text-neutral-bg60">작성 리뷰 0개 | 0000.00.00</div>
        </div>

        <button className="flex cursor-pointer items-center justify-center px-10 py-10">
          <IC_REPORT />
        </button>
      </div>

      <p className="body2">
        리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용
        리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용
      </p>

      <div className="flex- flex-g flex flex-wrap gap-xxs">
        <DefaultButton bgColor="gray" customStyle="py-2 px-8">
          <span className="body4">키워드</span>
        </DefaultButton>
        <DefaultButton bgColor="gray" customStyle="py-2 px-8">
          <span className="body4">키워드</span>
        </DefaultButton>
        <DefaultButton bgColor="gray" customStyle="py-2 px-8">
          <span className="body4">키워드</span>
        </DefaultButton>
      </div>

      <div className="flex w-full gap-xxs">
        <DefaultButton bgColor="gray" customStyle="py-12 flex gap-xs flex-grow">
          <IC_LIKE />
          <span className="body2">도옴이 돼요</span>
        </DefaultButton>

        <DefaultButton bgColor="gray" customStyle="py-12 flex gap-xs flex-grow">
          <IC_DISLIKE />
          <span className="body2">도옴 안 돼요</span>
        </DefaultButton>
      </div>
    </div>
  );
}
