import IC_PIN2 from '@/assets/common/Pin2.svg';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  value?: string;
  link?: {
    text: string;
    route: string;
  };
  children: ReactNode;
}

export default function CSelectSection({ title, subtitle, value, link, children }: Props) {
  const router = useRouter();

  return (
    <section className="mb-48 mt-20 w-full px-16">
      <div className="mb-20 flex w-full items-center justify-between py-8">
        <div className="flex items-center gap-8">
          <IC_PIN2 />
          <div className="text-16 font-bold">{title}</div>
          {subtitle && <span className="text-12 font-normal text-neutral-bg30">{subtitle}</span>}
        </div>

        {value && <span className="text-right text-primary-y70">{value}</span>}
        {link && (
          <span
            className="cursor-pointer text-12 font-normal text-neutral-bg60"
            onClick={() => router.push(link.route)}
          >
            {link?.text}
          </span>
        )}
      </div>

      {children}
    </section>
  );
}
