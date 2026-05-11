import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { useAgreeTermStore } from '@/store/useAgreeTermStore';
import { useRouter } from 'next/navigation';
import AgreementCheckbox from '../agreement-checkbox';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function Terms({ onNext }: Props) {
  const router = useRouter();

  const { marketing, privacy, service, moreThan14, locationBased, setAllToggle, setToggle } = useAgreeTermStore();
  const allCheckedState = moreThan14 && locationBased && service && privacy ? 'all' : 'default';

  const handleChangeAgreeTerms = (
    checked: boolean,
    type: 'all' | 'privacy' | 'marketing' | 'service' | 'moreThan14' | 'locationBased'
  ) => {
    if (type === 'all') {
      return setAllToggle(checked);
    }
    return setToggle(type, checked);
  };

  return (
    <>
      <CHeader title="회원 가입" />
      <div className="mx-xl mb-20 mt-xl">
        <header>
          <h1 className="title2 font-bold">
            안녕하세요 👋 <br /> 맛셔너리 이용을 위해
            <br />
            아래 약관에 동의해주세요.
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            서비스 이용을 위해 동의가 필요합니다. <br />
            정책 및 약관을 확인하신 후, 회원가입을 진행해주세요.
          </p>
        </header>
        <section>
          <div className="mt-xl">
            {/* 전체 이용 약관 */}
            <div className={S.agreeAllCheckedVariants({ checked: allCheckedState })}>
              <CheckBox2
                checkBoxId="all"
                label="약관 전체 동의하기"
                onChangeEvent={checked => handleChangeAgreeTerms(checked, 'all')}
                checked={privacy && marketing && service && locationBased && moreThan14}
              />
            </div>

            <div className="mt-md">
              {/* 만 14세 이상 */}
              <AgreementCheckbox
                type="moreThan14"
                title="[필수] 만 14세 이상입니다."
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'moreThan14')}
                checked={moreThan14}
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
                type="locationBased"
                title="[선택] 위치 기반 서비스 이용 약관"
                onChangeCheckbox={checked => handleChangeAgreeTerms(checked, 'locationBased')}
                checked={locationBased}
                onNext={() => router.push('/sign-up?step=opt-in-marketing')}
              />
            </div>
          </div>
        </section>
      </div>

      <BottomButtonContainer>
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-sm px-md"
          disabled={!(privacy && service && moreThan14)}
          onClick={onNext}
          type="button"
        >
          <span className="font-pretendard text-white">다음</span>
        </DefaultButton>
      </BottomButtonContainer>
    </>
  );
}
