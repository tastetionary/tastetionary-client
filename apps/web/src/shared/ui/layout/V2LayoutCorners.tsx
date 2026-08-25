/** public/image/Layout 코너 + SelectMenuV2 헤더 하단선과 동일한 h-4 bg-neutral-bg90 프레임 */
export default function V2LayoutCorners() {
  return (
    <>
      <div className="absolute top-1 right-4 left-4 h-4 bg-neutral-bg90" />
      <div className="absolute right-4 bottom-1 left-4 h-4 bg-neutral-bg90" />
      <div className="absolute top-4 bottom-4 left-1 w-4 bg-neutral-bg90" />
      <div className="absolute top-4 right-1 bottom-4 w-4 bg-neutral-bg90" />

      <img
        src="/image/Layout/top-left.svg"
        alt=""
        className="absolute top-0 left-0 z-10 m-1 h-8 w-8 shrink-0 select-none"
        width={32}
        height={32}
      />
      <img
        src="/image/Layout/top-right.svg"
        alt=""
        className="absolute top-0 right-0 z-10 m-1 h-8 w-8 shrink-0 select-none"
        width={32}
        height={32}
      />
      <img
        src="/image/Layout/bottom-left.svg"
        alt=""
        className="absolute bottom-0 left-0 z-10 m-1 h-8 w-8 shrink-0 select-none"
        width={32}
        height={32}
      />
      <img
        src="/image/Layout/bottom-right.svg"
        alt=""
        className="absolute right-0 bottom-0 z-10 m-1 h-8 w-8 shrink-0 select-none"
        width={32}
        height={32}
      />
    </>
  );
}
