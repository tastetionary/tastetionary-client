import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 24px;
  justify-items: center;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const MenuItemTitle = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;
