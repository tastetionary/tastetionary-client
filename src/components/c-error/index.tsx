import IC_ERROR from '@/assets/common/img_error.svg';
import IC_READY from '@/assets/common/img_ready.svg';
import { useRouter } from 'next/navigation';
import MainButton from '../Button/MainButton';
import CHeader from '../c-header';
import * as S from './page.styled';

interface Props {
  type: '404' | 'ready';
}

export default function CError({ type }: Props) {
  const router = useRouter();

  return (
    <>
      <CHeader title="" isBackBtn />

      <S.Container>
        {type === '404' ? <IC_ERROR /> : <IC_READY />}

        <S.TextContainer>
          <S.Title>{type === '404' ? '페이지 경로가 올바르지 않습니다.' : '서비스 준비중입니다.'}</S.Title>

          <S.Desc>
            {type === '404'
              ? '접근 방법이 잘못되어 페이지를 연결할 수 없습니다. 이용에 불편을 드려 죄송합니다.'
              : '현재 페이지는 서비스를 준비하고 있어요.\n빠른 시일 내에 만나뵐 수 있도록\n최선을 다 할게요 :)'}
          </S.Desc>
        </S.TextContainer>
      </S.Container>

      <S.NextButtonWrapper>
        <MainButton btnText="홈 화면으로" onClick={() => router.push('/')} />
      </S.NextButtonWrapper>
    </>
  );
}
