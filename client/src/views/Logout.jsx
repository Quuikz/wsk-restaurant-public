import { useUserContext } from "../hooks/contextHooks"
import { useEffect } from 'react';

const Logout = () => {
    const { handleLogout } = useUserContext();


    useEffect(() => {
        handleLogout();
    }, []);

    return null;
};

export default Logout;