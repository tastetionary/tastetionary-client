import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  width: 100%;
  padding: 40px 20px 10px;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Nickname = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 20px */
`;

export const LogoutBtn = styled.button`
  color: ${({ theme }) => theme.colors.neutral.bg40};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */
`;

export const Email = styled.div`
  color: ${({ theme }) => theme.colors.neutral.bg40};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
  margin-bottom: 20px;
`;

export const AreaContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

export const AreaBox = styled.div`
  cursor: pointer;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral.bg10};
  background-color: ${({ theme }) => theme.colors.neutral.bg05};
  padding: 14px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AreaBoxLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral.bg30};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`;

export const AreaBoxLValue = styled(AreaBoxLabel)`
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;

export const QuestionContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const Question = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.bg20};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
  text-decoration-line: underline;
`;

export const QuestionModalLists = styled.ul`
  list-style: disc;
  list-style-position: outside;
  padding-left: 1em;
`;

export const QuestionModalList = styled.li`
  color: ${({ theme }) => theme.colors.neutral.bg40};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  &:last-child {
    margin-top: 10px;
  }
`;
