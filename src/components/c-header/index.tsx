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

const S = {
  Wrapper: styled.div`
    height: 56px;
    background-color: ${({ theme }) => theme.colors.white};
    position: fixed;
    top: 44px;
    width: 360px;
    z-index: 1;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  `,
  Container: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  BackBtnContainer: styled.div<{ $isBackBtn?: boolean }>`
    position: absolute;
    left: 0;
    cursor: ${({ $isBackBtn }) => ($isBackBtn ? 'pointer' : 'auto')};
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
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
