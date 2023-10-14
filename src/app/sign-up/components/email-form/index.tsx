import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function EmailForm({ onNext }: Props) {
  const { register } = useFormContext<{
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
          <TextInput
            type="email"
            label="이메일 주소"
            placeholder="이메일 주소 입력"
            {...register('account.identification', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </S.MainContainer>
        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={false} onClick={onNext} type="button" />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
