import LoginPage from './components/LoginPage';
import { withNoAuth } from '@/shared/utils/auth';

function Login() {
  return <LoginPage />;
}

export default withNoAuth(Login);
