import { withNoAuth } from '@/utils/auth';
import LoginPage from './components/LoginPage';

function Login() {
  return <LoginPage />;
}

export default withNoAuth(Login);
