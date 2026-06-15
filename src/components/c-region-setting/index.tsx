'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';
import { putSaveRegion } from '@/apis/user/saveRegion';
import RegionSetting from '@/app/_legacy/sign-up/components/region-setting';
import useRegion from '@/hooks/useRegion';
import useUser from '@/hooks/useUser';

interface FormValue {
  address: '';
  latitude: number;
  longitude: number;
}

interface Props {
  category: 'dining_area' | 'activity_area';
  onNextPage: '/register-review/restaurant' | '/select-restaurant' | '/mypage' | '/explore' | '/';
}

export default function CRegionSetting({ category, onNextPage }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token } = useUser();
  const { setRegion } = useRegion();
  const methods = useForm<FormValue>({
    mode: 'onBlur',
  });

  const { openModal, closeModal } = useModal();

  const handleCompleteRegionSetting = () => {
    openModal(MODAL_TYPES.dialog, {
      title: category === 'activity_area' ? '활동 지역 설정 완료' : '지역 설정 완료',
      message: category === 'activity_area' ? '활동 지역이 설정되었습니다.' : '지역이 설정되었습니다.',
      handleConfirm: () => router.push(onNextPage),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      needClose: true,
    });
  };

  const { mutateAsync: asyncSaveRegion } = useMutation({
    mutationFn: (data: { address: string; latitude: number; longitude: number }) =>
      putSaveRegion(
        {
          address: data?.address,
          latitude: data?.latitude,
          longitude: data?.longitude,
        },
        token
      ),
    onSuccess: (_, data) => {
      queryClient.setQueryData(['user'], (prev: any) => {
        if (!prev) return prev;

        return {
          ...prev,
          area: {
            ...prev.area,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
          },
        };
      });
    },
  });

  const handleNext = async () => {
    const data = methods.watch();

    // 로그인 여부와 관계없이 항상 localStorage에 지역을 저장한다.
    setRegion({
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    // 로그인 사용자는 서버에도 지역을 저장한다.
    if (token) {
      try {
        await asyncSaveRegion(data);
      } catch {
        // 서버 저장 실패 시에도 localStorage 설정은 유지하고 완료 처리한다.
      }
    }

    handleCompleteRegionSetting();
  };

  return (
    <FormProvider {...methods}>
      <form className="h-full">
        <RegionSetting category={category} onNext={handleNext} />
      </form>
    </FormProvider>
  );
}
