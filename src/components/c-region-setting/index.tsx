import { putSaveRegion } from '@/apis/user/saveRegion';
import RegionSetting from '@/app/sign-up/components/region-setting';
import useUser from '@/hooks/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';

interface FormValue {
  areas: [
    {
      category: 'dining_area' | 'activity_area';
      address: '';
      latitude: number;
      longitude: number;
    },
  ];
}

interface Props {
  category: 'dining_area' | 'activity_area';
  onNextPage: '/register-review/restaurant' | '/select-restaurant' | '/mypage';
}

export default function CRegionSetting({ category, onNextPage }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token } = useUser();
  const methods = useForm<FormValue>({
    mode: 'onBlur',
    defaultValues: {
      areas: [
        {
          category: 'dining_area',
        },
      ],
    },
  });

  const { openModal, closeModal } = useModal();

  const handleCompleteRegionSetting = () => {
    openModal(MODAL_TYPES.dialog, {
      title: category === 'activity_area' ? '활동 지역 변경 완료' : '식사 지역 변경 완료',
      message: category === 'activity_area' ? '활동 지역이 변경되었습니다.' : '식사 지역이 변경되었습니다.',
      handleConfirm: () => router.push(onNextPage),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      needClose: true,
    });
  };

  const { mutate: saveRegion } = useMutation(
    (data: { address: string; latitude: number; longitude: number }) =>
      putSaveRegion(
        {
          address: data?.address,
          category,
          latitude: data?.latitude,
          longitude: data?.longitude,
        },
        token
      ),
    {
      onSuccess: (_, data) => {
        queryClient.setQueryData(['user'], (prev: any) => {
          let oldData = prev;

          if (category === 'activity_area') {
            oldData.area.activityArea = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          }
          if (category === 'dining_area') {
            oldData.area.diningArea = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          }

          return oldData;
        });

        handleCompleteRegionSetting();
      },
    }
  );

  return (
    <FormProvider {...methods}>
      <form>
        <RegionSetting
          category={category}
          onNext={() => {
            const data = methods.watch('areas')[0];

            if (data) {
              saveRegion(data);
            }
          }}
        />
      </form>
    </FormProvider>
  );
}
