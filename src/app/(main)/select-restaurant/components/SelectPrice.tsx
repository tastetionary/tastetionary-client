import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getRestaurantOption } from '@/features/recommendation/api/restaurant/option';
import { useSelectRestaurantStore } from '@/features/recommendation/store/useSelectRestaurantStore';
import { useReviewStore } from '@/features/reviews/store/useReviewStore';
import CheckBox2 from '@/shared/ui/CheckBox/CheckBox2';

export default function SelectPrice({ type }: { type: 'restaurant' | 'review' }) {
  const { prices: restaurantPrice, setRestaurantPrice } = useSelectRestaurantStore();
  const { prices: reviewPrice, setReviewPrice } = useReviewStore();

  const { data } = useQuery({
    queryKey: ['restaurant-option'],
    queryFn: () => getRestaurantOption(),
    enabled: type === 'review' || false, // Do not refetch on the client
  });

  useEffect(() => {
    setRestaurantPrice([]);
  }, []);

  return (
    <>
      {data?.prices?.map((p: { id: number; name: string }, i: number) => (
        <div key={i} className="flex items-center gap-xs py-9">
          <CheckBox2
            label={p.name}
            checkBoxId={`price-${i}`}
            checked={(type === 'review' ? reviewPrice : restaurantPrice).includes(p.name)}
            onChangeEvent={type === 'review' ? () => setReviewPrice([p.name]) : () => setRestaurantPrice([p.name])}
          />
        </div>
      ))}
    </>
  );
}
