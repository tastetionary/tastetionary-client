import { useReviewStore } from '@/store/useReviewStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { StyledSlider } from './page.styled';

interface Props {
  markData: {
    id: number;
    name: string;
  }[];
  type: 'restaurant' | 'review';
}

export default function CSlider({ markData, type }: Props) {
  const [value, setValue] = useState<number>(0);
  const { setRestaurantPrice } = useSelectRestaurantStore();
  const { setReviewPrice } = useReviewStore();

  const marks = markData?.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

  useEffect(() => {
    if (type === 'restaurant') {
      setRestaurantPrice(value);
    } else {
      setReviewPrice(value);
    }
  }, [value, type]);

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
