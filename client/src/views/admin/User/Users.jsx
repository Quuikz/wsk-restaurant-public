import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/admin/apiHooks";
import UsersRow from "./UsersRow";

const UsersAdminView = () => {

    const { getAllUsers, updateUserByID } = useUser();
    const [users, setUsers] = useState([]);

    const loadAllUsers = async () => {
        const token = localStorage.getItem('token');

        try{
            const usersData = await getAllUsers(token);
            console.log(usersData);
            setUsers(usersData);
        }
        catch(error){
            console.log('Error in loading all users: ', error);
        }
    }

    useEffect(() => {
        loadAllUsers();
    }, []);


    const handleModifyUserStatus = async (input, user) => {
        const userData = {
            deleted: input,
        };

        try{
            const token = localStorage.getItem('token');
            if(!token){
                return;
            }
            const result = await updateUserByID(userData, token, user.id);
            return result
        }
        catch(error){
            console.log('Error in handleModifyUserStatus: ', error);
        }
    }


    const handleAccountStatus = async (user) => {
        if (!user){
            return;
        }

        const newStatus = user.deleted == 0 ? 1 : 0;
        const updatedUser = await handleModifyUserStatus(newStatus, user);
        
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

        return updatedUser;
    }


    return(
        <>
        <h1>Users</h1>

        <li className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Username</span>
            <span>Role</span>
            <span>Email</span>
            <span>Status</span>
            <span>Action</span>
        </li>

        <ul>
            {users.map((user) => (
                <UsersRow 
                    key={user.id}
                    user={user}
                    onModify={() => handleAccountStatus(user)}
                />
            ))}
        </ul>
        </>
    );
}

export default UsersAdminView;