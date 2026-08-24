import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import { emailRegex } from '@/shared/constants';
import MainButton from '@/shared/ui/Button/MainButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

interface Props {
  onNext: () => void;
  setCompanyEmailAuthId: (value: number) => void;
}

export default function VerifyCompany({ onNext, setCompanyEmailAuthId }: Props) {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<{
    userProperty: {
      companyData: {
        companyName: string;
        identification: string;
      };
    };
  }>();

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({
    onNext,
  });

  const onCompanyEmailAuthRequest = () => {
    accountAuthCodeMutate({
      identification: getValues('userProperty.companyData.identification'),
      type: 'email',
    });
  };

  const buttonDisabledState =
    watch('userProperty.companyData.identification') && watch('userProperty.companyData.companyName');

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
            {...register('userProperty.companyData.companyName', {
              required: false,
            })}
          />

          <TextInput
            label="회사 이메일"
            placeholder="이메일 주소 입력"
            type="text"
            errorMsg={errors.userProperty?.companyData?.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('userProperty.companyData.identification', { required: false, pattern: emailRegex })}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 mt-[202px] w-full bg-white px-20 pt-0 pb-40 text-center mobile:fixed">
        <button className="mx-auto mt-0 mb-[22px] px-32 py-14 text-12 font-normal underline" type="submit">
          회사 인증 다음에 하기
        </button>

        <MainButton btnText="다음" disabled={!buttonDisabledState} onClick={onCompanyEmailAuthRequest} type="button" />
      </div>
    </>
  );
}
