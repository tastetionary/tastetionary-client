import { ButtonHTMLAttributes } from 'react';
import DefaultButton from '../DefaultButton';

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  iconType?: 'refresh' | 'except' | 'dinner';
}

export default function RefreshButton({ btnText, iconType = 'refresh', ...rest }: RefreshButtonProps) {
  return (
    <DefaultButton bgColor="gray" customStyle="px-24 py-12" {...rest}>
      <span className="body1">{btnText}</span>
    </DefaultButton>
  );
}
