'use client';

import useFunnel from '@/hooks/useFunnel';
import PasswordComplete from '../password-complete';
import VerifyAuthNumber from '../verify-auth-number';
import VerifyEmail from '../verify-email';

export default function FindPasswordComponent() {
  const [Funnel, setStep] = useFunnel(['verify-email', 'verify-auth-number', 'password-complete'], 'verify-email');

  return (
    <Funnel>
      <Funnel.Step name="verify-email">
        <VerifyEmail onNext={() => setStep('verify-auth-number')} />
      </Funnel.Step>
      <Funnel.Step name="verify-auth-number">
        <VerifyAuthNumber />
      </Funnel.Step>
      <Funnel.Step name="password-complete">
        <PasswordComplete />
      </Funnel.Step>
    </Funnel>
  );
}
