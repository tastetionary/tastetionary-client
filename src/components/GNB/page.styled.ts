import styled from 'styled-components';

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
