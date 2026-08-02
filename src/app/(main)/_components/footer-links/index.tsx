'use client';

import { useRouter } from 'next/navigation';

export default function FooterLinks() {
  const router = useRouter();
  const footerLinks = [
    {
      text: '서비스 이용약관',
      link: '/sign-up?step=terms-of-service',
    },
    {
      text: '개인정보처리방침',
      link: '/sign-up?step=privacy-notice',
    },
    {
      text: '공지사항',
      link: 'https://tastetionary.notion.site/03ebf00931f44926b889e085cabbd02c?v=5c1337997b384b15a63e6d89a3708ed9&pvs=74',
    },
    {
      text: 'Q&A',
      link: '/ready',
    },
    {
      text: '의견 보내기',
      link: 'mailto:tastetionary@gmail.com',
    },
  ];

  return (
    <>
      {/* 링크 항목이 5개라 한 줄 폭이 빠듯함 → 항목 내부 줄바꿈(whitespace-nowrap)은 막고, 좁은 화면에서는 항목 단위로 flex-wrap */}
      <div className="flex cursor-pointer flex-wrap justify-center gap-y-4 px-16 pt-32">
        {footerLinks.map(({ text, link }, index, array) => (
          <span
            key={text}
            className={`body2 whitespace-nowrap ${
              index !== array.length - 1
                ? "[&:not(:last-child)]:after:-align-[1px] [&:not(:last-child)]:after:mx-[8px] [&:not(:last-child)]:after:inline-block [&:not(:last-child)]:after:h-[10px] [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:bg-neutral-bg10 [&:not(:last-child)]:after:content-['']"
                : ''
            }`}
            onClick={() => router.push(link)}
          >
            {text}
          </span>
        ))}
      </div>
      <p className="body3 pb-32 pt-8 text-center text-neutral-bg30">Copyright © Tastetionary All rights reserved.</p>
    </>
  );
}
