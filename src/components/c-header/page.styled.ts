import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 56px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 44px;
  width: 360px;
  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const BackBtnContainer = styled.div<{ $isBackBtn?: boolean }>`
  position: absolute;
  left: 0;
  cursor: ${({ $isBackBtn }) => ($isBackBtn ? 'pointer' : 'auto')};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
`;
export const Title = styled.p`
  margin-left: 8px;
`;
