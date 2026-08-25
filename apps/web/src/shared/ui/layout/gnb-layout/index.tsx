import GNB from '@/shared/ui/GNB';

interface Props {
  children: React.ReactNode;
}

export default function GNBLayout({ children }: Props) {
  return (
    <div className="pb-60">
      {children}

      <GNB />
    </div>
  );
}
