'use client';

import { toast, ToastContainer } from 'react-toastify';
import IC_CHECK from '@/assets/common/Icons/check.svg';
import IC_EMAIL from '@/assets/common/Icons/email.svg';
import IC_PENCIL from '@/assets/common/Icons/pencil.svg';
import IC_PROHIBIT from '@/assets/common/Icons/prohibit.svg';
import 'react-toastify/dist/ReactToastify.css';

type ToastIcon = 'pencil' | 'check' | 'prohibit' | 'mail';

export const iconToast = (message: string, type: ToastIcon) => {
  const getIconComponent = () => {
    switch (type) {
      case 'check':
        return IC_CHECK && <IC_CHECK />;
      case 'pencil':
        return IC_PENCIL && <IC_PENCIL />;
      case 'prohibit':
        return IC_PROHIBIT && <IC_PROHIBIT />;
      case 'mail':
        return IC_EMAIL && <IC_EMAIL width={24} height={24} />;
      default:
        return false;
    }
  };

  toast(<span style={{ color: '#ffffff' }}>{message}</span>, {
    icon: getIconComponent(),
    style: { color: '#ffffff' },
  });
};

/** ToastContainer 의 아이콘·닫기 버튼을 비운다. 렌더마다 새 컴포넌트가 만들어지지 않도록 모듈 스코프에 둔다. */
const RenderNothing = () => <></>;

export default function Toast() {
  return (
    <ToastContainer
      className={'toast'}
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      icon={RenderNothing}
      closeButton={RenderNothing}
    />
  );
}
