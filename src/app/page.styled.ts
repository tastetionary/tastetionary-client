import styled from 'styled-components';

export const MainContent = styled.main`
  padding: 40px 40px 80px;

  & button:nth-child(2) {
    margin-top: 36px;
  }
`;

export const NavContainer = styled.div`
  position: fixed;
  display: flex;
  max-width: 360px;
  width: 100%;
  bottom: 0;

  & > button {
    flex-grow: 1;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
