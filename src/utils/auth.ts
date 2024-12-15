import { getServerToken } from '@/utils/cookies';
import { redirect } from 'next/navigation';

export function requireNoAuth(redirectPath = '/') {
  const token = getServerToken();

  if (token) {
    redirect(redirectPath);
  }
}

export function requireAuth(redirectPath = '/') {
  const token = getServerToken();

  if (!token) {
    redirect(redirectPath);
  }
}
