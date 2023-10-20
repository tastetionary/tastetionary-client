import styled from 'styled-components';

export const MainContent = styled.main`
  padding: 40px;

  & button:nth-child(2) {
    margin-top: 36px;
  }
`;

export const NavContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 0;

  & > button {
    flex-grow: 1;
  }
`;
