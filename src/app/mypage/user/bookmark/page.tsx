'use client';

import preferenceRepository from '@/apis/user/preference';
import IMG_ERROR from '@/assets/common/error.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import useUser from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BookmarkItem } from './components/BookmarkItem';

export default function MyReviews() {
  const router = useRouter();
  const { token, data: userData } = useUser();
  const { data } = useQuery({
    queryKey: ['my-bookmark', token],
    queryFn: async () => {
      return await preferenceRepository().getPreference({ category: 'bookmark', token: String(token) });
    },
    enabled: Boolean(token) && Boolean(userData?.id),
  });

  return (
    <>
      <CHeader title="북마크 관리" />

      <div>
        {data?.length === 0 && (
          <div className="flex flex-col items-center gap-md">
            <IMG_ERROR />

            <div className="title2 font-bold">북마크한 식당이 없어요</div>

            <p className="body2 mt-xs text-neutral-bg60">식당을 고르고 마음에 드는 식당을 찾아 북마크해보세요.</p>

            <BottomButtonContainer>
              <footer className="flex w-full flex-col gap-md">
                <DefaultButton
                  bgColor="gray"
                  customStyle="flex w-full py-[16px] px-[16px]"
                  onClick={() => router.push('/register-review')}
                >
                  <span className="!font-pretendard">식당 고르기</span>
                </DefaultButton>

                <DefaultButton
                  bgColor="orange"
                  customStyle="flex w-full py-[16px] px-[16px]"
                  onClick={() => router.push('/select-restaurant')}
                >
                  <span className="!font-pretendard text-white">주변 식당 검색하기</span>
                </DefaultButton>
              </footer>
            </BottomButtonContainer>
          </div>
        )}

        <div>
          {data?.map(item => (
            <BookmarkItem key={item.id} id={item.id} name={item.name} phone={item.phone} address={item.address} />
          ))}
        </div>
      </div>
    </>
  );
}
