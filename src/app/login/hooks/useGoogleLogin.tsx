import { useGoogleLogin as useGoogleOAuthLogin } from '@react-oauth/google';
import axios from 'axios';

interface Props {
  successEvent: (provider: string, providerId: string) => void;
}

export default function useGoogleLogin({ successEvent }: Props) {
  const googleLogin = useGoogleOAuthLogin({
    onSuccess: async (codeResponse: any) => {
      console.log(codeResponse);

      try {
        const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${codeResponse?.access_token ?? ''}`,
          },
        });
        console.log(userData);

        if (userData?.data?.sub) {
          successEvent('google', userData?.data?.sub ?? ''); // login
        }
      } catch (err) {
        console.log(err);
      }
    },
    onError: err => console.log(err),
    flow: 'implicit',
  });

  return { googleLogin };
}
