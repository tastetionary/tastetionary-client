import styled from 'styled-components';

export const Menu = styled.div`
  padding-top: 24px;
  width: 100%;
`;

export const MenuTitle = styled.div`
  padding: 6px 20px;
  color: ${({ theme }) => theme.colors.neutral.bg30};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 24px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.bg20};
  }
`;
