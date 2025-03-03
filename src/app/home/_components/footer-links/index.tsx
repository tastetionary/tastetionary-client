export default function FooterLinks() {
  return (
    <>
      <div className="flex justify-between px-38 pt-32">
        {['서비스 이용약관', '개인정보처리방침', '공지사항', 'Q&A', '의견 보내기'].map((text, index, array) => (
          <span
            key={text}
            className={`body2 ${
              index !== array.length - 1
                ? "[&:not(:last-child)]:after:-align-[1px] [&:not(:last-child)]:after:mx-[10px] [&:not(:last-child)]:after:inline-block [&:not(:last-child)]:after:h-[10px] [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:bg-neutral-bg10 [&:not(:last-child)]:after:content-['']"
                : ''
            }`}
          >
            {text}
          </span>
        ))}
      </div>
      <p className="body3 pb-32 pt-8 text-center text-neutral-bg30">Copyright © Tastetionary All rights reserved.</p>
    </>
  );
}
