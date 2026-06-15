import { InputHTMLAttributes } from 'react';
import * as S from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checkBoxId: string;
  checked: boolean;
  onChangeEvent: (checked: boolean) => void;
  label?: string;
  bg?: 'orange' | 'white';
}

export default function CheckBox2({ checkBoxId, checked, onChangeEvent, label, bg = 'white', ...rest }: Props) {
  const bgState = bg === 'white' ? 'default' : 'orange';

  return (
    <div className="flex items-center">
      <input
        className="checkbox peer hidden"
        type="checkbox"
        id={checkBoxId}
        checked={checked}
        onChange={({ target: { checked } }) => onChangeEvent(checked)}
        {...rest}
      />

      <label className={S.checkboxVariants({ bg: bgState, checked })} htmlFor={checkBoxId}>
        {label}
      </label>
    </div>
  );
}
