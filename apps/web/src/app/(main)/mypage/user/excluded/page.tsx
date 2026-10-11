'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PreferenceListItem } from '../bookmark/components/BookmarkItem';
import { PreferenceListStatus } from '../bookmark/components/PreferenceListStatus';
import IMG_ERROR from '@/assets/common/error.svg';
import preferenceRepository, { GetPreferenceRes } from '@/shared/api/user/preference';
import useUser from '@/shared/hooks/useUser';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import CHeader from '@/shared/ui/c-header';

export default function MyExcluded() {
  const router = useRouter();
  const { token, isLoggedIn, data: userData } = useUser();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['my-excluded', token],
    queryFn: async () => {
      return await preferenceRepository().getPreference({ category: 'excluded', token: String(token) });
    },
    enabled: Boolean(token) && Boolean(userData?.id),
  });

  // 서버가 배열이 아닌 모양을 내려도 화면이 깨지지 않게 한다. (원인 확인 전 임시 방어, QA #10)
  const list = Array.isArray(data) ? data : [];
  const isListReady = Array.isArray(data);

  return (
    <>
      <CHeader title="추천 제외 식당 관리" />

      <div>
        <PreferenceListStatus
          isLoggedIn={isLoggedIn}
          isPending={isPending || !isListReady}
          isError={isError}
          onRetry={() => refetch()}
        />

        {isListReady && list.length === 0 && (
          <div className="flex flex-col items-center gap-md">
            <IMG_ERROR />

            <div className="title2 font-bold">추천을 제외할 식당이 없어요</div>

            <p className="body2 mt-xs text-neutral-bg60">조건에 맞는 식당을 골라보세요</p>

            <BottomButtonContainer>
              <footer className="flex w-full flex-col gap-md">
                <DefaultButton
                  bgColor="gray"
                  customStyle="flex w-full py-[16px] px-[16px]"
                  onClick={() => router.push('/select-restaurant')}
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
          {list.map((item: GetPreferenceRes) => (
            <PreferenceListItem
              type="excluded"
              key={item.id}
              id={item.id}
              name={item.name}
              phone={item.phone}
              address={item.address}
            />
          ))}
        </div>
      </div>
    </>
  );
}
