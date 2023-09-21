import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function UserInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValue>();

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
            {...register('email', { required: true })}
          />

          <TextInput
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
            type="text"
            {...register('password', { required: true, pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/ })}
          />

          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            type="text"
            {...register('passwordConfirm', {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
            })}
          />
        </S.MainContainer>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
