'use client';

import authRepository from '@/apis/auth';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import ContentLayout from '@/components/layout/content-layout';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { SHA256 } from 'crypto-js';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValue = {
  password: string;
  confirmedPassword: string;
};

export default function UpdatePassword() {
  const { token } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
  });

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: authRepository().updatePassword,
    onSuccess: () => {
      router.push('/mypage/user/manage-info/password/complete');
    },
  });

  const onSubmit: SubmitHandler<FormValue> = ({ password }) => {
    const encryptedPassword = SHA256(password).toString();
    updatePassword({ password: encryptedPassword, token: token! });
  };

  return (
    <>
      <CHeader title="비밀번호 재설정" />

      <ContentLayout className="px-0">
        <header className="mt-xxl px-xl">
          <h1 className="title2 font-bold leading-8">
            원하는 비밀번호로 <br />
            언제든지 변경할 수 있어요. ☑️
          </h1>
          <p className="body2 mt-3 leading-5 text-neutral-bg80">
            영문, 숫자, 특수문자를 포함하여 8자리 이상으로 변경 가능합니다.
          </p>
        </header>

        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-md px-xl">
            <TextInput
              type="password"
              label="비밀번호"
              placeholder="영문, 숫자, 특수문자를 조합하여 8자리 이상"
              errorMsg={errors.password ? '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.' : undefined}
              {...register('password', {
                required: '비밀번호를 입력해 주세요',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
                  message: '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.',
                },
              })}
            />

            <TextInput
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호 재입력"
              errorMsg={errors.confirmedPassword ? '비밀번호가 일치하지 않습니다.' : undefined}
              {...register('confirmedPassword', {
                required: true,
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
                validate: value => getValues('password') === value || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </div>

          <BottomButtonContainer>
            <DefaultButton
              bgColor="yellow"
              customStyle="flex w-full py-[12px] px-[16px]"
              type="submit"
              disabled={isPending || !isDirty || !isValid}
            >
              <span className="body2 text-white">변경하기</span>
            </DefaultButton>
          </BottomButtonContainer>
        </form>
      </ContentLayout>
    </>
  );
}
