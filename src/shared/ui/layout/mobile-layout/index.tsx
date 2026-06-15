import V2LayoutCorners from '@/shared/ui/layout/V2LayoutCorners';

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh w-full justify-center bg-neutral-bg05">
      <div className="relative mx-auto my-0 w-full max-w-500 bg-white pt-56 mobile:max-w-full">
        <div className="pointer-events-none absolute inset-0 z-[50]" aria-hidden>
          <V2LayoutCorners />
        </div>
        {/* 프레임(V2LayoutCorners) 안쪽 가장자리(컨테이너 edge로부터 8px)에 맞춰 컨텐츠를 inset → 배너 등 full-bleed 요소가 테두리 밖으로 벗어나지 않도록 */}
        <div className="relative z-[1] min-h-0 w-full px-[8px]">{children}</div>
      </div>
    </div>
  );
}
