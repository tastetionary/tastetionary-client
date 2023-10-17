'use client';

import IC_ERROR from '@/assets/common/img_error.svg';
import MainButton from '@/components/Button/MainButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <CHeader title="" />

      <Container>
        <IC_ERROR />

        <TextContainer>
          <Title>페이지 경로가 올바르지 않습니다.</Title>

          <Desc>접근 방법이 잘못되어 페이지를 연결할 수 없습니다. 이용에 불편을 드려 죄송합니다.</Desc>
        </TextContainer>

        <MainButton btnText="홈 화면으로" onClick={() => router.push('/')} />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 60px;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 37px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 138px;
`;

const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
`;

const Desc = styled.p`
  padding: 0 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
  text-align: center;
`;
