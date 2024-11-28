interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh w-full justify-center bg-neutral-bg05">
      <div className="max-w-500 mx-auto my-0 w-full bg-white pt-56 mobile:max-w-full">{children}</div>
    </div>
  );
}
