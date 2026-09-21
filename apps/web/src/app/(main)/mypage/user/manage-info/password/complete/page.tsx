'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useEffect } from 'react';
import COMPLETE from '@/assets/logo/complete.svg';
import authRepository from '@/shared/api/auth';
import useToken from '@/shared/hooks/useToken';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';

export default function UpdatePasswordComplete() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token } = useToken();

  const { mutate: logout } = useMutation({
    mutationFn: authRepository().postLogout,
    onSuccess: () => {
      Sentry.getCurrentScope().clear();

      // 로그인 때 path '/' 로 심은 쿠키라, path 를 맞추지 않으면 현재 URL 경로 기준으로 지워져 실제 쿠키가 남는다
      destroyCookie(null, 'token', { path: '/' });
    },
  });

  useEffect(() => {
    if (token) return;

    queryClient.clear();
    router.push('/login');
  }, [token]);

  return (
    <>
      <CHeader title="비밀번호 재설정" />

      <div className="relative flex h-full flex-col items-center pt-80 pb-[120px] text-center">
        <COMPLETE />
        <div className="title2 mt-5 font-bold">비밀번호 재설정이 완료되었습니다.</div>
        <p className="body2 my-[15px] mb-[100px] text-center text-neutral-bg60">변경된 정보로 다시 로그인해주세요.</p>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="orange"
            customStyle="flex w-full py-[12px] px-[16px]"
            onClick={() => logout({ token: token! })}
          >
            <span className="!font-pretendard text-white">로그인</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
