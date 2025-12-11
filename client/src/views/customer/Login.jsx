import {useState} from 'react';
import LoginForm from '../../components/BackupOfOldAssignments/LoginForm.jsx';
import RegisterForm from '../../components/BackupOfOldAssignments/RegisterForm.jsx';

/**
 * Login page that toggles between login and registration forms.
 *
 * @component
 * @returns {JSX.Element} Login/Register toggle view
 */
const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <h1>{showRegister ? 'Register' : 'Login'}</h1>

      {showRegister ? <RegisterForm /> : <LoginForm />}

      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister
          ? 'Already have an account? Click to Login'
          : 'Need an account? Click to Register'}
      </button>
    </>
  );
};

export default Login;
