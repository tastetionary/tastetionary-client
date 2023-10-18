'use client';

import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { ChangeEvent, useState } from 'react';
import useConfirmAuthCodeMutate from '../../hooks/query/useConfirmAuthCodeMutate';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
  type: 'register';
  companyEmailAuthId: number;
}

export default function VerifyNumber({ onNext, type, companyEmailAuthId }: Props) {
  const [authNumber, setAuthNumber] = useState('');

  const { mutate: confirmAuthCodeMutate } = useConfirmAuthCodeMutate({ onNext, type });

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const onConfirmAuthCode = () => {
    confirmAuthCodeMutate({ historyId: companyEmailAuthId, code: authNumber });
  };

  return (
    <>
      <CHeader title="인증코드 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>
          입력하신 회사 이메일 주소로
          <br />
          인증코드를 발송했어요.
        </S.Title>
        <S.SubTitle>
          1시간 안에 이메일로 발송된
          <br />
          인증코드를 입력해주세요.
        </S.SubTitle>

        <S.InputContainer>
          <TextInput
            label="인증코드 6자리"
            placeholder="인증코드 6자리 숫자 입력"
            type="text"
            maxLength={6}
            onChange={handleChangeAuthNumber}
          />
        </S.InputContainer>

        <S.SubButtonContainer>
          <span>인증메일을 받지 못하셨나요?</span>

          <S.SubButton type="button">메일 재전송</S.SubButton>
        </S.SubButtonContainer>

        <MainButton
          btnText="다음"
          disabled={authNumber.length === 0 || false}
          onClick={onConfirmAuthCode}
          type="submit"
        />
      </S.Wrapper>
    </>
  );
}
