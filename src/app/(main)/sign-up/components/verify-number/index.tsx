'use client';

import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import useConfirmAuthCodeMutate from '../../hooks/query/useConfirmAuthCodeMutate';
import MainButton from '@/shared/ui/Button/MainButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

interface Props {
  onNext: () => void;
  type: 'register';
  companyEmailAuthId: number;
  saveAuthId?: (authenticationId: number) => void;
}

export default function VerifyNumber({ onNext, type, companyEmailAuthId, saveAuthId }: Props) {
  const { getValues } = useFormContext();
  const [authNumber, setAuthNumber] = useState('');

  const { mutate: confirmAuthCodeMutate } = useConfirmAuthCodeMutate({ onNext, type, saveAuthId });

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({
    onNext,
    type: 'retry',
  });

  const companyEmail = getValues('userProperty.companyData.identification');

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const onConfirmAuthCode = () => {
    confirmAuthCodeMutate({ historyId: companyEmailAuthId, code: authNumber });
  };

  const onCompanyEmailAuthRequest = () => {
    accountAuthCodeMutate({
      identification: companyEmail,
      type: 'email',
    });
  };

  return (
    <>
      <CHeader title="인증코드 입력" />

      <div className="relative flex h-full flex-col px-20 pt-20 pb-160">
        <div className="mt-[20px] text-20 leading-[150%] font-bold">
          입력하신 회사 이메일 주소로
          <br />
          인증코드를 발송했어요.
        </div>
        <p className="mt-[15px] text-14 leading-[170%] font-normal text-neutral-bg40">
          1시간 안에 이메일로 발송된
          <br />
          인증코드를 입력해주세요.
        </p>

        <div className="mt-[30px] mb-[115px] w-full [&_div:first-child]:mb-[20px]">
          <TextInput label="이메일 주소" disabled={true} value={companyEmail} />

          <TextInput
            label="인증코드 6자리"
            placeholder="인증코드 6자리 숫자 입력"
            type="text"
            maxLength={6}
            onChange={handleChangeAuthNumber}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 mt-[202px] w-full bg-white px-20 pt-0 pb-40 mobile:fixed">
        <div className="mx-auto mt-0 mb-[22px] flex items-center justify-center gap-[10px] px-32 py-14 [&_span]:text-12 [&_span]:font-normal [&_span]:text-neutral-bg40">
          <span>인증메일을 받지 못하셨나요?</span>

          <button className="p-0 text-12 font-normal underline" type="button" onClick={onCompanyEmailAuthRequest}>
            메일 재전송
          </button>
        </div>

        <MainButton
          btnText="다음"
          disabled={authNumber.length === 0 || false}
          onClick={onConfirmAuthCode}
          type="button"
        />
      </div>
    </>
  );
}
