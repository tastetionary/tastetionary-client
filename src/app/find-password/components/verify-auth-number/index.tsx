import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

interface FormValue {
  authNumber: number;
}

export default function VerifyEmail({ onNext }: Props) {
  const { register, handleSubmit } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = data => console.log(data);

  return (
    <>
      <CHeader title="인증코드 입력" isBackBtn />
      <S.Wrapper>
        <S.Title>
          1시간 이내로 이메일로 발송된 <br />
          인증코드를 입력해 주세요.
        </S.Title>
        <S.SubTitle>
          메일을 받지 못한 경우 스팸 메일함을 확인하거나 <br />
          재전송 버튼을 통해 인증 코드를 다시 받으세요.
        </S.SubTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.MainContainer>
            <TextInput
              type="number"
              label="인증코드 6자리"
              placeholder="인증코드 6자리 숫자입력"
              {...register('authNumber', { required: true, pattern: /[0-9]{6}/, maxLength: 6 })}
            />
          </S.MainContainer>

          <S.NextButtonWrapper>
            <S.SubButtonContainer>
              <span>인증 메일을 받지 못하셨나요?</span>

              <S.SubButton type="button">메일 재전송</S.SubButton>
            </S.SubButtonContainer>
            <MainButton btnText="다음" disabled={false} onClick={onNext} type="submit" />
          </S.NextButtonWrapper>
        </S.Form>
      </S.Wrapper>
    </>
  );
}
