'use client';

import { deleteUser } from '@/apis/user/deleteUser';
import { CheckboxContainer, Divider } from '@/app/sign-up/components/terms/page.styled';
import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { userExitReasonList } from '@/constants/user-exit';
import useUser from '@/hooks/useUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { WithdrawalTypeEnum } from '@homekeeper89/taste_dict/lib/domain/user/user.enum';
import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

export default function MyPageUserExit() {
  const { push } = useRouter();
  const { token } = useUser();

  const defaultReasonState = userExitReasonList.reduce(
    (acc, _, index) => ({
      ...acc,
      [index]: false,
    }),
    {}
  );

  const type = Object.values(WithdrawalTypeEnum);

  const [reason, setReason] = useState<{ [key: string]: boolean }>(defaultReasonState);

  const selectedReasonIndex = Object.keys(reason).find(key => reason[key]) as string;

  const { mutate: exitUser } = useMutation(() => deleteUser({ type: type[+selectedReasonIndex] }, token), {
    onSuccess: () => {
      queryClient.removeQueries();
      Sentry.configureScope(scope => scope.clear());

      if (typeof window === undefined) return;
      (sessionStorage as Storage).removeItem('token');
      push('/mypage/user/manage-info/exit/success');
    },
  });

  const onReasonClick = (i: number, checked: boolean) => {
    setReason({
      ...defaultReasonState,
      [i]: checked,
    });
  };

  const exitBtnDisabled = Object.values(reason).filter((r: boolean) => r === true)?.length > 0 ? false : true;

  return (
    <>
      <CHeader title="회원 탈퇴" isBackBtn />

      <S.Container>
        <S.Title>
          더 나은 맛셔너리를 위해
          <br />
          탈퇴 사유를 선택해 주세요.
        </S.Title>

        <S.ReasonList>
          {userExitReasonList?.map((r, i) => (
            <S.ReasonItem key={i}>
              <Divider isActive={reason[i]}></Divider>
              <CheckboxContainer isActive={reason[i]}>
                <CheckBox2
                  label={r}
                  checkBoxId={`reason-${i}`}
                  checked={reason[i]}
                  onChangeEvent={checked => onReasonClick(i, checked)}
                />
              </CheckboxContainer>
            </S.ReasonItem>
          ))}
        </S.ReasonList>

        <MainButton btnText="탈퇴하기" disabled={exitBtnDisabled} onClick={() => exitUser()} />
      </S.Container>
    </>
  );
}
