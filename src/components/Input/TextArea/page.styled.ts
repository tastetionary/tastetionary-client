'use client';

import styled from 'styled-components';

export const Container = styled.div``;

export const Label = styled.label`
  display: inline-block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg80};
  margin-bottom: 6px;
`;

export const InputContainer = styled.div<{ $focused: boolean; $hasError: boolean }>`
  position: relative;
  width: 100%;
  padding: 13px 12px;
  border: 2px solid
    ${({ $focused, $hasError, theme }) =>
      $hasError ? theme.colors.simentic.r60 : $focused ? theme.colors.neutral.bg20 : theme.colors.neutral.bg10};
  background: ${({ $hasError, theme }) => ($hasError ? theme.colors.secondary.o05 : theme.colors.white)};

  svg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const Textarea = styled.textarea<{ $hasError: boolean }>`
  width: calc(100% - 24px);
  min-height: 174px;
  resize: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.neutral.bg80};
  background: ${({ $hasError, theme }) => ($hasError ? theme.colors.secondary.o05 : theme.colors.white)};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.bg20};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
`;

export const ErrorMsg = styled.div`
  margin-left: 14px;
  margin-top: 8px;
  font-family: var(--Pretendard-Variable) !important;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.simentic.r90};
`;
