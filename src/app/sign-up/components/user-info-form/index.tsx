import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { Controller, useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function UserInfoForm({ onNext }: Props) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<{
    account: {
      identification: string;
      password: string;
      category: 'email';
      passwordConfirm: string;
    };
  }>();

  return (
    <>
      <CHeader title="회원 정보 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>회원 정보를 입력해주세요.</S.Title>

        <S.MainContainer>
          <Controller
            name="account.identification"
            render={() => {
              return (
                <TextInput
                  label="이메일 주소"
                  placeholder="이메일 주소를 입력해주세요."
                  type="text"
                  value={getValues('account.identification')}
                  disabled
                />
              );
            }}
          />

          <Controller
            name="account.password"
            render={() => {
              return (
                <TextInput
                  id="password"
                  label="비밀번호"
                  placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
                  type="password"
                  errorMsg={
                    errors.account?.password ? '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.' : undefined
                  }
                  {...register('account.password', {
                    required: '비밀번호를 입력해주세요',
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
                  })}
                />
              );
            }}
          />

          <Controller
            name="account.passwordConfirm"
            render={() => {
              return (
                <TextInput
                  label="비밀번호 확인"
                  placeholder="비밀번호 재입력"
                  type="password"
                  errorMsg={errors.account?.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : undefined}
                  {...register('account.passwordConfirm', {
                    required: true,
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
                    validate: value => getValues('account.password') === value || '비밀번호가 일치하지 않습니다.',
                  })}
                />
              );
            }}
          />
        </S.MainContainer>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={false} type="button" onClick={onNext} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
