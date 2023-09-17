'use client';

import useFunnel from '@/hooks/useFunnel';
import Terms from '../terms';

export default function SignUpComponent() {
  const [Funnel, setStep] = useFunnel(['terms'], 'terms');

  return (
    <>
      <Funnel>
        <Funnel.Step name="terms">
          <Terms />
        </Funnel.Step>
      </Funnel>
    </>
  );
}
