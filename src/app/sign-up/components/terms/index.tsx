import DefaultButton from '@/components/Button/DefaultButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import Header from '@/components/Header';
import { useAgreeTermStore } from '@/store/useAgreeTermStore';
import { useRouter } from 'next/navigation';
import AgreementCheckbox from '../agreement-checkbox';

interface Props {
  onNext: () => void;
}

export default function Terms({ onNext }: Props) {
  const router = useRouter();

  const { marketing, privacy, service, setAllToggle, setToggle } = useAgreeTermStore();

  const handleChangeAgreeTerms = (checked: boolean, type: 'all' | 'privacy' | 'marketing' | 'service') => {
    if (type === 'all') {
      return setAllToggle(checked);
    }
    return setToggle(type, checked);
  };

  return (
    <>
      <Header title="회원 가입" />
      <div className="mx-8 mt-20">
        <header>
          <h1 className="!font-pretendard text-xl font-bold leading-8">
            안녕하세요 👋 <br /> 맛셔너리 이용을 위해 아래 약관에 동의해주세요.
          </h1>
          <p className="mt-3 !font-pretendard leading-5 text-neutral-bg80">
            서비스 이용을 위해 동의가 필요합니다. <br />
            정책 및 약관을 확인하신 후, 회원가입을 진행해주세요.
          </p>
        </header>
        <section>
          <div className="mt-12">
            {/* 전체 이용 약관 */}
            <div className="flex justify-center border-1 border-solid border-black p-[3%]">
              <CheckBox2
                checkBoxId="all"
                label="약관 전체 동의하기"
                onChangeEvent={checked => handleChangeAgreeTerms(checked, 'all')}
                checked={privacy && marketing && service}
              />
            </div>

            <div className="mt-6">
              {/* 만 14세 이상 */}
              <AgreementCheckbox
                type="service"
                title="[필수] 만 14세 이상입니다."
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'service')}
                checked={service}
                onNext={() => router.push('/sign-up?step=terms-of-service')}
              />

              {/* 서비스 이용 약관 (완료)*/}
              <AgreementCheckbox
                type="service"
                title="[필수] 서비스 이용약관"
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'service')}
                checked={service}
                onNext={() => router.push('/sign-up?step=terms-of-service')}
              />

              {/* 개인정보 처리 방침 (완료)*/}
              <AgreementCheckbox
                type="privacy"
                title="[필수] 개인정보 처리방침"
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'privacy')}
                checked={privacy}
                onNext={() => router.push('/sign-up?step=privacy-notice')}
              />

              {/* 위치 기반 서비스 이용 약관 */}
              <AgreementCheckbox
                type="marketing"
                title="[선택] 위치 기반 서비스 이용 약관"
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'marketing')}
                checked={marketing}
                onNext={() => router.push('/sign-up?step=opt-in-marketing')}
              />
            </div>
          </div>
        </section>
        <footer className="fixed bottom-[30px] w-[300px]">
          <DefaultButton
            bgColor="yellow"
            customStyle="flex w-full py-[12px] px-[16px]"
            disabled={!(marketing && privacy && service)}
            onClick={onNext}
          >
            <span className="font-pretendard text-white">다음</span>
          </DefaultButton>
        </footer>
      </div>
    </>
  );
}
