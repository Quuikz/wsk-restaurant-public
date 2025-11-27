import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";
import {useUserContext} from '../hooks/contextHooks';


const LoginForm = () => {


    const { postLogin } = useAuthentication();


    const initValues = {
    username: '',
    password: '',
    };


    const {handleLogin} = useUserContext();
    
    const doLogin = async () => {
        //console.log(inputs);
        // TODO: add login functionalities here
        try{
            handleLogin(inputs);
        }
        catch(error){
            alert(error.message);
        }
    };
    
    const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);
    
    console.log(inputs);

    return (
        <>
        <form onSubmit={ handleSubmit }>
        <div>
            <label htmlFor="loginuser">Username</label>
            <input
                name='username'
                type="text"
                id="loginuser"
                onChange={ handleInputChange }
                autoComplete="username"  
                value={inputs.username}          
            />
        </div>
        <div>
            <label htmlFor="loginpassword">Password</label>
            <input
                name="password"
                type="password"
                id="loginpassword"
                onChange={ handleInputChange }
                autoComplete="current-password"
                value={inputs.password}

            />
        </div>
        <button type="submit">Login</button>  
        </form>      
        </>
    );
};

export default LoginForm;