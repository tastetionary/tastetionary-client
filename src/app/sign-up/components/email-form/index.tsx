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
    formState: { errors },
  } = useFormContext<{
    account: {
      identification: string;
    };
  }>();

  console.log('errors', errors);

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
            render={props => {
              console.log('props', props);
              return (
                <TextInput
                  type="text"
                  label="이메일 주소"
                  placeholder="이메일 주소 입력"
                  errorMsg={errors.account?.identification ? '에러가 발생했습니다.' : ''}
                  {...register('account.identification', { required: true, pattern: /^\S+@\S+$/i })}
                />
              );
            }}
          />
        </S.MainContainer>
        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={false} type="submit" />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
