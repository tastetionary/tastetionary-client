import { useState } from 'react';
import CReviewLikeBtn from './c-review-like-btn';
import CReviewReportBtn from './c-review-report-btn';
import * as S from './page.styled';

export default function CReviewItem() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const mock_keyword = ['깨끗해요✨', '가성비 좋아요👍', '주차 가능해요🚘'];

  return (
    <S.Container>
      <S.SpaceBetween>
        <S.UserContainer>
          <S.Nickname>닉네임</S.Nickname>
          <S.Date>작성리뷰 #개 | yyyy.mm.dd.</S.Date>
        </S.UserContainer>

        <button>
          <CReviewReportBtn />
        </button>
      </S.SpaceBetween>

      <S.Review>
        리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
      </S.Review>

      <S.KeywordContainer>{mock_keyword?.map((k, i) => <S.Keyword key={i}>{k}</S.Keyword>)}</S.KeywordContainer>

      <S.LikedBtnContainer>
        <CReviewLikeBtn
          text="도움이 돼요"
          value={3}
          clicked={like}
          onClickEvent={() => {
            setLike(prev => !prev);
            setDislike(like);
          }}
        />

        <CReviewLikeBtn
          text="도움 안돼요"
          value={0}
          clicked={dislike}
          onClickEvent={() => {
            setDislike(prev => !prev);
            setLike(dislike);
          }}
        />
      </S.LikedBtnContainer>
    </S.Container>
  );
}
