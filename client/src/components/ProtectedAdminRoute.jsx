import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import { Children } from 'react';


const ProtectedAdminRoute = ({ children }) => {
    const { user, loadingUser } = useUserContext();

    if(loadingUser){
        return <div>Loading...</div>;
    }

    if(!user){
        return <Navigate to="/" />;
    }

    if(user.role != 'admin'){
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedAdminRoute;