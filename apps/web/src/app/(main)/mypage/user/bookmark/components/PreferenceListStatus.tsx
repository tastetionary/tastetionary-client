import { useRouter } from 'next/navigation';
import IMG_ERROR from '@/assets/common/error.svg';
import DefaultButton from '@/shared/ui/Button/DefaultButton';

interface Props {
  isLoggedIn: boolean;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

/**
 * 북마크/추천 제외 식당 목록의 "목록 이전" 상태.
 *
 * 예전에는 쿼리가 꺼져 있거나(로그아웃·사용자 정보 로딩 중) 실패했을 때 data 가 undefined 라
 * 빈 상태도 목록도 그리지 않아 제목만 남은 흰 화면이 됐다. 각 상태를 화면에 드러낸다. (QA #10)
 * 목록이 정상적으로 왔을 때는 null 을 돌려준다.
 */
export function PreferenceListStatus({ isLoggedIn, isPending, isError, onRetry }: Props) {
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <div className="mt-xxxl flex flex-col items-center gap-md px-xl">
        <IMG_ERROR />
        <div className="title2 font-bold">로그인이 필요해요</div>
        <p className="body2 text-neutral-bg60">로그인하면 저장한 식당을 볼 수 있어요.</p>
        <DefaultButton bgColor="yellow" customStyle="mt-xs px-24 py-[12px]" onClick={() => router.push('/login')}>
          <span className="body2 text-white">로그인하기</span>
        </DefaultButton>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-xxxl flex flex-col items-center gap-md px-xl">
        <IMG_ERROR />
        <div className="title2 font-bold">목록을 불러오지 못했어요</div>
        <p className="body2 text-neutral-bg60">잠시 후 다시 시도해주세요.</p>
        <DefaultButton bgColor="gray" customStyle="mt-xs px-24 py-[12px]" onClick={onRetry}>
          <span className="body2">다시 시도</span>
        </DefaultButton>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-[12px] p-[20px]" aria-busy>
        <div className="h-70 w-full rounded-7 bg-neutral-bg05" />
        <div className="h-70 w-full rounded-7 bg-neutral-bg05" />
        <div className="h-70 w-full rounded-7 bg-neutral-bg05" />
      </div>
    );
  }

  return null;
}
