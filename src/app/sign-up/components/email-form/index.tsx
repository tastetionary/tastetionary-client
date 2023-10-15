import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { Controller, useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function EmailForm({ onNext }: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<{
    account: {
      identification: string;
    };
  }>();

  return (
    <>
      <CHeader title="이메일 주소 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>
          아이디로 사용할 <br /> 이메일 주소를 입력해주세요.
        </S.Title>
        <S.SubTitle>
          TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
          <br />
          TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
        </S.SubTitle>
        <S.MainContainer>
          <Controller
            control={control}
            name="account.identification"
            render={() => {
              return (
                <TextInput
                  type="text"
                  label="이메일 주소"
                  placeholder="이메일 주소 입력"
                  errorMsg={errors.account?.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
                  {...register('account.identification', { required: true, pattern: /^\S+@\S+$/i })}
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
