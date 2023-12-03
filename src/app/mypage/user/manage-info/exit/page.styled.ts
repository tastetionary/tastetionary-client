import { CheckboxWrapper } from '@/app/sign-up/components/terms/page.styled';
import { Checkbox } from '@/components/CheckBox/CheckBox2/page.styled';
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

export const ReasonCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ReasonLabel = styled.label`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const ReasonCheckBox = styled(Checkbox)`
  + ${ReasonLabel} {
    cursor: pointer;
    padding-left: 28px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 20px;
    color: ${({ theme }) => theme.colors.neutral.bg40};
    background: url('../../../image/CheckBox/ic_checkbox_inactive.svg') no-repeat 0 0px / contain;
  }

  &:checked + ${ReasonLabel} {
    background: url('../../../image/CheckBox/ic_checkbox_active.svg') no-repeat 0 1px / contain;
    color: ${({ theme }) => theme.colors.neutral.bg80};
  }
`;
