import preferenceRepository from '@/apis/user/preference';
import IC_BOOKMARK_ACTIVE from '@/assets/common/Icons/bookmark_active.svg';
import IC_BOOKMARK_INACTIVE from '@/assets/common/Icons/bookmark_inactive.svg';
import { iconToast } from '@/components/Toast';
import useUser from '@/hooks/useUser';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function RestaurantBookmarkBtn() {
  const { token } = useUser();

  const [isBookMarked, setIsBookMarked] = useState(false);
  const { restaurant } = useSelectResultStore();

  const { mutate: addBookMark } = useMutation({
    mutationFn: preferenceRepository().postPreference,
    onSuccess: () => {
      iconToast('북마크에 추가되었습니다.', 'check');
      setIsBookMarked(true);
    },
  });

  const { mutate: deleteBookMark } = useMutation({
    mutationFn: preferenceRepository().deletePreference,
    onSuccess: () => setIsBookMarked(false),
  });

  const handleBookMark = () => {
    const data = {
      category: 'bookmark' as 'bookmark' | 'excluded',
      restaurantId: restaurant?.id ? +restaurant?.id : 0,
      token: token!,
    };

    if (isBookMarked) return deleteBookMark(data);

    return addBookMark(data);
  };

  return (
    <div
      className="absolute right-[10px] top-[10px] z-2 cursor-pointer rounded-2 bg-[#00000040] p-10"
      onClick={handleBookMark}
    >
      {isBookMarked ? <IC_BOOKMARK_ACTIVE /> : <IC_BOOKMARK_INACTIVE />}
    </div>
  );
}
