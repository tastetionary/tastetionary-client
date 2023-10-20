'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordComplete from '../password-complete';
import VerifyEmail from '../verify-email';

export default function FindPasswordComponent() {
  const [emailAuthId, setEmailAuthId] = useState(0);

  const { push } = useRouter();
  const pathname = usePathname();
  const setStep = (step: string) => {
    push(`${pathname}?step=${step}`);
  };

  return (
    <>
      <VerifyEmail onNext={() => setStep('verify-auth-number')} />
      {/* <VerifyAuthNumber
        onNext={() => setStep('password-complete')}
        type="find-password"
        emailAuthId={emailAuthId}
        setEmailAuthId={setEmailAuthId}
      /> */}
      <PasswordComplete />
    </>
  );
}
