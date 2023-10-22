import { putSaveRegion } from '@/apis/user/saveRegion';
import RegionSetting from '@/app/sign-up/components/region-setting';
import useUser from '@/hooks/useUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

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
}

export default function CRegionSetting({ category }: Props) {
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
      onSuccess: (res, data) => {
        queryClient.setQueryData(['user'], (prev: any) => {
          let oldData = prev;

          if (category === 'activity_area') {
            oldData.activity_area = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          } else {
            oldData.dining_area = {
              address: data?.address,
              category,
              latitude: data?.latitude,
              longitude: data?.longitude,
            };
          }

          return oldData;
        });

        if (category === 'activity_area') {
          router.push('/register-review/restaurant');
        } else {
          router.push('/select-restaurant');
        }
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
