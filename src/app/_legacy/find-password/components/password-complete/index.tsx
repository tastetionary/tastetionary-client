import COMPLETE from '@/assets/logo/complete.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';

export default function PasswordComplete() {
  const router = useRouter();

  return (
    <>
      <CHeader title="비밀번호 재설정" />

      <div className="relative flex h-full flex-col items-center pb-[120px] pt-80 text-center">
        <COMPLETE />
        <div className="title2 mt-5 font-bold">
          입력하신 이메일 주소로
          <br />
          임시 비밀번호를 전송했어요.
        </div>
        <p className="body2 my-[15px] mb-[100px] text-center text-neutral-bg60">
          입력하신 이메일 주소로 임시 비밀번호를 전송했습니다. <br />
          확인 후 로그인해주세요.
        </p>
      </div>

      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="orange"
            customStyle="flex w-full py-[12px] px-[16px]"
            onClick={() => router.push('/login')}
          >
            <span className="!font-pretendard text-white">로그인</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
