import { CheckboxWrapper } from '@/app/sign-up/components/terms/page.styled';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;

export const ReasonList = styled.div`
  margin: 40px 0 56px 0;
`;

export const ReasonItem = styled(CheckboxWrapper)`
  margin-top: 0;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
