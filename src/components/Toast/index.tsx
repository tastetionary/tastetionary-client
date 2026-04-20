'use client';

import IC_CHECK from '@/assets/common/Icons/check.svg';
import IC_EMAIL from '@/assets/common/Icons/email.svg';
import IC_PENCIL from '@/assets/common/Icons/pencil.svg';
import IC_PROHIBIT from '@/assets/common/Icons/prohibit.svg';
import { toast, ToastContainer } from 'react-toastify';
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
      icon={({ type }) => {
        console.log(type);

        return <></>;
      }}
      closeButton={() => <></>}
    />
  );
}
