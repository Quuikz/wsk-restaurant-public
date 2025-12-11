 import {createContext, useEffect, useState} from 'react';
 import { useAuthentication, useUser } from '../hooks/common/apiHooks';
 import {useLocation, useNavigate} from 'react-router';
import { useUserCommon } from '../hooks/common/apiHooks';

 const UserContext = createContext(null);

 const UserProvider = ({children}) => {
     const [user, setUser] = useState(null);
     const {postLogin} = useAuthentication();
     const {getUserByToken} = useUser();
     const {deleteUserByID} = useUserCommon();

     const [loadingUser, setLoadingUser] = useState(true);

     const navigate = useNavigate();
     const location = useLocation();

     

     // login, logout and autologin functions are here instead of components
     const handleLogin = async (inputs) => {
         try {
             // post login credentials to API
             const { token, user } = await postLogin(inputs);
             // set token to local storage
             localStorage.setItem('token', token);
             //console.log(token);
             // set user to state
             setUser(user);
             // navigate to home
             navigate('/');
         } catch (e) {
             console.log(e.message);
         }
     };

     const handleLogout = () => {
         try {
             // remove token from local storage
             localStorage.removeItem('token');
             // set user to null
             setUser(null);
             // navigate to home or login page
             navigate('/');
         } catch (e) {
             console.log(e.message);
         }
     };

     // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
     const handleAutoLogin = async () => {
         try {
             // get token from local storage
             const token = localStorage.getItem('token');
             // if token exists, get user data from API
             if(!token){
                setLoadingUser(false);
                return;
             }
             const userData = await getUserByToken(token);
             //console.log('userData:', userData);
             // set user to state
             //console.log('userData from API:', userData.user);
             setUser(userData.user);
             // navigate to home
             //navigate(location.pathname);
             //navigate('/');
             //navigate(location.pathname);
         } catch (e) {
             console.log(e.message);
         }
         finally{
            setLoadingUser(false);
         }
     };


     // HandleDeleteUser is used when user clicks delete account. 
     const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token){
                return;
            }

            const userData = await getUserByToken(token);

            const result = await deleteUserByID(token, userData.user.id);
            localStorage.removeItem('token');
            setUser(null)
            navigate('/');
            console.log(result);
            return result;
        }
        catch (e) {
            console.log(e.message);
        }
     }

     useEffect(() => {
        handleAutoLogin();
     }, []);

     return (
         <UserContext.Provider
         value={{
            user,
            setUser,
            loadingUser,
            handleLogin,
            handleLogout,
            handleAutoLogin,
            handleDeleteUser,
        }}>
             {children}
         </UserContext.Provider>
     );
 };

 export {UserProvider, UserContext};
