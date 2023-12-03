'use client';
import VerifyAuthNumber from '@/app/find-password/components/verify-auth-number';
import { SHA256 } from 'crypto-js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
      companyEmail?: string;
      authenticationId?: number;
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
    if (companyData && companyData.companyName === '' && companyData.companyEmail === '') {
      delete data.userProperty.companyData;
    }

    // Case : 회사 인증을 하고 회원가입 시도
    if (companyData && companyData.companyName !== '' && companyData.companyEmail !== '') {
      data.userProperty.companyData!.authenticationId = companyEmailAuthId;
      delete data.userProperty.companyData?.companyEmail;
    }

    // 비밀번호를 Hash하고 패스워드 체크를 지움
    delete data.account.passwordConfirm;
    data.account.password = SHA256(data.account.password).toString();
    registerUserMutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          />
        )}
        {step === 'user-info' && <UserInfoForm onNext={() => setStep('region-setting')} />}
        {step === 'region-setting' && <RegionSetting onNext={() => setStep('verify-company')} />}
        {step === 'verify-company' && (
          <VerifyCompany onNext={() => setStep('verify-number')} setCompanyEmailAuthId={setCompanyEmailAuthId} />
        )}
        {step === 'verify-number' && (
          <VerifyNumber
            onNext={() => setStep('complete')}
            type="register"
            companyEmailAuthId={companyEmailAuthId}
            setCompanyEmailAuthId={setCompanyEmailAuthId}
          />
        )}
        {step === 'complete' && <SignUpComplete />}
      </form>
    </FormProvider>
  );
}
