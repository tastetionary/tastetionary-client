'use client';

import useFunnel from '@/hooks/useFunnel';
import VerifyEmail from '../verify-email';

export default function FindPasswordComponent() {
  const [Funnel, setStep] = useFunnel(['verify-email'], 'verify-email');

  return (
    <Funnel>
      <Funnel.Step name="verify-email">
        <VerifyEmail />
      </Funnel.Step>
    </Funnel>
  );
}
