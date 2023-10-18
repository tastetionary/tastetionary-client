'use client';
import VerifyAuthNumber from '@/app/find-password/components/verify-auth-number';
import useFunnel from '@/hooks/useFunnel';
import { companyInfoState } from '@/lib/atom';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import SignUpComplete from '../complete';
import EmailForm from '../email-form';
import OptInMarketing from '../opt-in-marketing';
import PrivacyNotice from '../privacy-notice';
import RegionSetting from '../region-setting';
import Terms from '../terms';
import UserInfoForm from '../user-info-form';
import VerifyCompany from '../verify-company';
import VerifyNumber from '../verify-number';

interface FormValue {
  userProperty: {
    companyName?: string;
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
  const { companyName } = useRecoilValue(companyInfoState);

  const [Funnel, setStep] = useFunnel(
    [
      'terms',
      'privacy-notice',
      'opt-in-marketing',
      'verify-auth-number',
      'complete',
      'email-form',
      'verify-company',
      'verify-number',
    ],
    'terms'
  );

  const methods = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      // userProperty: {
      //   companyName: '',
      // },
      areas: [
        {
          category: 'dining_area',
          // address: '',
          // latitude: 0,
          // longitude: 0,
        },
      ],
      account: {
        // identification: '',
        // password: '',
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

  console.log('companyEmailAuthId', companyEmailAuthId);

  const onSubmit = (data: any) => {
    console.log('form 동작!!');
    console.log('서버에 보낼 data', data);
    console.log('회사 이름', companyName);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Funnel>
          <Funnel.Step name="terms">
            <Terms onNext={() => setStep('email-form')} />
          </Funnel.Step>
          <Funnel.Step name="privacy-notice">
            <PrivacyNotice />
          </Funnel.Step>
          <Funnel.Step name="opt-in-marketing">
            <OptInMarketing />
          </Funnel.Step>
          <Funnel.Step name="email-form">
            <EmailForm onNext={() => setStep('verify-auth-number')} setEmailAuthId={setEmailAuthId} />
          </Funnel.Step>
          <Funnel.Step name="verify-auth-number">
            <VerifyAuthNumber onNext={() => setStep('user-info')} type="register" emailAuthId={emailAuthId} />
          </Funnel.Step>
          <Funnel.Step name="user-info">
            <UserInfoForm onNext={() => setStep('region-setting')} />
          </Funnel.Step>
          <Funnel.Step name="region-setting">
            <RegionSetting onNext={() => setStep('verify-company')} />
          </Funnel.Step>
          <Funnel.Step name="verify-company">
            <VerifyCompany onNext={() => setStep('verify-number')} setCompanyEmailAuthId={setCompanyEmailAuthId} />
          </Funnel.Step>
          <Funnel.Step name="verify-number">
            <VerifyNumber onNext={() => setStep('complete')} />
          </Funnel.Step>
          <Funnel.Step name="complete">
            <SignUpComplete />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
