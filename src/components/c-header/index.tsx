import ISBACK_BTN from '@/assets/logo/back_btn.svg';
import MAIN_LOGO from '@/assets/logo/main_logo.svg';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

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
          <S.BackBtnContainer>{isBackBtn && <ISBACK_BTN onClick={() => router.back()} />}</S.BackBtnContainer>
          <S.TitleContainer>
            {isLogo && <MAIN_LOGO />}
            <S.Title>{title}</S.Title>
          </S.TitleContainer>
        </S.Container>
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    padding: 20px 16px;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.bg05};
  `,
  Container: styled.div``,
  BackBtnContainer: styled.div`
    position: absolute;
    cursor: pointer;
  `,
  TitleContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
  `,
  Title: styled.p`
    margin-left: 8px;
  `,
};
