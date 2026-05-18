import HomeIcon from '@/assets/logo/home.svg';
import MypageIcon from '@/assets/logo/my-page.svg';
import ReviewIcon from '@/assets/logo/review.svg';
import { usePathname, useRouter } from 'next/navigation';
import CNavButton from '../c-nav-button';
import useReviewClick from '../c-review-broswer-noitem/hooks/useReviewClick';

export default function GNB() {
  const pathName = usePathname();
  const { onReviewClick } = useReviewClick();
  const router = useRouter();

  return (
    <div className="max-w-500 fixed bottom-0 flex w-full mobile:max-w-full [&>button]:flex-grow ">
      <CNavButton title="리뷰" icon={<ReviewIcon />} isActive={false} clickEvent={onReviewClick} />
      <CNavButton title="홈" icon={<HomeIcon />} isActive={pathName === '/'} clickEvent={() => router.push('/')} />
      <CNavButton
        title="마이페이지"
        icon={<MypageIcon />}
        isActive={pathName === '/mypage'}
        clickEvent={() => router.push('/mypage')}
      />
    </div>
  );
}
