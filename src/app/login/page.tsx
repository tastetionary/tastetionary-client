import { requireNoAuth } from '@/utils/auth';
import LoginPage from './components/LoginPage';

export default function Login() {
  requireNoAuth();

  return <LoginPage />;
}
