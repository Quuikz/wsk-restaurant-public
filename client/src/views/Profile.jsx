import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
    const { getUserByToken } = useUser();
    const [user, setUser] = useState(null);



    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if(!token){
            console.log('no token found');
            return;
        }


        const getUserData = async () => {
            const userData = await getUserByToken(token);
            setUser(userData.user);
        };

        getUserData();
        
    }, []);


    return(
        <div>
            <h1>Profile</h1>
            <p>Some info about profile</p>
            {user ? (
                <>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                </> 
            ) : (
                <p>You must be logged in to see information on your profile.</p>
            )}
        </div>




    );
};

export default Profile;