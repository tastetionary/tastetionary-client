'use client';

import { useRouter } from 'next/navigation';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';

export default function RegisterReviewCaution() {
  const router = useRouter();

  return (
    <>
      <CHeader title="리뷰 작성 시 유의사항" />

      <div className="flex w-full flex-col px-32 py-48">
        <p className="title4 pb-48 font-bold">리뷰 작성 시 유의사항</p>
        <p className="body2">
          리뷰 운영 정책을 위반한 경우, 통보 없이 리뷰를 숨김처리 하거나 회원의 리뷰 작성 권한을 중지 또는 해지할 수
          있습니다.
        </p>
        <div className="body2 pt-10">
          <p className="body2">- 잘못된 방문 인증이나 정상 이용 완료되지 않은 방문에 대해 리뷰를 작성한 경우</p>
          <p className="body2">- 장소와 무관한 내용이나 동일한 문자의 반복 등 부적합한 내용을 포함한 경우</p>
          <p className="body2">- 욕설, 비방, 명예훼손을 포함한 내용이 있는 경우</p>
          <p className="body2">- 저작권, 초상권 등 타인의 권리, 명예, 신용, 기타 정당한 이익을 침해하는 경우</p>
        </div>
        <p className="body2 pt-10">더 자세한 이용 정책은 서비스 이용 약관을 확인해 주세요.</p>
      </div>
      <BottomButtonContainer>
        <footer className="w-full">
          <DefaultButton
            bgColor="gray"
            customStyle="w-full py-[12px] px-[16px] "
            onClick={() => router.push('/sign-up?step=terms-of-service')}
          >
            <span className="body1">서비스 이용약관 보러가기</span>
          </DefaultButton>
        </footer>
      </BottomButtonContainer>
    </>
  );
}
