interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh w-full justify-center bg-neutral-bg05">
      <div className="mx-auto my-0 w-full max-w-360 bg-white pt-56 mobile:max-w-full">{children}</div>
    </div>
  );
}
