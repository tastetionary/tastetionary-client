'use client';
import VerifyAuthNumber from '@/app/find-password/components/verify-auth-number';
import useFunnel from '@/hooks/useFunnel';
import { FormProvider, useForm } from 'react-hook-form';
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
    mode: 'all',
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

  const onSubmit = (data: any) => {
    console.log('form 동작!!');
    console.log(data);
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
            <EmailForm onNext={() => setStep('verify-auth-number')} />
          </Funnel.Step>
          <Funnel.Step name="verify-auth-number">
            <VerifyAuthNumber onNext={() => setStep('user-info')} type="register" />
          </Funnel.Step>
          <Funnel.Step name="user-info">
            <UserInfoForm onNext={() => setStep('region-setting')} />
          </Funnel.Step>
          <Funnel.Step name="region-setting">
            <RegionSetting onNext={() => setStep('verify-company')} />
          </Funnel.Step>
          <Funnel.Step name="verify-company">
            <VerifyCompany onNext={() => setStep('verify-number')} />
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
