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
      <div>
        <CheckBox2
          checkBoxId={type}
          onChangeEvent={checked => onChangeCheckbox(checked, 'service')}
          checked={checked}
        />
      </div>
      <div className="flex w-full items-center justify-between text-xs font-normal text-neutral-bg80">
        <p className="!font-pretendard text-neutral-bg80">{title}</p>
        <button className="default-btn px-[12px] py-[4px]" onClick={onNext}>
          보기
        </button>
      </div>
    </div>
  );
}
