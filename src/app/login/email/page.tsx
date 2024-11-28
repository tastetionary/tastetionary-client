'use client';

import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import { emailRegex } from '@/constants';
import { SHA256 } from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLoginMutate from '../hooks/useLoginMutate';

interface FormValue {
  identification: string;
  password: string;
}

export default function EmailLogin() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
  });

  const { mutate: loginMutate } = useLoginMutate();

  const onSubmitHandler: SubmitHandler<FormValue> = data => {
    data.password = SHA256(data.password).toString();
    loginMutate({ ...data, category: 'email' });
  };

  useEffect(() => {
    const emailInput = document.getElementById('emailInput');

    emailInput?.focus();
  }, []);

  return (
    <>
      <CHeader title="이메일 로그인" />

      <div className="mt-xl flex w-full flex-col gap-xl px-xl">
        <h1 className="title2 break-keep font-bold ">
          이메일로 로그인 <span>✉️</span>
        </h1>

        <form className="flex flex-col gap-md" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextInput
            id="emailInput"
            type="text"
            label="이메일 주소"
            placeholder="example@tastetionary.com"
            errorMsg={errors?.identification?.message}
            {...register('identification', {
              required: true,
              pattern: {
                value: emailRegex,
                message: '올바른 이메일 주소를 입력해 주세요',
              },
            })}
          />

          <TextInput
            type="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
            errorMsg={errors?.password?.message}
            {...register('password', {
              required: '비밀번호를 입력해 주세요',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!?]).{8,}$/,
                message: '영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.',
              },
            })}
          />

          <DefaultButton bgColor="yellow" customStyle="h-46 mt-xl" disabled={!isValid}>
            <span className="body1 text-white">로그인</span>
          </DefaultButton>
        </form>

        <div className="mt-xl flex w-full items-center justify-center">
          <DefaultButton bgColor="none" customStyle="py-5 w-100" onClick={() => push('/ready')}>
            <span className="body2 !font-pretendard">아이디 찾기</span>
          </DefaultButton>

          <div className="h-20 w-1 bg-neutral-bg20" />

          <DefaultButton bgColor="none" customStyle="py-5 w-100" onClick={() => push('/find-password')}>
            <span className="body2 !font-pretendard">비밀번호 찾기</span>
          </DefaultButton>
        </div>
      </div>
    </>
  );
}
