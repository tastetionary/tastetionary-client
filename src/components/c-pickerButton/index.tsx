'use client';

import HorizontalLayout from '../layout/horizontal-layout';
import * as S from './page.styled';

interface Props {
  title: string;
  desc: string;
  subject: 'menu' | 'restaurant';
  clickEvent?: () => void;
}

export default function CPickerButton({ title, desc, subject, clickEvent }: Props) {
  return (
    <>
      <S.Button
        subject={subject}
        onClick={() => {
          if (clickEvent) clickEvent();
        }}
      >
        <HorizontalLayout subject={subject}>
          <S.Header></S.Header>
          <S.Content>
            <S.Icon></S.Icon>
            <S.Title>{title}</S.Title>
            <S.Description subject={subject}>{desc}</S.Description>
          </S.Content>
        </HorizontalLayout>
      </S.Button>
    </>
  );
}
