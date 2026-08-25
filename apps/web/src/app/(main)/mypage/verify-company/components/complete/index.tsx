'use client';

import { useRouter } from 'next/navigation';
import COMPLETE from '@/assets/logo/complete.svg';
import MainButton from '@/shared/ui/Button/MainButton';
import CHeader from '@/shared/ui/c-header';

export default function VerifyCompanyComplete() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="회사 인증 완료" />
      <div className="relative flex h-full flex-col items-center px-0 pt-80 pb-120 text-center">
        <COMPLETE />
        <div className="mt-[20px] text-20 leading-[150%] font-bold">회사 인증이 완료되었습니다.</div>
        <p className="mx-0 mt-[15px] mb-[100px] text-14 leading-[170%] font-normal text-neutral-bg40">
          새로운 회사로 인증이 완료되었습니다.
          <br />
          맛셔너리 서비스를 이용해 보세요.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white px-20 pt-20 pb-40 mobile:fixed">
        <MainButton type="button" btnText="홈 화면으로" onClick={() => push('/explore')} />
      </div>
    </>
  );
}
