import V2LayoutCorners from '@/components/layout/V2LayoutCorners';

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
        <div className="relative z-[1] min-h-0 w-full">{children}</div>
      </div>
    </div>
  );
}
