'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import RegionSetting from '@/app/(main)/sign-up/components/region-setting';
import { UserRes } from '@/shared/api/user/getUser';
import { putSaveRegion } from '@/shared/api/user/saveRegion';
import useUser from '@/shared/hooks/useUser';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

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

  const loginRequiredModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '로그인 안내',
      message: '지역은 계정에 저장돼요.\n로그인이 필요합니다.',
      handleConfirm: () => router.push('/login'),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      cancelText: '취소',
      confirmText: '로그인 하기',
      needClose: true,
    });
  };

  const saveFailedModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '지역 설정에 실패했습니다.',
      message: '잠시 후 다시 시도해주세요.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
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
      queryClient.setQueryData(['user'], (prev: UserRes | undefined) => {
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

    // 지역의 단일 소스는 계정(서버)이므로 로그인 없이는 저장할 수 없다.
    if (!token) {
      return loginRequiredModal();
    }

    try {
      await asyncSaveRegion(data);
    } catch {
      return saveFailedModal();
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
