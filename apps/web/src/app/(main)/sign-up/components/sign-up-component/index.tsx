'use client';

// funnel.Render 의 단계별 prop 은 컴포넌트가 아니라 렌더 함수다. (@use-funnel 의 기본 사용법)
// oxlint-disable react/no-unstable-nested-components

import { SHA256 } from 'crypto-js';
import { useEffect, useState } from 'react';
import useRegisterUserMutate from '../../hooks/query/useRegisterUserMutate';
import { SignUpSteps } from '../../lib/funnel';
import SignUpComplete from '../complete';
import EmailForm from '../email-form';
import RegionSetting from '../region-setting';
import Terms from '../terms';
import UserInfoForm from '../user-info-form';
import VerifyAuthNumber from '@/app/(main)/find-password/components/verify-auth-number';
import { clearFunnel, useFunnel } from '@/shared/lib/use-funnel';

const FUNNEL_ID = 'sign-up';

/**
 * 회원가입 퍼널.
 *
 * 약관동의 → 이메일입력 → 인증코드 → 회원정보 → 지역설정 → 가입완료
 *
 * 단계 전환과 단계 간 데이터는 @use-funnel 이 맡는다. (라우터는 shared/lib/use-funnel 참고)
 * 각 단계는 자기 입력만 검증해서 onNext 로 넘기고, 다음 단계에 필요한 값은 lib/funnel.ts 의 타입이 강제한다.
 */
export default function SignUpComponent() {
  const funnel = useFunnel<SignUpSteps>({
    id: FUNNEL_ID,
    initial: { step: '약관동의', context: {} },
  });

  // 비밀번호는 저장소에 남기지 않으려고 퍼널 컨텍스트 대신 메모리에만 둔다. 그래서 새로고침하면 사라진다.
  const [password, setPassword] = useState('');

  const { mutate: registerUser, isPending } = useRegisterUserMutate({
    onNext: () => funnel.history.replace('가입완료', {}),
  });

  // 가입이 끝나면 앞 단계에서 모은 값(이메일, 인증 id 등)은 더 필요 없다.
  const isComplete = funnel.step === '가입완료';
  useEffect(() => {
    if (isComplete) clearFunnel(FUNNEL_ID, '가입완료');
  }, [isComplete]);

  return (
    <funnel.Render
      약관동의={({ history }) => <Terms onNext={() => history.push('이메일입력', {})} />}
      이메일입력={({ history }) => <EmailForm onNext={value => history.push('인증코드', value)} />}
      인증코드={({ context, history }) => (
        <VerifyAuthNumber
          type="register"
          email={context.email}
          historyId={context.historyId}
          onResent={historyId => history.replace('인증코드', { historyId })}
          onNext={authenticationId => {
            if (authenticationId == null) return;

            // 인증이 끝난 코드 입력 화면으로는 돌아올 이유가 없으므로 히스토리에 남기지 않는다
            history.replace('회원정보', { authenticationId });
          }}
        />
      )}
      회원정보={({ context, history }) => (
        <UserInfoForm
          email={context.email}
          onNext={value => {
            setPassword(value.password);
            history.push('지역설정', { nickname: value.nickname });
          }}
        />
      )}
      지역설정={({ context, history }) =>
        password === '' ? (
          // 새로고침으로 비밀번호가 사라진 경우. 가입 요청을 만들 수 없으니 회원정보를 다시 받는다.
          <UserInfoForm
            email={context.email}
            defaultNickname={context.nickname}
            onNext={value => {
              setPassword(value.password);
              history.replace('지역설정', { nickname: value.nickname });
            }}
          />
        ) : (
          <RegionSetting
            isSubmitting={isPending}
            onNext={area =>
              registerUser({
                area,
                nickname: context.nickname,
                account: {
                  identification: context.email,
                  // 서버에는 단방향 해시한 값을 보낸다
                  password: SHA256(password).toString(),
                  category: 'email',
                  authenticationId: context.authenticationId,
                },
                // 약관동의 단계에서 필수 동의(개인정보 처리방침)를 하지 않으면 여기까지 올 수 없다
                agreements: [{ category: 'personal_information', is_agree: true }],
              })
            }
          />
        )
      }
      가입완료={() => <SignUpComplete />}
    />
  );
}
