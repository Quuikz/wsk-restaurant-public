import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import { Children } from 'react';

/**
 * A component that protects admin routes.
 * Only renders its children if the user is authenticated and has an admin role.
 * Otherwise, redirects to home page for unauthenticated.
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