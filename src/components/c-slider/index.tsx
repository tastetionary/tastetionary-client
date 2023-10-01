import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { StyledSlider } from './page.styled';

interface Props {
  changeEvent: (value: number) => void;
}

export default function CSlider({ changeEvent }: Props) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    changeEvent(value);
  }, [value]);

  return (
    <StyledSlider
      marks={{
        0: '~10,000원',
        1: '~11,000원',
        2: '~12,000원',
        3: '~13,000원',
        4: '13,000원~',
      }}
      min={0}
      max={4}
      dots={true}
      value={value}
      allowCross={false}
      onChange={value => {
        if (typeof value === 'number') {
          setValue(value);
        }
      }}
    />
  );
}
