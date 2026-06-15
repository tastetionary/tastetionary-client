import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '@/app/_legacy/sign-up/hooks/query/useAccountAuthCodeMutate';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import ContentLayout from '@/components/layout/content-layout';
import { emailRegex } from '@/constants';

interface Props {
  onNext: () => void;
  setEmailAuthId: (value: number) => void;
}

export default function VerifyEmail({ onNext, setEmailAuthId }: Props) {
  const {
    register,
    getValues,
    formState: { isValid },
  } = useFormContext<{
    account: {
      identification: string;
    };
  }>();

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({ onNext, setEmailAuthId });

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({ identification: getValues('account.identification'), type: 'email', category: 'password' });
  };

  return (
    <>
      <CHeader title="비밀번호 재설정" />

      <ContentLayout className="flex flex-col gap-xxl pt-xxl">
        <div>
          <div className="title2 font-bold">
            이메일 주소 인증을 통해 <br /> 비밀번호를 재설정합니다.
          </div>

          <p className="body2 mt-xs">회원가입 시 입력하신 이메일 주소를 입력해주세요.</p>
        </div>

        <div className="mt-37">
          <TextInput
            type="email"
            label="이메일 주소"
            placeholder="이메일 주소 입력"
            {...register('account.identification', { required: true, pattern: emailRegex })}
          />
        </div>
      </ContentLayout>

      <BottomButtonContainer>
        <DefaultButton
          type="button"
          bgColor="yellow"
          customStyle="flex-grow py-12"
          disabled={!isValid}
          onClick={onEmailAuthRequest}
        >
          <span className="body1 text-white">인증코드 전송</span>
        </DefaultButton>
      </BottomButtonContainer>
    </>
  );
}
