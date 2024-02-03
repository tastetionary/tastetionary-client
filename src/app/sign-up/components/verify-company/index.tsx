import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { emailRegex } from '@/constants';
import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
  setCompanyEmailAuthId: (value: number) => void;
}

export default function VerifyCompany({ onNext, setCompanyEmailAuthId }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
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
    setCompanyEmailAuthId,
    category: 'company',
  });

  const onCompanyEmailAuthRequest = () => {
    accountAuthCodeMutate({
      identification: getValues('userProperty.companyData.identification'),
      type: 'email',
      category: 'company',
    });
  };

  const buttonDisabledState =
    getValues('userProperty.companyData.identification')?.length > 0 &&
    getValues('userProperty.companyData.companyName')?.length > 0;

  return (
    <>
      <CHeader title="회사 인증" isBackBtn />

      <S.Wrapper>
        <S.Title>회사 인증을 진행해주세요.</S.Title>
        <S.SubTitle>반드시 소속 회사의 이메일을 입력해주세요.</S.SubTitle>

        <S.InputContainer>
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
        </S.InputContainer>
      </S.Wrapper>

      <S.NextButtonWrapper>
        <S.SubButton type="submit">회사 인증 다음에 하기</S.SubButton>

        <MainButton btnText="다음" disabled={!buttonDisabledState} onClick={onCompanyEmailAuthRequest} type="button" />
      </S.NextButtonWrapper>
    </>
  );
}
