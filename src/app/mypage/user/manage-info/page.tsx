'use client';

import CHeader from '@/components/c-header';
import { MenuItem } from '@/components/c-mypage-menu/page.styled';
import { useRouter } from 'next/navigation';

export default function MyPageUserManageInfo() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="개인정보 관리" isBackBtn />

      <MenuItem>비밀번호 변경</MenuItem>
      <MenuItem onClick={() => push('/mypage/verify-company?step=info')}>회사 재인증</MenuItem>
      <MenuItem style={{ border: 'none' }} onClick={() => push('/mypage/user/manage-info/exit')}>
        회원 탈퇴
      </MenuItem>
    </>
  );
}
