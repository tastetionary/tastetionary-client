'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import VerifyAuthNumber from '../verify-auth-number';
import VerifyEmail from '../verify-email';

interface FormValue {
  account: {
    identification: string;
    password: string;
    passwordConfirm?: string;
    category: 'email';
    authenticationId: number;
  };
}

export default function FindPasswordComponent() {
  const { push } = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [emailAuthId, setEmailAuthId] = useState(0);

  const step = params.get('step');

  const setStep = (nextStep: string) => {
    push(`${pathname}?step=${nextStep}`);
  };

  const methods = useForm<FormValue>({
    // onBlur 면 이메일을 다 쳐도 포커스를 옮기기 전까지 '인증코드 전송' 버튼이 켜지지 않는다
    mode: 'onChange',
    defaultValues: {
      account: {
        category: 'email',
      },
    },
  });

  const onSubmit: SubmitHandler<FormValue> = data => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!step && <VerifyEmail setEmailAuthId={setEmailAuthId} onNext={() => setStep('verify-auth-number')} />}

        {step === 'verify-auth-number' && (
          <VerifyAuthNumber
            type="find-password"
            email={methods.getValues('account.identification')}
            historyId={emailAuthId}
            onResent={setEmailAuthId}
            onNext={() => push('/find-password/complete')}
          />
        )}
      </form>
    </FormProvider>
  );
}
