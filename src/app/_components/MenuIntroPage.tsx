'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VerticalLogo from '@/assets/logo/vertical_logo.svg';
// import GoogleAdBanner from '@/shared/ui/google-adsense';
import V2LayoutCorners from '@/shared/ui/layout/V2LayoutCorners';

export default function MenuIntroPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-svh w-full justify-center bg-neutral-bg05">
      <div className="relative mx-auto flex min-h-svh w-full max-w-500 flex-col overflow-hidden bg-white mobile:max-w-full">
        <div className="pointer-events-none absolute inset-0 z-[50]" aria-hidden>
          <V2LayoutCorners />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/image/MenuIntro/menu_intro_bg.svg"
            alt=""
            className="h-full w-full object-cover object-top"
            fetchPriority="high"
          />
        </div>

        <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center px-24 pt-24">
          <div className="flex w-full max-w-240 flex-1 flex-col items-center justify-center gap-40 pb-24">
            <VerticalLogo width={138} height={100} className="shrink-0" aria-hidden />
            <div className="flex w-full flex-col items-center gap-24">
              <h1 className="text-center text-16 font-normal leading-none !text-neutral-bg90">
                오늘의 메뉴를 펼칠 시간입니다.
              </h1>
              <button
                type="button"
                onClick={() => router.push('/explore')}
                className="default-btn h-48 w-240 max-w-full bg-primary-y70 px-16 py-5 text-14 leading-[1.6] !text-white"
              >
                시작하기
              </button>
            </div>
          </div>
        </main>

        <footer className="relative z-10 mt-auto flex w-full flex-col items-center gap-16 px-24 pb-24 pt-8">
          {/* <GoogleAdBanner
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID ?? ''}
            className="w-full max-w-320"
            style={{ minHeight: '50px' }}
          /> */}
          <div className="flex items-center gap-12 text-12 leading-none">
            <span className="!text-neutral-bg70">tastetionary © 2026</span>
            <span className="h-8 w-1 shrink-0 bg-neutral-bg20" aria-hidden />
            <Link
              href="mailto:tastetionary@gmail.com"
              className="cursor-pointer !text-neutral-bg70 underline-offset-2 hover:underline"
            >
              문의하기
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
