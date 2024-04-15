import styled from 'styled-components';

export const Button = styled.button`
  width: 24px;
  height: 24px;
  background: url(/image/ReportBtn/report_default.svg) center no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 1px ${({ theme }) => theme.colors.secondary.o50};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;

  &:enabled:active {
    background-image: url('/image/ReportBtn/report_pressed.svg');
  }
`;

export const Text = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 19.2px;
  color: ${({ theme }) => theme.colors.neutral.bg20};
`;
