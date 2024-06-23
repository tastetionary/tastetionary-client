import { cn } from '@/utils/styles.utils';
import * as S from './style';

interface Props {
  text: string;
  value: number;
  onClickEvent: () => void;
  clicked: boolean;
}

export default function CReviewLikeBtn({ text, value, clicked, onClickEvent }: Props) {
  const state = clicked ? 'clicked' : 'default';

  return (
    <button className={cn(S.likeBtnVariants({ borderColor: state, bgColor: state }))} onClick={onClickEvent}>
      <span className={clicked ? 'text-secondary-o50' : 'text-neutral-bg80'}>{text}</span>

      <span className={clicked ? 'text-secondary-o50' : 'text-neutral-bg80'}>{value}</span>
    </button>
  );
}
