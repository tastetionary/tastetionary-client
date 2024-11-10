'use client';

import CHeader from '@/components/c-header';
import CMypageItem from '@/components/c-mypage-items';
import { useRouter } from 'next/navigation';

export default function MyPageUserManageInfo() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="개인정보 관리" isBackBtn />
      <CMypageItem title="닉네임 수정" />
      <CMypageItem title="비밀번호 재설정" />
      <CMypageItem title="지역 변경" />
      <CMypageItem title="회원 탈퇴" onClick={() => push('/mypage/user/manage-info/exit')} />
    </>
  );
}
