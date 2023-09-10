import { InputHTMLAttributes } from 'react';
import * as S from './page.styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checkBoxId: string;
  checked: boolean;
  onChangeEvent: (checked: boolean) => void;
  label?: string;
  [key: string]: any;
}

export default function CheckBox2({ checkBoxId, checked, onChangeEvent, label, ...rest }: Props) {
  return (
    <S.Container>
      <S.Checkbox
        type="checkbox"
        id={checkBoxId}
        checked={checked}
        onChange={({ target: { checked } }) => onChangeEvent(checked)}
      />

      <S.Label htmlFor={checkBoxId}>{label}</S.Label>
    </S.Container>
  );
}
