import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

/**
 * A component that protects the routes for authenticated users.
 * Otherwise, redirects to home page if the user is not logged in.
 * 
 * @param children - The components to render if the user is authenticated.
 * @returns The children if user is authenticated, or redirects to main page.
 */
const ProtectedRoute = ({children}) => {
    const {user} = useUserContext();
    
    if (!user) {
        return <Navigate to="/" />;
    }
    
    return children;
};
    
export default ProtectedRoute;