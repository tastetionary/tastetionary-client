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
        className="peer-[.checkbox]:peer-checked:bg-ic_checkbox_active peer-[.checkbox]:bg-ic_checkbox_inactive text-12 font-normal peer-[.checkbox]:flex peer-[.checkbox]:h-20 peer-[.checkbox]:w-full peer-[.checkbox]:cursor-pointer peer-[.checkbox]:items-center peer-[.checkbox]:bg-no-repeat peer-[.checkbox]:pl-28 peer-[.checkbox]:text-neutral-bg40 peer-[.checkbox]:peer-checked:text-neutral-bg80"
        htmlFor={checkBoxId}
      >
        {label}
      </label>
    </div>
  );
}
