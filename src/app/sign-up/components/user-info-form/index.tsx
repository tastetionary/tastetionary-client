import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';
import useValidationNickname from '../../hooks/query/useValidationNickname';

interface Props {
  onNext: () => void;
}

export default function UserInfoForm({ onNext }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useFormContext<{
    account: {
      identification: string;
      password: string;
      category: 'email';
      passwordConfirm: string;
    };
    nickname: string;
  }>();

  const accountEmail = getValues('account.identification');

  // 이메일 주소와 , emailAuthId값을 전달받아서 요청에 보내야함!
  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({
    onNext,
    // setEmailAuthId,
    category: 'account',
    type: 'retry',
  });
  const { validateNicknameMutate } = useValidationNickname();

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({ identification: accountEmail, type: 'email', category: 'account' });
  };

  const handleValidateNickname = () => {
    validateNicknameMutate({ nickname: getValues('nickname') });
  };

  return (
    <>
      <CHeader title="회원가입" />

      <div className="mx-8 my-20">
        <header>
          <h1 className="!font-pretendard text-xl font-bold leading-8">
            원활한 서비스 이용을 위해 <br />
            아래 회원 정보를 입력해 주세요. ✍️
          </h1>
          <p className="mt-3 !font-pretendard leading-5 text-neutral-bg80">
            회원 정보는 개인화된 추천과 원활한 서비스 제공을 위해 사용되며, <br /> 안전하게 보호됩니다.
          </p>
        </header>
        <section className="mt-12 [&>div]:mt-3">
          <TextInput type="text" label="이메일 주소" disabled value={accountEmail} />

          <TextInput
            type="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
            errorMsg={errors.account?.password ? '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.' : undefined}
            {...register('account.password', {
              required: '비밀번호를 입력해주세요',
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
            })}
          />

          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            type="password"
            errorMsg={errors.account?.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : undefined}
            {...register('account.passwordConfirm', {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
              validate: value => getValues('account.password') === value || '비밀번호가 일치하지 않습니다.',
            })}
          />

          <div className="relative flex items-center [&>div]:w-[70%]">
            <TextInput
              type="text"
              label="닉네임"
              placeholder="랜덤 닉네임"
              {...register('nickname', {
                required: true,
              })}
            />
            <DefaultButton
              bgColor="yellow"
              customStyle="bottom-0 absolute h-48 right-0 px-[16px] py-[12px] text-xs"
              onClick={handleValidateNickname}
              type="button"
            >
              <span className="!font-pretendard text-white">중복 확인</span>
            </DefaultButton>
          </div>
        </section>
      </div>
      <footer className="fixed bottom-[30px] w-[360px] px-25 pb-10 pt-5 mobile:w-full">
        <div className="flex justify-center gap-2">
          <p className="!font-pretendard text-sm text-neutral-bg80">인증 코드를 받지 못하셨나요?</p>
          <DefaultButton bgColor="gray" customStyle="px-[12px] py-[4px]" onClick={onEmailAuthRequest}>
            <span className="!font-pretendard">메일 재전송</span>
          </DefaultButton>
        </div>
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px] mt-6"
          disabled={!isDirty || !isValid}
          onClick={onNext}
          type="button"
        >
          <span className="!font-pretendard text-white">다음</span>
        </DefaultButton>
      </footer>

      {/* <S.Wrapper>
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
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자를 조합하여 8자 이상"
            type="password"
            errorMsg={errors.account?.password ? '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.' : undefined}
            {...register('account.password', {
              required: '비밀번호를 입력해주세요',
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
            })}
          />
          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            type="password"
            errorMsg={errors.account?.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : undefined}
            {...register('account.passwordConfirm', {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
              validate: value => getValues('account.password') === value || '비밀번호가 일치하지 않습니다.',
            })}
          />
        </S.MainContainer>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled={!isDirty || !isValid} type="button" onClick={onNext} />
        </S.NextButtonWrapper>
      </S.Wrapper> */}
    </>
  );
}
