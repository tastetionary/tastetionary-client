'use client';

import * as api from '@homekeeper89/taste_dict/lib/api';
import { useEffect } from 'react';
import HorizontalLayout from '../layout/horizontal-layout';
import * as S from './page.styled';

interface Props {
  title: string;
  desc: string;
  subject: 'menu' | 'restaurant';
  clickEvent?: () => void;
}

export default function CPickerButton({ title, desc, subject, clickEvent }: Props) {
  const getApi = async () => {
    const res = await api.functional.v1.configuration.server_status.getServerStatus({
      host: 'http://175.45.201.100:8080',
    });
    console.log(res);
  };

  useEffect(() => {
    getApi();
  }, []);

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
