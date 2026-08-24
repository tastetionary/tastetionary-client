import { getGoogleAuthUrl } from '../lib/socialRedirectUri';

export default function useGoogleLogin() {
  const loginHandler = () => {
    // Google OAuth URL로 이동 (client_id 가 없으면 null 이라 이동하지 않는다)
    const authUrl = getGoogleAuthUrl();
    if (!authUrl) return;

    window.location.href = authUrl;
  };

  return { loginHandler };
}
