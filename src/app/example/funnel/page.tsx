'use client';

import useFunnel from '@/hooks/useFunnel';
import Test1 from './components/test1';
import Test2 from './components/test2';

export default function FunnelExample() {
  const [Funnel, setStep] = useFunnel(['test1', 'test2'], 'test1');

  return (
    <>
      <Funnel>
        <Funnel.Step name="test1">
          <Test1 />
        </Funnel.Step>
        <Funnel.Step name="test2">
          <Test2 />
        </Funnel.Step>
      </Funnel>
    </>
  );
}
