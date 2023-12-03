'use client';

import { CheckboxContainer, Divider } from '@/app/sign-up/components/terms/page.styled';
import MainButton from '@/components/Button/MainButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

export default function MyPageUserExit() {
  const { push } = useRouter();

  const reasonList = [
    '사용이 불편해요.',
    '더 이상 서비스를 이용하지 않아요.',
    '사용 빈도가 낮아요.',
    '더 마음에 드는 서비스를 찾았어요.',
    '컨텐츠의 신뢰도가 떨어져요.',
    '개인정보를 삭제하고 싶어요.',
  ];

  const defaultReasonState = reasonList.reduce(
    (acc, _, index) => ({
      ...acc,
      [index]: false,
    }),
    {}
  );

  const [reason, setReason] = useState<{ [key: string]: boolean }>(defaultReasonState);

  const onReasonClick = (i: number, checked: boolean) => {
    setReason({
      ...defaultReasonState,
      [i]: checked,
    });
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
          {reasonList?.map((r, i) => (
            <S.ReasonItem key={i}>
              <Divider isActive={reason[i]}></Divider>
              <CheckboxContainer isActive={reason[i]}>
                <S.ReasonCheckBoxContainer>
                  <S.ReasonCheckBox
                    id={`reason-${i}`}
                    checked={reason[i]}
                    onChange={({ target: { checked } }) => onReasonClick(i, checked)}
                  />
                  <S.ReasonLabel htmlFor={`reason-${i}`}>{r}</S.ReasonLabel>
                </S.ReasonCheckBoxContainer>
              </CheckboxContainer>
            </S.ReasonItem>
          ))}
        </S.ReasonList>

        <MainButton
          btnText="탈퇴하기"
          disabled={!(Object.values(reason).filter((r: boolean) => r === true)?.length > 0)}
          onClick={() => push('/mypage/user/manage-info/exit/success')}
        />
      </S.Container>
    </>
  );
}
