import { ChangeEvent, useState } from 'react';
import useAccountAuthCodeMutate from '@/app/(main)/sign-up/hooks/query/useAccountAuthCodeMutate';
import useConfirmAuthCodeMutate from '@/app/(main)/sign-up/hooks/query/useConfirmAuthCodeMutate';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
// import Header from '@/shared/ui/Header';
import TextInput from '@/shared/ui/Input/TextInput';

interface Props {
  type: 'register' | 'find-password';
  /** 인증 메일을 보낸 이메일 주소 */
  email: string;
  /** 인증 메일을 보낼 때 받은 id */
  historyId: number;
  /** 메일을 다시 보내면 id 가 새로 발급된다 */
  onResent: (historyId: number) => void;
  /** 회원가입이면 인증이 끝난 authenticationId 가 넘어온다 */
  onNext: (authenticationId?: number) => void;
}

export default function VerifyAuthNumber({ type, email, historyId, onResent, onNext }: Props) {
  const [authNumber, setAuthNumber] = useState('');

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({ onSent: onResent, type: 'retry' });
  const { mutate: confirmAuthCodeMutate, isPending } = useConfirmAuthCodeMutate({ type, onNext });

  const handleChangeAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const onConfirmAuthCode = () => {
    confirmAuthCodeMutate({ historyId, code: authNumber });
  };

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({
      identification: email,
      type: 'email',
      category: type === 'find-password' ? 'password' : 'account',
    });
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
          <TextInput type="text" label="이메일 주소" disabled={true} value={email} />
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
            disabled={authNumber.length === 0 || isPending}
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
