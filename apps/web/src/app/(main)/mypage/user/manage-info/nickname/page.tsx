'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useValidationNickname from '@/app/(main)/sign-up/hooks/query/useValidationNickname';
import userRepository from '@/shared/api/user';
import useUser from '@/shared/hooks/useUser';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';
import TextInput from '@/shared/ui/Input/TextInput';
import ContentLayout from '@/shared/ui/layout/content-layout';
import { iconToast } from '@/shared/ui/Toast';
import { cn } from '@/shared/utils/styles.utils';

export default function Nickname() {
  const { token, data: userData } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    watch,
    formState: { isValid, errors },
  } = useForm<{ nickname: string }>({
    mode: 'onChange',
  });

  const nickname = watch().nickname;
  const currentNickname = userData?.nickname;

  // 지금 쓰고 있는 닉네임을 그대로 넣으면 서버에 묻지 않고 바로 안내한다. (QA #2)
  const isSameAsCurrent = Boolean(nickname) && nickname === currentNickname;

  const { validateNicknameMutate, isSuccess, variables: validatedVariables } = useValidationNickname();

  // 중복 확인을 통과한 값과 지금 입력값이 같을 때만 변경할 수 있다.
  // (확인 뒤 입력을 바꾸면 검증되지 않은 닉네임이 그대로 전송되던 문제)
  const isValidated = isSuccess && validatedVariables?.nickname === nickname;

  const { mutate: updateNickname, isPending: isUpdating } = useMutation({
    mutationFn: userRepository().putProfile,
    onSuccess: () => {
      // 마이페이지 상단 닉네임은 ['user'] 쿼리를 보므로 바로 새로 받아온다.
      queryClient.invalidateQueries({ queryKey: ['user'] });
      iconToast('닉네임 변경이 완료되었습니다.', 'check');
      router.back();
    },
  });

  const handleValidateNickname = () => {
    if (isSameAsCurrent) return;

    validateNicknameMutate({ nickname });
  };

  const handleUpdateNickname = () => {
    updateNickname({ nickname, token: token! });
  };

  const errorMsg = errors?.nickname?.message ?? (isSameAsCurrent ? '현재 사용 중인 닉네임이에요.' : undefined);

  return (
    <>
      <CHeader title="닉네임 수정" />

      <form>
        <ContentLayout>
          <header className="mt-xxl">
            <h1 className="title2 leading-8 font-bold">
              원하는 이름으로 <br />
              닉네임을 변경할 수 있어요. 💕
            </h1>
            <p className="body2 mt-3 leading-5 text-neutral-bg80">
              한글과 영어, 숫자를 포함하여 최대 10자까지 입력 가능해요.
            </p>
          </header>

          <section className="mt-12">
            <div className={cn('flex w-full gap-[10px]', nickname?.length && errorMsg ? 'items-center' : 'items-end')}>
              <div className="w-[calc(100%-94px)]">
                <TextInput
                  type="text"
                  label="닉네임"
                  placeholder={currentNickname || '기존 닉네임'}
                  errorMsg={errorMsg}
                  {...register('nickname', {
                    required: true,
                    maxLength: {
                      value: 10,
                      message: '닉네임은 최대 10자까지 입력 가능합니다.',
                    },
                    pattern: {
                      value: /^(?! )[가-힣a-zA-Z0-9]+( [가-힣a-zA-Z0-9]+)*(?<! )$/,
                      message: '한글, 영어, 숫자만 사용 가능하며 처음과 끝에 공백이 없어야 합니다.',
                    },
                  })}
                />
              </div>

              <DefaultButton
                bgColor="yellow"
                customStyle="h-48 px-[16px] py-[12px] text-xs"
                type="button"
                disabled={!isValid || isSameAsCurrent}
                onClick={handleValidateNickname}
              >
                <span className="body2 text-white">중복 확인</span>
              </DefaultButton>
            </div>
          </section>
        </ContentLayout>

        <BottomButtonContainer>
          <DefaultButton
            bgColor="yellow"
            customStyle="flex w-full py-[12px] px-[16px]"
            type="button"
            disabled={!isValidated || isUpdating}
            onClick={handleUpdateNickname}
          >
            <span className="body2 text-white">변경하기</span>
          </DefaultButton>
        </BottomButtonContainer>
      </form>
    </>
  );
}
