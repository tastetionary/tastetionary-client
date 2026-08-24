'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import { deleteUser } from '@/shared/api/user/deleteUser';
import { userExitReasonObject } from '@/shared/constants/user-exit';
import useUser from '@/shared/hooks/useUser';
import { WithdrawalTypeEnum } from '@/shared/types/enums';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import CheckBox2 from '@/shared/ui/CheckBox/CheckBox2';

type WithdrawalType = keyof typeof WithdrawalTypeEnum;

export default function MyPageUserExit() {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { token } = useUser();
  const [userDeleteType, setUserDeleteType] = useState<WithdrawalType[]>([]);

  const { mutate: exitUser } = useMutation({
    mutationFn: () => deleteUser({ types: userDeleteType }, token),
    onSuccess: () => {
      Sentry.getCurrentScope().clear();
      setTimeout(() => {
        destroyCookie(null, 'token');
        queryClient.clear();
      }, 100);
      push('/mypage/user/manage-info/exit/success');
    },
  });

  const onReasonClick = (type: WithdrawalType, checked: boolean) => {
    if (checked) {
      setUserDeleteType([...userDeleteType, type]);
    }
    if (!checked) {
      setUserDeleteType(userDeleteType.filter(el => el !== type));
    }
  };

  return (
    <>
      <CHeader title="회원 탈퇴" />

      <div className="mx-8 mt-xl mb-20">
        <header>
          <h1 className="title2 leading-8 font-bold">
            더 나은 맛셔너리를 위해 <br /> 탈퇴 사유를 선택해 주세요. 🥲
          </h1>
          <p className="body2 mt-3 leading-5 text-neutral-bg80">탈퇴 사유는 중복 선택 가능합니다.</p>
        </header>

        <section>
          <div className="mx-0 mt-[40px] mb-[56px]">
            {Object.entries(userExitReasonObject).map(([type, text], i) => (
              <div key={i} className="my-3">
                <CheckBox2
                  bg="orange"
                  label={text}
                  checkBoxId={`reason-${i}`}
                  checked={userDeleteType.includes(type as WithdrawalType)}
                  onChangeEvent={checked => onReasonClick(type as WithdrawalType, checked)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="yellow"
            customStyle="flex w-full py-[12px] px-[16px]"
            disabled={userDeleteType.length === 0}
            onClick={() => exitUser()}
          >
            <span className="font-pretendard text-white">회원 탈퇴</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
