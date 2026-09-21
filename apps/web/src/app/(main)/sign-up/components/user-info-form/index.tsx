import { useForm } from 'react-hook-form';
import useValidationNickname from '../../hooks/query/useValidationNickname';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';

const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/;

interface FormValue {
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface Props {
  email: string;
  defaultNickname?: string;
  onNext: (value: { password: string; nickname: string }) => void;
}

export default function UserInfoForm({ email, defaultNickname, onNext }: Props) {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>({ mode: 'onChange', defaultValues: { nickname: defaultNickname } });

  const nickname = watch('nickname');

  const { validateNicknameMutate } = useValidationNickname();

  const handleValidateNickname = () => {
    validateNicknameMutate({ nickname });
  };

  const onSubmit = handleSubmit(value => onNext({ password: value.password, nickname: value.nickname }));

  return (
    <form onSubmit={onSubmit}>
      <CHeader title="회원가입" />

      <div className="mx-xl mt-xl mb-40">
        <header>
          <h1 className="title2 font-bold">
            원활한 서비스 이용을 위해 <br />
            아래 회원 정보를 입력해 주세요. ✍️
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            회원 정보는 개인화된 추천과 원활한 서비스 제공을 위해 사용되며, <br /> 안전하게 보호됩니다.
          </p>
        </header>
        <section className="mt-12 [&>div]:mt-3">
          <TextInput type="text" label="이메일 주소" disabled value={email} />

          <TextInput
            type="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
            errorMsg={errors.password ? '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.' : undefined}
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: PASSWORD_PATTERN,
              deps: ['passwordConfirm'],
            })}
          />

          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            type="password"
            errorMsg={errors.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : undefined}
            {...register('passwordConfirm', {
              required: true,
              validate: value => getValues('password') === value || '비밀번호가 일치하지 않습니다.',
            })}
          />

          <div className="relative flex items-center [&>div]:w-[70%]">
            <TextInput
              type="text"
              label="닉네임"
              placeholder="랜덤 닉네임"
              errorMsg={errors.nickname ? '한글, 영문, 숫자로 3~10자 입력해주세요.' : undefined}
              {...register('nickname', {
                required: true,
                // 서버 규칙: 한글/영문/숫자 3~10자
                pattern: /^[가-힣a-zA-Z0-9]{3,10}$/,
              })}
            />
            <DefaultButton
              bgColor="yellow"
              customStyle="bottom-0 absolute h-48 right-0 px-[16px] py-[12px] text-xs"
              onClick={handleValidateNickname}
              disabled={!nickname || nickname?.length === 0}
              type="button"
            >
              <span className="!font-pretendard text-white">중복 확인</span>
            </DefaultButton>
          </div>
        </section>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="yellow"
            customStyle="flex w-full py-[12px] px-[16px] mt-6"
            disabled={!isValid}
            type="submit"
          >
            <span className="!font-pretendard text-white">다음</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </form>
  );
}
