import LoginPage from './components/LoginPage';
import { withNoAuth } from '@/utils/auth';

function Login() {
  return <LoginPage />;
}

export default withNoAuth(Login);
