'use client';

import { useRouter } from 'next/navigation';
import CMypageItem from '@/features/user/components/c-mypage-items';
import CHeader from '@/shared/ui/c-header';

export default function MyPageUserManageInfo() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="개인정보 관리" />
      <CMypageItem title="닉네임 수정" onClick={() => push('/mypage/user/manage-info/nickname')} />
      <CMypageItem title="비밀번호 재설정" onClick={() => push('/mypage/user/manage-info/password')} />
      <CMypageItem title="지역 변경" onClick={() => push('/select-restaurant/region-setting?onNextPage=home')} />
      <CMypageItem title="회원 탈퇴" onClick={() => push('/mypage/user/manage-info/exit')} />
    </>
  );
}
