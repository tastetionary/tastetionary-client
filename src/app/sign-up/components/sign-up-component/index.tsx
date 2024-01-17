'use client';
import VerifyAuthNumber from '@/app/find-password/components/verify-auth-number';
import { SHA256 } from 'crypto-js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterUserMutate from '../../hooks/query/useRegisterUserMutate';
import SignUpComplete from '../complete';
import EmailForm from '../email-form';
import OptInMarketing from '../opt-in-marketing';
import PrivacyNotice from '../privacy-notice';
import RegionSetting from '../region-setting';
import Terms from '../terms';
import TermsOfService from '../terms-of-service';
import UserInfoForm from '../user-info-form';
import VerifyCompany from '../verify-company';
import VerifyNumber from '../verify-number';

interface FormValue {
  userProperty: {
    companyData?: {
      companyName: string;
      authenticationId: number;
      identification: string;
      category: 'email';
    };
  };
  areas: [
    {
      category: 'dining_area' | 'activity_area';
      address: '';
      latitude: number;
      longitude: number;
    },
  ];
  account: {
    identification: string;
    password: string;
    passwordConfirm?: string;
    category: 'email';
    authenticationId: number;
  };
  agreements: [
    {
      category: 'personal_information';
      is_agree: boolean;
    },
  ];
}

export default function SignUpComponent() {
  const [emailAuthId, setEmailAuthId] = useState(0);
  const [companyEmailAuthId, setCompanyEmailAuthId] = useState(0);

  const { push } = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const step = params.get('step');

  const setStep = (step: string) => {
    push(`${pathname}?step=${step}`);
  };

  const { mutate: registerUserMutate } = useRegisterUserMutate({ onNext: () => setStep('complete') });

  const methods = useForm<FormValue>({
    mode: 'onBlur',
    defaultValues: {
      areas: [
        {
          category: 'dining_area',
        },
      ],
      account: {
        category: 'email',
      },
      agreements: [
        {
          category: 'personal_information',
          is_agree: true,
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<FormValue> = data => {
    const { companyData } = data.userProperty;
    // Case : 회사 인증을 하지 않고 회원가입 시도
    if (companyData && companyData.companyName === '' && companyData.identification === '') {
      delete data.userProperty.companyData;
    }

    // 비밀번호를 Hash하고 패스워드 체크를 지움
    delete data.account.passwordConfirm;
    data.account.password = SHA256(data.account.password).toString();

    registerUserMutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        {step === null && <Terms onNext={() => setStep('email-form')} />}
        {step === 'privacy-notice' && <PrivacyNotice />}
        {step === 'opt-in-marketing' && <OptInMarketing />}
        {step === 'terms-of-service' && <TermsOfService />}
        {step === 'email-form' && (
          <EmailForm onNext={() => setStep('verify-auth-number')} setEmailAuthId={setEmailAuthId} />
        )}
        {step === 'verify-auth-number' && (
          <VerifyAuthNumber
            onNext={() => setStep('user-info')}
            type="register"
            emailAuthId={emailAuthId}
            setEmailAuthId={setEmailAuthId}
            saveAuthId={authId => methods.setValue('account.authenticationId', authId)}
          />
        )}
        {step === 'user-info' && <UserInfoForm onNext={() => setStep('region-setting')} />}
        {step === 'region-setting' && <RegionSetting onNext={() => setStep('verify-company')} />}
        {step === 'verify-company' && (
          <VerifyCompany onNext={() => setStep('verify-number')} setCompanyEmailAuthId={setCompanyEmailAuthId} />
        )}
        {step === 'verify-number' && (
          <VerifyNumber
            onNext={() => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
            type="register"
            companyEmailAuthId={companyEmailAuthId}
            setCompanyEmailAuthId={setCompanyEmailAuthId}
            saveAuthId={authId => {
              methods.setValue('userProperty.companyData.category', 'email');
              methods.setValue('userProperty.companyData.authenticationId', authId);
            }}
          />
        )}
        {step === 'complete' && <SignUpComplete />}
      </form>
    </FormProvider>
  );
}
