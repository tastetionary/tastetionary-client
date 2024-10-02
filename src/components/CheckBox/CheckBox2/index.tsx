import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checkBoxId: string;
  checked: boolean;
  onChangeEvent: (checked: boolean) => void;
  label?: string;
}

export default function CheckBox2({ checkBoxId, checked, onChangeEvent, label, ...rest }: Props) {
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

      <label
        className="peer-[.checkbox]:body2 pl-[28px] peer-[.checkbox]:flex peer-[.checkbox]:w-full peer-[.checkbox]:cursor-pointer peer-[.checkbox]:items-center peer-[.checkbox]:bg-ic_checkbox_inactive peer-[.checkbox]:bg-no-repeat peer-[.checkbox]:peer-checked:bg-ic_checkbox_active"
        htmlFor={checkBoxId}
      >
        {label}
      </label>
    </div>
  );
}
