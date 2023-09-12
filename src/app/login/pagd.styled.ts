import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 20px;
`;

export const FormContainer = styled.div`
  margin-top: 40px;
  position: relative;
  width: 100%;
  padding: 0 20px;
`;

export const FormHeader = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.bg10};
`;

export const Form = styled.form`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};

  div:nth-child(-n + 2) {
    margin-bottom: 20px;
  }

  button {
    margin-top: 40px;
  }
`;

export const FormShadow = styled.div`
  position: absolute;
  top: 4px;
  left: 24px;
  width: calc(100% - 40px);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: -1;
`;

export const NavContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

export const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  width: 100px;
  padding: 14px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const NavDivider = styled.div`
  width: 1px;
  height: 10px;
  margin: 0 5px;
  background-color: ${({ theme }) => theme.colors.neutral.bg20};
`;
