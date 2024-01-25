import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { emailRegex } from '@/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

interface FormValue {
  email: string;
}

export default function VerifyEmail({ onNext }: Props) {
  const { register, handleSubmit } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data);

  return (
    <>
      <CHeader title="비밀번호 재설정" isBackBtn />
      <S.Wrapper>
        <S.Title>
          이메일 주소 인증을 통해 <br /> 비밀번호를 재설정합니다.
        </S.Title>
        <S.SubTitle>
          TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
          <br />
          TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
        </S.SubTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.MainContainer>
            <TextInput
              type="email"
              label="이메일 주소"
              placeholder="이메일 주소 입력"
              {...register('email', { required: true, pattern: emailRegex })}
            />
          </S.MainContainer>
          <S.NextButtonWrapper>
            <MainButton btnText="인증코드 전송" disabled={false} onClick={onNext} type="submit" />
          </S.NextButtonWrapper>
        </S.Form>
      </S.Wrapper>
    </>
  );
}
