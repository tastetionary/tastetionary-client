'use client';

import CHeader from '@/components/c-header';
import * as S from './page.styled';

export default function RegisterReviewCaution() {
  return (
    <>
      <CHeader title="리뷰 작성 시 유의사항" />

      <S.Container>
        <S.Content>
          리뷰 운영 정책을 위반한 경우, 통보 없이 리뷰를 숨김처리 하거나 회원의 리뷰 작성 권한을 중지 또는 해지할 수
          있습니다.
        </S.Content>

        <S.BannedList>
          <S.Content as="li">잘못된 방문 인증이나 정상 이용 완료되지 않은 방문에 대해 리뷰를 작성한 경우</S.Content>
          <S.Content as="li">장소와 무관한 내용이나 동일한 문자의 반복 등 부적합한 내용을 포함한 경우</S.Content>
          <S.Content as="li">욕설, 비방, 명예훼손을 포함한 내용이 있는 경우 </S.Content>
          <S.Content as="li">저작권, 초상권 등 타인의 권리, 명예, 신용, 기타 정당한 이익을 침해하는 경우</S.Content>
        </S.BannedList>

        <S.Content>
          더 자세한 이용 정책은 <span>서비스 이용 약관</span>을 확인해 주세요.
        </S.Content>
      </S.Container>
    </>
  );
}
