'use client';

import userRepository from '@/apis/user';
import useValidationNickname from '@/app/sign-up/hooks/query/useValidationNickname';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import ContentLayout from '@/components/layout/content-layout';
import { iconToast } from '@/components/Toast';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

export default function Nickname() {
  const { token } = useUser();
  const [nickname, setNickname] = useState('');

  const notEntered = nickname.length === 0;

  const { validateNicknameMutate, isSuccess } = useValidationNickname();

  const { mutate: updateNickname } = useMutation({
    mutationFn: userRepository().putProfile,
    onSuccess: () => {
      iconToast('닉네임 변경이 완료되었습니다.', 'check');
    },
  });

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleValidateNickname = () => {
    validateNicknameMutate({ nickname });
  };

  const handleUpdateNickname = () => {
    updateNickname({ nickname, token: token! });
  };

  return (
    <>
      <CHeader title="닉네임 수정" />

      <ContentLayout>
        <header className="mt-xxl">
          <h1 className="title2 font-bold leading-8">
            원하는 이름으로 <br />
            닉네임을 변경할 수 있어요. 💕
          </h1>
          <p className="body2 mt-3 leading-5 text-neutral-bg80">
            한글과 영어, 숫자를 포함하여 최대 10자까지 입력 가능해요.
          </p>
        </header>

        <section className="mt-12">
          <div className="flex w-full items-end gap-[10px]">
            <div className="w-[calc(100%-94px)]">
              <TextInput type="text" label="닉네임" placeholder="기존 닉네임" onChange={e => handleChangeNickname(e)} />
            </div>

            <DefaultButton
              bgColor="yellow"
              customStyle="h-48 px-[16px] py-[12px] text-xs"
              type="button"
              disabled={notEntered}
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
          disabled={!isSuccess}
          onClick={handleUpdateNickname}
        >
          <span className="body2 text-white">변경하기</span>
        </DefaultButton>
      </BottomButtonContainer>
    </>
  );
}
