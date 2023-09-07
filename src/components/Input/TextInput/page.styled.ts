'use client';

import styled from 'styled-components';

export const Container = styled.div``;

export const Label = styled.label`
  display: inline-block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #37474f;
  margin-bottom: 6px;
`;

export const InputContainer = styled.div<{ $focused: boolean; $hasError: boolean }>`
  position: relative;
  width: 100%;
  padding: 13px 12px;
  border: 2px solid ${({ $focused, $hasError }) => ($hasError ? '#E53835' : $focused ? '#b0bec5' : '#CFD8DB')};
  background: ${({ $hasError }) => ($hasError ? '#FCE9E6' : '#fff')};

  svg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const Input = styled.input<{ $hasError: boolean }>`
  width: calc(100% - 24px);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #37474f;
  background: ${({ $hasError }) => ($hasError ? '#FCE9E6' : '#fff')};

  &::placeholder {
    color: #b0bec5;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
`;

export const ErrorMsg = styled.div`
  margin-left: 14px;
  margin-top: 8px;
  font-family: var(--Pretendard-Variable) !important;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #cb2528;
`;
