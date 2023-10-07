'use client';

import VerifyNumber from '@/app/sign-up/components/verify-number';
import useFunnel from '@/hooks/useFunnel';
import PasswordComplete from '../password-complete';
import VerifyEmail from '../verify-email';

export default function FindPasswordComponent() {
  const [Funnel, setStep] = useFunnel(['verify-email', 'verify-number', 'password-complete'], 'verify-email');

  return (
    <Funnel>
      <Funnel.Step name="verify-email">
        <VerifyEmail onNext={() => setStep('verify-number')} />
      </Funnel.Step>
      <Funnel.Step name="verify-number">
        <VerifyNumber />
      </Funnel.Step>
      <Funnel.Step name="password-complete">
        <PasswordComplete />
      </Funnel.Step>
    </Funnel>
  );
}
