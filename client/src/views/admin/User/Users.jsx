import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/admin/apiHooks";
import UsersRow from "../../../components/admin/UsersRow";

const UsersAdminView = () => {

    const { getAllUsers } = useUser();
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


    return(
        <>
        <h1>Users</h1>

        <li className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Username</span>
            <span>Role</span>
            <span>Email</span>
            <span>Active</span>
        </li>

        <ul>
            {users.map((user) => (
                <UsersRow 
                    key={user.id}
                    user={user}
                />
            ))}
        </ul>
        </>
    );
}

export default UsersAdminView;