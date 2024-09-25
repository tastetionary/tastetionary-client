import IC_EMAIL from '@/assets/common/Icons/email.svg';
import LOGO_APPLE from '@/assets/logo/sns/logo_apple.svg';
import LOGO_GOOGLE from '@/assets/logo/sns/logo_google.svg';
import LOGO_KAKAO from '@/assets/logo/sns/logo_kakao.svg';
import LOGO_NAVER from '@/assets/logo/sns/logo_naver.svg';
import clsx from 'clsx';
import { ButtonHTMLAttributes, Fragment } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loginType: 'kakao' | 'naver' | 'google' | 'apple' | 'email';
}

export default function LoginBtn({ loginType, ...rest }: Props) {
  const loginButtonDefaultStyle = (bgColor: string) => {
    return `default-btn bg-${bgColor}`;
  };

  if (loginType === 'naver')
    return (
      <Fragment>
        <button
          className={clsx(`${loginButtonDefaultStyle('[#5AC467]')} h-48 w-48`)}
          style={{ backgroundColor: '#5AC467' }}
          {...rest}
        >
          <LOGO_NAVER width={24} height={24} />
        </button>

        <div id="naverIdLogin" style={{ display: 'none' }} />
      </Fragment>
    );

  return (
    <button
      className={
        loginType === 'kakao'
          ? `default-btn w-full gap-xs bg-[#fae64d] py-sm`
          : clsx(`${loginButtonDefaultStyle(loginType === 'apple' ? 'black' : 'white')} h-48 w-48`)
      }
      {...rest}
    >
      {loginType === 'email' ? (
        <IC_EMAIL width={24} height={24} />
      ) : loginType === 'google' ? (
        <LOGO_GOOGLE width={24} height={24} />
      ) : loginType === 'apple' ? (
        <LOGO_APPLE width={24} height={24} />
      ) : (
        <LOGO_KAKAO width={20} height={20} />
      )}
      {loginType === 'kakao' && <span className="body1">카카오 로그인</span>}
    </button>
  );
}
