import { useRouter } from 'next/navigation';
import BottomButtonContainer from '../Button/BottomButtonContainer';
import DefaultButton from '../Button/DefaultButton';
import CHeader from '../c-header';
import IC_ERROR from '@/assets/common/img_error.svg';
import IC_READY from '@/assets/common/img_ready.svg';

interface Props {
  type: '404' | 'ready';
}

export default function CError({ type }: Props) {
  const router = useRouter();

  return (
    <>
      <CHeader title="" />

      <div className="mt-60 flex flex-col items-center justify-center gap-[37px] px-20 pb-40">
        {type === '404' ? <IC_ERROR /> : <IC_READY />}

        <div className="mb-[138px] flex flex-col items-center justify-center gap-[15px]">
          <div className="text-center text-20 font-bold leading-[1.5]">
            {type === '404' ? '페이지 경로가 올바르지 않습니다.' : '서비스 준비중입니다.'}
          </div>

          <p className="whitespace-pre-line break-keep px-20 text-center text-14 font-normal leading-[160%] text-neutral-bg40">
            {type === '404'
              ? '접근 방법이 잘못되어 페이지를 연결할 수 없습니다. 이용에 불편을 드려 죄송합니다.'
              : '현재 페이지는 서비스를 준비하고 있어요.\n빠른 시일 내에 만나뵐 수 있도록\n최선을 다 할게요 :)'}
          </p>
        </div>
      </div>

      <BottomButtonContainer>
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px]"
          type="button"
          onClick={() => router.push('/')}
        >
          <span className="body2 text-white">홈 화면으로</span>
        </DefaultButton>
      </BottomButtonContainer>
    </>
  );
}
