import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  + ${Label} {
    cursor: pointer;
    padding-left: 28px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 20px;
    background: url('/image/CheckBox/ic_checkbox_inactive.svg') no-repeat 0 0px / contain;
    color: ${({ theme }) => theme.colors.neutral.bg40};
  }

  &:checked + ${Label} {
    background: url('/image/CheckBox/ic_checkbox_active.svg') no-repeat 0 1px / contain;
    color: ${({ theme }) => theme.colors.neutral.bg80};
  }
`;
