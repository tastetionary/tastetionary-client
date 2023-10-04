import 'rc-slider/assets/index.css';
import { StyledSlider } from './page.styled';

interface Props {
  value: number;
  changeEvent: (value: number) => void;
}

export default function CSlider({ value, changeEvent }: Props) {
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
          changeEvent(value);
        }
      }}
    />
  );
}
