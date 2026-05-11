import { ReactNode } from 'react';

interface Props {
  title: {
    bold: string;
    normal: string;
  };
  subtitle?: string;
  children: ReactNode;
}

export default function SelectSection({ title, subtitle, children }: Props) {
  return (
    <div className="mt-xxl">
      <div className="title2">
        <strong className="title2 font-bold">{title.bold}</strong>
        {title.normal}
      </div>

      {subtitle && <p className="body2 mt-xs">{subtitle}</p>}

      <div className="mt-lg">{children}</div>
    </div>
  );
}
