import useAccountAuthCodeMutate from '@/app/sign-up/hooks/query/useAccountAuthCodeMutate';
import useConfirmAuthCodeMutate from '@/app/sign-up/hooks/query/useConfirmAuthCodeMutate';
import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './page.styled';

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
    category: 'account',
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
      <CHeader title="인증코드 입력" isBackBtn />
      <S.Wrapper>
        <S.Title>
          1시간 이내로 이메일로 발송된 <br />
          인증코드를 입력해 주세요.
        </S.Title>
        <S.SubTitle>
          메일을 받지 못한 경우 스팸 메일함을 확인하거나 <br />
          재전송 버튼을 통해 인증 코드를 다시 받으세요.
        </S.SubTitle>
        <S.MainContainer>
          <TextInput label="이메일 주소" disabled={true} value={accountEmail} />

          <TextInput
            type="text"
            label="인증코드 6자리"
            placeholder="인증코드 6자리 숫자입력"
            maxLength={6}
            onChange={handleChangeAuthNumber}
          />
        </S.MainContainer>
      </S.Wrapper>

      <S.NextButtonWrapper>
        <S.SubButtonContainer>
          <span>인증 메일을 받지 못하셨나요?</span>

          <S.SubButton type="button" onClick={onEmailAuthRequest}>
            메일 재전송
          </S.SubButton>
        </S.SubButtonContainer>
        <MainButton
          btnText="다음"
          disabled={authNumber.length === 0 || false}
          type="button"
          onClick={onConfirmAuthCode}
        />
      </S.NextButtonWrapper>
    </>
  );
}
