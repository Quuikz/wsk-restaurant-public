
//example datastructure
import {default_user} from "../../../../database/datastructures.js";
import bcrypt from "bcrypt";

//TODO: replace with actual database queries
const users = [
    {...default_user, id: 1, role: "admin", username: "admin", password: bcrypt.hashSync('password', 10), message: "admin id 1 in user model"},
    {...default_user, id: 2, role: "user", username: "user", password: bcrypt.hashSync('password', 10), message: "user id 2 in user model"},
    {...default_user, id: 3, role: "user2", username: "abc", password: bcrypt.hashSync('password', 10), message: "user id 3 in user model"},
];



/**
 *
 * @return {Promise<[{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string}]|boolean>}
 * array of all objects or false if error
 */
const listAllUsers = async () => {
    try {
        return users;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return {Promise<{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string}|boolean>}
 * first object that has the id or false if not found or error
 */
const findUserById = async (id) => {
    try {
        const resultArray = users.filter(user => user.id === Number(id));
        if (resultArray.length > 0) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param user
 * @return {Promise<{id: number, password: *, role: string, name: string, email: string, username: string, message: string}|{id: number, password: *, role: string, name: string, email: string, username: string, message: string}|{id: number, password: *, role: string, name: string, email: string, username: string, message: string}|boolean>}
 * object added to array/database or false if fails
 */
const addUser = async (user) => {
    try {
        //default user values overridden by user, role overridden to prevent creating admins
        const newUser = {...default_user, ...user, role:"user"};
        users.push(newUser);
        return users[users.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 *
 * @param user user object
 * @param userId number
 * @return {Promise<*|boolean>}
 * user or false if error or not found
 */
const modifyUser = async (user, userId) => {
    try {
        console.log('modifyUser: ',userId, user);
        const index = users.findIndex( (d) => {
            console.log(d.id, userId);
            return  d.id === Number(userId);  //Has to be number!
        } );

        //TODO: prevent user from updating themselves admin...
        if (index >= 0) {
            console.log('found at:'+index);
            users.splice(index,1, {...users[index], ...user });
            return users[index];

        } else {
            console.log('not found: ',userId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param userId number
 * @return {Promise<boolean>} false if not found
 */
const removeUser = async (userId) => {
    try {
        const index = users.findIndex(user => user.id === Number(userId));
        if (index >= 0) {
            users.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

};

/**
 * @param username
 * @return
 * object filtered by parameter given or false if error or not found
 *
 */
const findUserByUsername = async (username) => {
    try {
        const resultArray = users.filter(user => user.username === username);
        if (resultArray) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export {listAllUsers, findUserById, addUser, modifyUser, removeUser, findUserByUsername};
