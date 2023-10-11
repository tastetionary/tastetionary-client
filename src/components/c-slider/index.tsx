import { selectRestaurantState } from '@/lib/atom';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { StyledSlider } from './page.styled';

interface Props {
  markData: {
    id: number;
    name: string;
  }[];
}

export default function CSlider({ markData }: Props) {
  const [value, setValue] = useState<number>(0);
  const setRestaurant = useSetRecoilState(selectRestaurantState);

  const marks = markData?.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

  useEffect(() => {
    setRestaurant(prev => ({
      ...prev,
      price: value,
    }));
  }, [value]);

  return (
    <StyledSlider
      marks={marks}
      min={markData?.[0]?.id ?? 0}
      max={markData?.[markData?.length - 1]?.id ?? 4}
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
