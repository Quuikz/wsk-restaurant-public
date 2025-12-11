import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import { Children } from 'react';


const ProtectedAdminRoute = ({ children }) => {
    const { user, loadingUser } = useUserContext();

    console.log("🔎 ProtectedAdminRoute check");
    console.log("loadingUser:", loadingUser);
    console.log("user:", user);
    console.log("user?.role:", user?.role);

    if(loadingUser){
        console.log("⏳ Still loading user...");
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