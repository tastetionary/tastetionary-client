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

  const setStep = (step: string) => {
    push(`${pathname}?step=${step}`);
  };

  const methods = useForm<FormValue>({
    mode: 'onBlur',
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
            onNext={() => push('/find-password/complete')}
            type="register"
            emailAuthId={emailAuthId}
            setEmailAuthId={setEmailAuthId}
            saveAuthId={authId => methods.setValue('account.authenticationId', authId)}
          />
        )}
      </form>
    </FormProvider>
  );
}
