import styled from 'styled-components';

export const RefreshContainer = styled.button<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  max-width: 166px;
  margin: 24px auto 18px;
  padding: 12px 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: ${({ disabled }) => (disabled ? '0.4' : 1)};
`;

export const RefreshText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
