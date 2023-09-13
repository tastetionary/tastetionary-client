import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Children, ReactNode, isValidElement, useCallback } from 'react';

interface StepProps<T extends string[]> {
  name: T[number];
  children: ReactNode;
}

interface FunnelProps<T extends string[]> {
  steps: T;
  step: T[number];
  children: any;
}

const Step = <T extends string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

const Funnel = <T extends string[]>({ step, children }: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find(child => (child.props as StepProps<T>)?.name === step);

  return <>{targetElement || null}</>;
};

const useFunnel = <T extends string[]>(steps: T, defaultStep: T[number]) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setStep = useCallback(() => {
    router.push(`${pathname}?${params.toString()}`);
  }, [params]);

  const FunnelComponent = Object.assign(
    (props: Omit<FunnelProps<T>, 'step' | 'steps'>) => {
      const step = params.get('step') ?? defaultStep;
      return <Funnel steps={steps} step={step} {...props} />;
    },
    { Step }
  );

  return [FunnelComponent, setStep] as const;
};

export default useFunnel;
