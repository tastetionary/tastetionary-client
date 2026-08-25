import { parseCookies } from 'nookies';

export default function useToken() {
  const token = parseCookies().token;

  return { token };
}
