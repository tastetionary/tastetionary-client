import IC_CHEVRON from '@/assets/common/Icons/chevron.svg';
import IC_PIN from '@/assets/common/Icons/pin.svg';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import DefaultButton from '../Button/DefaultButton';

interface Props {
  type: 'activity_area' | 'dining_area';
}

export default function CChangeRegion({ type }: Props) {
  const router = useRouter();
  const { data } = useUser();

  const onClickEvent = () => {
    if (type === 'dining_area') {
      router.push('/select-restaurant/region-setting');
    } else {
      router.push('/register-review/region-setting');
    }
  };

  return (
    <div className="w-full px-12 py-12">
      <div
        className="flex w-full items-center justify-between rounded-4 border-1 border-solid border-neutral-bg10 bg-neutral-bg05 px-16 py-9"
        onClick={onClickEvent}
      >
        <div className="flex items-center gap-xs">
          <IC_PIN width={16} height={16} />

          <span className="body2">{data?.area?.address ?? ''}</span>
        </div>

        <DefaultButton bgColor="gray" customStyle="flex items-center gap-xxs py-4 pr-12 pl-8">
          <span className="body2">지역 변경</span>

          <IC_CHEVRON width={16} height={16} />
        </DefaultButton>
      </div>
    </div>
  );
}
