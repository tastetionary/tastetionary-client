import IC_PIN2 from '@/assets/common/Pin2.svg';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import * as S from './page.styled';

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
    <S.Section>
      <S.SectionHeader>
        <S.SectionTitleContainer>
          <IC_PIN2 />
          <S.SectionTitle>{title}</S.SectionTitle>
          {subtitle && <S.SectionSubTitle>{subtitle}</S.SectionSubTitle>}
        </S.SectionTitleContainer>

        {value && <S.SectionHeaderValue as={'span'}>{value}</S.SectionHeaderValue>}
        {link && <S.SectionLink onClick={() => router.push(link.route)}>{link?.text}</S.SectionLink>}
      </S.SectionHeader>

      {children}
    </S.Section>
  );
}
