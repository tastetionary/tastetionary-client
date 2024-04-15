import * as S from './page.styled';

interface Props {
  text: string;
  value: number;
  onClickEvent: () => void;
  clicked: boolean;
}

export default function CReviewLikeBtn({ text, value, clicked, onClickEvent }: Props) {
  return (
    <S.LikedBtn $clicked={clicked} onClick={onClickEvent}>
      <span>{text}</span>

      <span>{value}</span>
    </S.LikedBtn>
  );
}
