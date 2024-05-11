import ISBACK_BTN from '@/assets/logo/back_btn.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import { cn } from '@/utils/styles.utils';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

interface Props {
  isLogo?: boolean;
  isBackBtn?: boolean;
  title: string;
}

export default function CHeader({ isLogo = false, isBackBtn = false, title }: Props) {
  const router = useRouter();

  const backBtnState = isBackBtn ? 'isBackBtn' : 'default';
  const titleState = isLogo ? 'isLogo' : 'default';

  return (
    <div className="fixed top-44 z-1 h-56 w-360 bg-white mobile:w-full">
      <div className="relative flex h-full items-center justify-center">
        <div className={cn(S.backBtnVariants({ cursor: backBtnState }))}>
          {isBackBtn && <ISBACK_BTN onClick={() => router.back()} />}
        </div>
        <div
          className={cn(S.titleVariants({ cursor: titleState }))}
          onClick={() => {
            if (isLogo) {
              router.push('/');
            }
          }}
        >
          {isLogo && <MAIN_LOGO />}
          <p className="ml-8">{title}</p>
        </div>
      </div>
    </div>
  );
}
