import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
      identification: '';
      password: '';
      category: 'email';
      passwordConfirm: '';
    };
  }>();

  const [errorState, setErrorState] = useState({
    password: false,
    checkPassword: false,
  });

  return (
    <>
      <CHeader title="회원 정보 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>회원 정보를 입력해주세요.</S.Title>

        <S.MainContainer>
          <TextInput
            label="이메일 주소"
            placeholder="이메일 주소를 입력해주세요."
            type="text"
            value={getValues('account.identification')}
            disabled
          />

          <TextInput
            id="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
            type="password"
            {...register('account.password', {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
            })}
          />

          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            type="password"
            {...register('account.passwordConfirm', {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
            })}
          />
        </S.MainContainer>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={false} type="button" onClick={onNext} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
