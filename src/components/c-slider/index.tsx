import { useReviewStore } from '@/store/useReviewStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

interface Props {
  markData: {
    id: number;
    name: string;
  }[];
  type: 'restaurant' | 'review';
}

const PRICE_OPTIONS = [
  '10,000원 미만',
  '10,000원 이상 ~ 13,000원 미만',
  '13,000원 이상 ~ 16,000원 미만',
  '16,000원 이상 ~ 20,000원 미만',
  '20,000원 이상',
];

export default function CSlider({ markData, type }: Props) {
  const [value, setValue] = useState<number>(0);
  const { setRestaurantPrice } = useSelectRestaurantStore();
  const { setReviewPrice } = useReviewStore();

  const marks = markData?.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

  useEffect(() => {
    if (type === 'restaurant') {
      setRestaurantPrice([PRICE_OPTIONS[value]]);
    } else {
      setReviewPrice([PRICE_OPTIONS[value]]);
    }
  }, [value, type]);

  return (
    <Slider
      className="slider w-[calc(100% - 28px)] mx-auto my-0 h-20"
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
