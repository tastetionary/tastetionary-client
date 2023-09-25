import ISBACK_BTN from '@/assets/logo/back_btn.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

interface Props {
  isLogo?: boolean;
  isBackBtn?: boolean;
  title: string;
}

export default function CHeader({ isLogo = false, isBackBtn = false, title }: Props) {
  const router = useRouter();

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.BackBtnContainer $isBackBtn={isBackBtn}>
            {isBackBtn && <ISBACK_BTN onClick={() => router.back()} />}
          </S.BackBtnContainer>
          <S.TitleContainer>
            {isLogo && <MAIN_LOGO />}
            <S.Title>{title}</S.Title>
          </S.TitleContainer>
        </S.Container>
      </S.Wrapper>
    </>
  );
}
