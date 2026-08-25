'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useCheckCompanyAuthCode from '../../hooks/query/useCheckCompanyAuthCode';
import CompanyAuth from '../auth';
import VerifyCompanyComplete from '../complete';
import CompanyInfo from '../info';
import useUser from '@/shared/hooks/useUser';

export interface VerifyCompanyFormValue {
  companyName: string;
  code: string;
  identification: string;
  category: 'email';
  historyId: number;
}

export default function VerifyCompanyComponent() {
  const { token } = useUser();
  const { push } = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const step = params.get('step');

  const methods = useForm<VerifyCompanyFormValue>({
    mode: 'onBlur',
    defaultValues: {
      companyName: '',
      code: '',
      identification: '',
      category: 'email',
      historyId: 0,
    },
  });

  const setStep = (nextStep: string) => {
    push(`${pathname}?step=${nextStep}`);
  };

  const { mutate: checkAuthCode } = useCheckCompanyAuthCode({
    onNext: () => setStep('complete'),
  });

  const onSubmit: SubmitHandler<VerifyCompanyFormValue> = data => {
    checkAuthCode({
      code: data.code,
      historyId: data.historyId,
      token,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* sign-up 과 같은 규칙: step 쿼리가 없으면 첫 단계를 보여준다. (없으면 빈 화면이 된다) */}
        {(step === null || step === 'info') && (
          <CompanyInfo
            onNext={id => {
              methods.setValue('historyId', id);
              setStep('auth');
            }}
          />
        )}

        {step === 'auth' && <CompanyAuth onNext={id => methods.setValue('historyId', id)} />}
        {step === 'complete' && <VerifyCompanyComplete />}
      </form>
    </FormProvider>
  );
}
