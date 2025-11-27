import useForm from "../hooks/formHooks";
import { useAuthentication, useUser } from "../hooks/apiHooks";



const RegisterForm = () => {

    const { postUser } = useUser();
 
    const initValues = {
        username: '',
        email: '',
        password: '',
    };

    const doRegister = async () => {


        try{
            const result = await postUser(inputs);
            console.log(result);


        }catch(error){
            console.log('Error in doRegister', error);
        }
    };

    const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, initValues);

    return (
        <>
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="registeruser">Username</label>
                <input
                    name='username'
                    type='text'
                    id='registeruser'
                    onChange={ handleInputChange }
                    autoComplete="username"
                    value={inputs.username}
                />
            </div>
            <div>
                <label htmlFor="registeremail">Email</label>
                <input
                    name='email'
                    type='email'
                    id='registeremail'
                    onChange={ handleInputChange }
                    autoComplete="email"
                    value={inputs.email}
                />
            </div>
            <div>
                <label htmlFor="registerpassword">Password</label>
                <input
                    name='password'
                    type='password'
                    id='registerpassword'
                    onChange={ handleInputChange }
                    autoComplete="current-password"
                    value={inputs.password}
                />
            </div>
            <button type="submit">Register</button>
        </form>
        </>
    );



};


export default RegisterForm;