import useAccountAuthCodeMutate from '@/app/_legacy/sign-up/hooks/query/useAccountAuthCodeMutate';
import useConfirmAuthCodeMutate from '@/app/_legacy/sign-up/hooks/query/useConfirmAuthCodeMutate';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
// import Header from '@/components/Header';
import TextInput from '@/components/Input/TextInput';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  onNext: () => void;
  type: 'register' | 'find-password';
  emailAuthId: number;
  setEmailAuthId?: (value: number) => void;
  saveAuthId?: (authenticationId: number) => void;
}

export default function VerifyAuthNumber({ onNext, type, setEmailAuthId, emailAuthId, saveAuthId }: Props) {
  const { getValues } = useFormContext();
  const [authNumber, setAuthNumber] = useState('');

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({
    onNext,
    setEmailAuthId,
    type: 'retry',
  });
  const { mutate: confirmAuthCodeMutate } = useConfirmAuthCodeMutate({ onNext, type, saveAuthId });

  const accountEmail = getValues('account.identification');

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const onConfirmAuthCode = () => {
    confirmAuthCodeMutate({ historyId: emailAuthId, code: authNumber });
  };

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({ identification: accountEmail, type: 'email', category: 'account' });
  };

  return (
    <>
      <CHeader title={type === 'find-password' ? '비밀번호 재설정' : '회원가입'} />

      <div className="mx-8 mt-xl">
        <header>
          <h1 className="title2 font-bold">
            1시간 이내로 이메일로 발송된 <br />
            인증 코드를 입력해 주세요. 🔒
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            인증 코드를 받지 못하신 경우, 스팸메일함을 확인하거나 <br />
            하단의 재전송 버튼을 통해 인증 코드를 다시 받으세요.
          </p>
        </header>
        <section className="mt-12">
          <TextInput type="text" label="이메일 주소" disabled={true} value={accountEmail} />
          <div className="mt-4">
            <TextInput
              type="text"
              label="인증 코드"
              placeholder="6자리 숫자입력"
              maxLength={6}
              onChange={handleChangeAuthNumber}
              value={authNumber}
            />
          </div>
        </section>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <div className="flex justify-center gap-2">
            <p className="!font-pretendard text-sm text-neutral-bg80">인증 코드를 받지 못하셨나요?</p>
            <DefaultButton bgColor="gray" customStyle="px-[12px] py-[4px]" onClick={onEmailAuthRequest}>
              <span className="!font-pretendard">메일 재전송</span>
            </DefaultButton>
          </div>
          <DefaultButton
            bgColor="yellow"
            customStyle="flex w-full py-[12px] px-[16px] mt-6"
            disabled={authNumber.length === 0 || false}
            onClick={onConfirmAuthCode}
            type="button"
          >
            <span className="!font-pretendard text-white">다음</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
