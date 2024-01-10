'use client';

import { deleteUser } from '@/apis/user/deleteUser';
import { CheckboxContainer, Divider } from '@/app/sign-up/components/terms/page.styled';
import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { userExitReasonObject } from '@/constants/user-exit';
import useUser from '@/hooks/useUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { WithdrawalTypeEnum } from '@homekeeper89/taste_dict/lib/domain/user/user.enum';
import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

type WithdrawalType = keyof typeof WithdrawalTypeEnum;

export default function MyPageUserExit() {
  const { push } = useRouter();
  const { token } = useUser();
  const [userDeleteType, setUserDeleteType] = useState<WithdrawalType | ''>('');

  const { mutate: exitUser } = useMutation(
    () => deleteUser({ type: WithdrawalTypeEnum[userDeleteType as WithdrawalType] }, token),
    {
      onSuccess: () => {
        queryClient.removeQueries();
        Sentry.configureScope(scope => scope.clear());

        if (typeof window === undefined) return;
        (sessionStorage as Storage).removeItem('token');
        push('/mypage/user/manage-info/exit/success');
      },
    }
  );

  const onReasonClick = (type: WithdrawalType, checked: boolean) => {
    if (checked) {
      setUserDeleteType(type);
    }
    if (!checked) {
      setUserDeleteType('');
    }
  };

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
          {Object.entries(userExitReasonObject).map(([type, text], i) => (
            <S.ReasonItem key={i}>
              <Divider isActive={type === userDeleteType}></Divider>
              <CheckboxContainer isActive={type === userDeleteType}>
                <CheckBox2
                  label={text}
                  checkBoxId={`reason-${i}`}
                  checked={type === userDeleteType}
                  onChangeEvent={checked => onReasonClick(type as WithdrawalType, checked)}
                />
              </CheckboxContainer>
            </S.ReasonItem>
          ))}
        </S.ReasonList>

        <MainButton btnText="탈퇴하기" disabled={userDeleteType === ''} onClick={() => exitUser()} />
      </S.Container>
    </>
  );
}
