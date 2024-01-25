import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { emailRegex } from '@/constants';
import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
  setEmailAuthId: (value: number) => void;
}

export default function EmailForm({ onNext, setEmailAuthId }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useFormContext<{
    account: {
      identification: string;
    };
  }>();

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({ onNext, setEmailAuthId, category: 'account' });

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({ identification: getValues('account.identification'), type: 'email', category: 'account' });
  };

  return (
    <>
      <CHeader title="이메일 주소 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>
          아이디로 사용할 <br /> 이메일 주소를 입력해주세요.
        </S.Title>
        <S.MainContainer>
          <TextInput
            type="text"
            label="이메일 주소"
            placeholder="이메일 주소 입력"
            errorMsg={errors.account?.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('account.identification', { required: true, pattern: emailRegex })}
          />
        </S.MainContainer>
        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={!isDirty || !isValid} type="button" onClick={onEmailAuthRequest} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
