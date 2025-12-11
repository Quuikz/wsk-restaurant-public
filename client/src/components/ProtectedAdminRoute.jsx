import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import { Children } from 'react';

/**
 * 
 * @param children - The components to render if the user is an admin.
 * @returns The children if user is admin, a loading message and a redirect to admin pages.
 */
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