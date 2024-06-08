import { GetRestaurantReviewRes } from '@/types/review';
import dayjs from 'dayjs';
import { useState } from 'react';
import CReviewLikeBtn from './c-review-like-btn';
import CReviewReportBtn from './c-review-report-btn';
import * as S from './page.styled';

interface Props {
  reviews?: GetRestaurantReviewRes;
}

export default function CReviewItem({ reviews }: Props) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  return (
    <S.Container>
      <S.SpaceBetween>
        <S.UserContainer>
          <S.Nickname>{reviews?.user.nickname}</S.Nickname>
          <S.Date>
            작성리뷰 {reviews?.user.reviews}개 | {dayjs(reviews?.createdAt).format('YYYY-MM-DD')}
          </S.Date>
        </S.UserContainer>

        <button>
          <CReviewReportBtn id={reviews?.id} />
        </button>
      </S.SpaceBetween>

      <S.Review>{reviews?.summary}</S.Review>

      <S.KeywordContainer>{reviews?.keywords.map((k, i) => <S.Keyword key={i}>{k}</S.Keyword>)}</S.KeywordContainer>

      <S.LikedBtnContainer>
        <CReviewLikeBtn
          text="도움이 돼요"
          value={reviews?.like as number}
          clicked={like}
          onClickEvent={() => {
            setLike(prev => !prev);
            setDislike(like);
          }}
        />

        <CReviewLikeBtn
          text="도움 안돼요"
          value={reviews?.dislike as number}
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
