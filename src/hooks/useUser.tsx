import { UserRes } from '@/apis/user/getUser';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';

export default function useUser() {
  if (typeof window === undefined)
    return {
      isLoggedIn: false,
    };

  const token = (sessionStorage as Storage).getItem('token') as string | undefined;

  const userData = queryClient.getQueryData(['user']) as UserRes;

  return {
    isLoggedIn: Boolean(token),
    token,
    hasActivityArea: userData ? Boolean(userData?.activity_area?.address) : false,
    data: {
      ...userData,
    },
  };
}
