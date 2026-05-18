import MainButton from '../Button/MainButton';
import useReviewClick from './hooks/useReviewClick';

export default function CReviewBrowserNoItem() {
  const { onReviewClick } = useReviewClick();

  return (
    <div className="flex flex-col items-center p-20">
      <div className="text-16 font-bold leading-[24px]">근처에 리뷰가 등록된 식당이 없어요!</div>

      <div className="mt-10 text-center text-14 leading-[23.8px] text-neutral-bg40">
        지도를 움직여 다른 곳의 식당을 찾거나, 새로운 리뷰를 등록해 주세요.
      </div>

      <MainButton btnText="리뷰 쓰기" style={{ marginTop: 14 }} onClick={onReviewClick} />
    </div>
  );
}
