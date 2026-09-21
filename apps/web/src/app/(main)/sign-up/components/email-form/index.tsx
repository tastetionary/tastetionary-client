import { useForm } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import { emailRegex } from '@/shared/constants';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

interface Props {
  /** 인증 메일 발송에 성공하면 이메일과 발송 id 를 넘겨준다 */
  onNext: (value: { email: string; historyId: number }) => void;
}

export default function EmailForm({ onNext }: Props) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: 'onChange' });

  const { mutate: accountAuthCodeMutate, isPending } = useAccountAuthCodeMutate({
    onSent: historyId => onNext({ email: getValues('email'), historyId }),
  });

  const onEmailAuthRequest = handleSubmit(({ email }) => {
    accountAuthCodeMutate({ identification: email, type: 'email', category: 'account' });
  });

  return (
    <form onSubmit={onEmailAuthRequest}>
      <CHeader title="회원가입" />
      <div className="mx-xl mt-xl mb-20">
        <header>
          <h1 className="title2 font-bold">
            아이디로 사용할 <br /> 이메일 주소를 입력해 주세요. ✍️
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            입력하신 이메일 주소는 로그인과 비밀번호 재설정, 중요한 소식 전달에 사용됩니다. 정확한 이메일 주소를 입력해
            주세요.
          </p>
        </header>

        <section className="mt-12">
          <TextInput
            type="text"
            label="이메일 주소"
            placeholder="example@tastetionary.com"
            errorMsg={errors.email ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('email', { required: true, pattern: emailRegex })}
          />
        </section>
      </div>

      <BottomButtonContainer>
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px]"
          disabled={!isValid || isPending}
          type="submit"
        >
          <span className="font-pretendard text-white">다음</span>
        </DefaultButton>
      </BottomButtonContainer>
    </form>
  );
}
