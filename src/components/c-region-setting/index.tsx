import { putSaveRegion } from '@/apis/user/saveRegion';
import RegionSetting from '@/app/sign-up/components/region-setting';
import useUser from '@/hooks/useUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
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
  console.log('onNextPage', onNextPage);

  const router = useRouter();
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

  const { openModal } = useModal();

  const handleCompleteRegionSetting = () => {
    openModal(MODAL_TYPES.dialog, {
      title: category === 'activity_area' ? '활동 지역 변경 완료' : '식사 지역 변경 완료',
      message: category === 'activity_area' ? '활동 지역이 변경되었습니다.' : '식사 지역이 변경되었습니다.',
      handleConfirm: () => router.push(onNextPage),
    });
  };

  console.log('category', category);

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
            oldData.activity_area = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          }
          if (category === 'dining_area') {
            oldData.dining_area = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          }

          return oldData;
        });
        console.log('여기가 실행되나??');

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
            console.log('data.', data);

            if (data) {
              saveRegion(data);
            }
          }}
        />
      </form>
    </FormProvider>
  );
}
