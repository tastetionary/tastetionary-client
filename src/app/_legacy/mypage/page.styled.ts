import styled from 'styled-components';

export const MenuList = styled.div``;

export const NotLogInContainer = styled.div`
  padding: 40px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.bg10};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotLoginText = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
