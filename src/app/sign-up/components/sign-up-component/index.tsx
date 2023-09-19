'use client';

import useFunnel from '@/hooks/useFunnel';
import SignUpComplete from '../complete';
import OptInMarketing from '../opt-in-marketing';
import PrivacyNotice from '../privacy-notice';
import Terms from '../terms';

export default function SignUpComponent() {
  const [Funnel, setStep] = useFunnel(['terms', 'privacy-notice', 'opt-in-marketing', 'complete'], 'terms');

  return (
    <>
      <Funnel>
        <Funnel.Step name="terms">
          <Terms />
        </Funnel.Step>
        <Funnel.Step name="privacy-notice">
          <PrivacyNotice />
        </Funnel.Step>
        <Funnel.Step name="opt-in-marketing">
          <OptInMarketing />
        </Funnel.Step>
        <Funnel.Step name="complete">
          <SignUpComplete />
        </Funnel.Step>
      </Funnel>
    </>
  );
}
