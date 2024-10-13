import DefaultButton from '@/components/Button/DefaultButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';

interface Props {
  type: string;
  title: string;
  onChangeCheckbox: (checked: boolean, type: string) => void;
  checked: boolean;
  onNext: () => void;
}

export default function AgreementCheckbox({ type, title, onChangeCheckbox, checked, onNext }: Props) {
  return (
    <div className="flex items-center px-4 py-2.5">
      <div className="relative w-full">
        <CheckBox2
          label={title}
          checkBoxId={type}
          onChangeEvent={checked => onChangeCheckbox(checked, 'service')}
          checked={checked}
          bg="orange"
        />
        <DefaultButton bgColor="gray" customStyle="px-[12px] py-[4px] absolute right-0 top-0 text-xs">
          보기
        </DefaultButton>
      </div>
    </div>
  );
}
