import * as S from './page.styled';

interface Props {
  checkBoxId: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function CheckBox2({ checkBoxId, checked, onChange, label }: Props) {
  return (
    <S.Container>
      <S.Checkbox
        type="checkbox"
        id={checkBoxId}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />

      <S.Label htmlFor={checkBoxId}>{label}</S.Label>
    </S.Container>
  );
}
