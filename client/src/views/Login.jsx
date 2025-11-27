 // imports here
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
   
 const Login = () => {

    const [showRegister, setShowRegister] = useState(false);






   return (
     <>
     <h1>{showRegister ? 'Register' : 'Login'}</h1>

     {showRegister ? <RegisterForm/> : <LoginForm/>}

     <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? 'Already have an account? Click to Login'
                        : 'Need an account? Click to Register'}
     </button>
       {/*<LoginForm/>*/}
       {/*<RegisterForm/>*/}
     </>
   );
 };
    
 export default Login;