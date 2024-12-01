'use client';

import { deleteUser } from '@/apis/user/deleteUser';
import DefaultButton from '@/components/Button/DefaultButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { userExitReasonObject } from '@/constants/user-exit';
import useUser from '@/hooks/useUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import * as Sentry from '@sentry/nextjs';
import { WithdrawalTypeEnum } from '@taehoya/tastetionary/lib/domain/user/user.enum';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

type WithdrawalType = keyof typeof WithdrawalTypeEnum;

export default function MyPageUserExit() {
  const { push } = useRouter();
  const { token } = useUser();
  const [userDeleteType, setUserDeleteType] = useState<WithdrawalType[]>([]);

  const { mutate: exitUser } = useMutation(() => deleteUser({ types: userDeleteType }, token), {
    onSuccess: () => {
      queryClient.removeQueries();
      Sentry.configureScope(scope => scope.clear());

      if (!typeof window || typeof window === 'undefined') return;
      (sessionStorage as Storage).removeItem('token');
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
      <CHeader title="회원 탈퇴" isBackBtn />

      <div className="mx-8 my-20">
        <header>
          <h1 className="title2 font-bold leading-8">
            더 나은 맛셔너리를 위해 <br /> 탈퇴 사유를 선택해 주세요. 🥲
          </h1>
          <p className="body2 mt-3 leading-5 text-neutral-bg80">탈퇴 사유는 중복 선택 가능합니다.</p>
        </header>

        <section>
          <S.ReasonList>
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
          </S.ReasonList>
        </section>
      </div>

      <footer className="fixed bottom-[30px] w-[360px] px-25 pb-10 pt-5 mobile:w-full">
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px]"
          disabled={userDeleteType.length === 0}
          onClick={() => exitUser()}
        >
          <span className="font-pretendard text-white">회원 탈퇴</span>
        </DefaultButton>
      </footer>
    </>
  );
}
