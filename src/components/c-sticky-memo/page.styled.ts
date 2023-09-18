import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const StickyMemoHeader = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary.y20};
`;

export const StickyMemo = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.primary.y10};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Shadow = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  z-index: -1;
`;
