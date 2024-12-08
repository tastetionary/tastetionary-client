'use client';

import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import { ChangeEvent, useState } from 'react';

export default function Nickname() {
  const [nickname, setNickname] = useState('');

  const notEntered = nickname.length === 0;

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <CHeader title="닉네임 수정" />
      <div className="mx-8 my-20">
        <header>
          <h1 className="title2 font-bold leading-8">
            원하는 이름으로 <br />
            닉네임을 변경할 수 있어요. 💕
          </h1>
          <p className="body2 mt-3 leading-5 text-neutral-bg80">
            한글과 영어, 숫자를 포함하여 최대 10자까지 입력 가능해요.
          </p>
        </header>

        <section className="mt-12">
          <div className="relative flex items-center [&>div]:w-[70%]">
            <TextInput type="text" label="닉네임" placeholder="기존 닉네임" onChange={e => handleChangeNickname(e)} />

            <DefaultButton
              bgColor="yellow"
              customStyle="bottom-0 absolute h-48 right-0 px-[16px] py-[12px] text-xs"
              type="button"
              disabled={notEntered}
            >
              <span className="body2 text-white">중복 확인</span>
            </DefaultButton>
          </div>
        </section>
      </div>

      <footer className="fixed bottom-[30px] w-[360px] px-25 pb-10 pt-5 mobile:w-full">
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px]"
          type="button"
          disabled={notEntered}
          onClick={() => console.log('click!')}
        >
          <span className="body2 text-white">변경하기</span>
        </DefaultButton>
      </footer>
    </>
  );
}
