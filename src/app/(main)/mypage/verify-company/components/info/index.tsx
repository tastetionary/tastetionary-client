'use client';

import { useFormContext } from 'react-hook-form';
import useCompanyAuthentication from '../../hooks/query/useCompanyAuthentication';
import { VerifyCompanyFormValue } from '../verify-company-component';
import { emailRegex } from '@/shared/constants';
import MainButton from '@/shared/ui/Button/MainButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

interface Props {
  onNext: (id: number) => void;
}

export default function CompanyInfo({ onNext }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useFormContext<VerifyCompanyFormValue>();

  const email = getValues('identification');

  const buttonDisabledState = email?.length > 0 && getValues('companyName')?.length > 0 && isValid;

  const { mutate: reqVerifyCompany } = useCompanyAuthentication({
    onNext,
    email,
  });

  return (
    <>
      <CHeader title="회사 인증" />

      <div className="relative flex h-full flex-col px-20 pt-20 pb-180">
        <div className="mt-[20px] text-20 leading-[150%] font-bold">회사 인증을 진행해주세요.</div>
        <p className="mt-[15px] text-14 leading-[170%] font-normal text-neutral-bg40">
          반드시 소속 회사의 이메일을 입력해주세요.
        </p>

        <div className="mt-[31px] mb-[115px] w-full [&_div:first-child]:mb-[20px]">
          <TextInput
            label="회사명"
            placeholder="회사명"
            type="text"
            {...register('companyName', {
              required: false,
            })}
          />

          <TextInput
            label="회사 이메일"
            placeholder="이메일 주소 입력"
            type="text"
            errorMsg={errors.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('identification', { required: false, pattern: emailRegex })}
          />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 mt-[202px] w-full bg-white px-20 pt-0 pb-40 text-center mobile:fixed"
        style={{ padding: '20px 20px 40px' }}
      >
        <MainButton btnText="다음" disabled={!buttonDisabledState} onClick={() => reqVerifyCompany()} type="button" />
      </div>
    </>
  );
}
