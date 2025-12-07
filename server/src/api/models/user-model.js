'use strict';

//import
import bcrypt from "bcrypt";
import promisePool from "../../utils/database.js";

//default datastructure
const default_user = {
    id : 0,
    username : "default username",
    password: "default name",
    role: "user",
    name: "default",
    email: "default",
    message: 'default user object, image at //hostname:port/images/users/placeholder.jpg',
    image: "placeholder.jpg"
}

/**
 *
 * @return {Promise<[{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, user_code: string, date_start: string, date_end: string, message: string}]|boolean>}
 * array of all objects or false if error
 */
const listAllUsers = async () => {
    try {
        console.log('listAllUsers in user-model');
        const [userArray] = await promisePool.query('SELECT * FROM users');
        //console.log('userArray:', userArray);
        return userArray;

    } catch (error) {
        console.log('error in listAllUsers in user-model');
        console.log(error);
        return false;
    }
};

/**
 *
 * @param id
 * @return {Promise<*|boolean>}
 * first object that has the id or false if not found or error
 */
const findUserById = async (id) => {
    try {
        console.log('findUserById in user-model');
        const query = promisePool.format('SELECT * FROM users where id = ?', id);
        const [userArray] = await promisePool.execute(query);


        if (userArray.length > 0) {
            return userArray[0];

        } else if (userArray.length > 1) {
            console.log('user table has multiple users with same id!');
            return userArray[0];
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
 * @return {Promise<{user: *}|boolean>}
 * object added to database or false if fails
 */
const addUser = async (user) => {
    try {
        console.log('addUser in user-model');

        //default user values overridden by user
        const newUser = {...default_user, ...user, message: "new user added by user-model"};

        //sql statement
        const sql =  `INSERT INTO users (username, password, role, name, email, image, message)
               VALUES (?,?,?,?,?,?,?)`;
        console.log(sql);

        //sql parameters, password has to be hashed
        const params = [
            newUser.username,
            bcrypt.hashSync(newUser.password, 10),
            newUser.role,
            newUser.name,
            newUser.email,
            newUser.image,
            newUser.message
        ];
        console.log(params);

        //execute sql
        const rows = await promisePool.execute(sql, params);
        console.log('rows', rows);

        //return added user
        if (rows[0].affectedRows === 0) {
            console.log('User not added');
            return false;

        } else {
            return  findUserById(rows[0].insertId);
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 * Modifies a user by id.
 *
 * @param user user object, only fields given will be updated
 * @param userId number
 * @return {Promise<*|boolean>}
 * modified user or false if error or not found
 */
const modifyUser = async (user, userId) => {
    try {
        console.log('modifyUser: ', userId, user);

        //get previous user
        const previousUser = await findUserById(userId);

        //abort if not found
        if (!previousUser) {
            return false;
        }

        //previous user values overridden by new user
        const updatedUser = {...previousUser, ...user, message: "user modified by user-model"};

        //sql statement
        const sql = `UPDATE users SET username = ?, password = ?, role = ?, name = ?, email = ?, image = ?, message = ?
                     WHERE users.id = ?`;
        console.log(sql);

        //sql parameters
        const params = [
            updatedUser.username,
            updatedUser.password,
            updatedUser.role,
            updatedUser.name,
            updatedUser.email,
            updatedUser.image,
            updatedUser.message,
            userId
        ];
        console.log(params);

        //execute sql
        const rows = await promisePool.execute(sql, params);
        console.log('rows', rows);

        //return modified user of false if no affected rows
        if (rows[0].affectedRows !== 0) {
            console.log('return modified user id: ',userId);
            return findUserById(userId);

        } else {
            console.log('User not modified');
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
        //TODO: this fails duo to foreign key constraints...

        // Prepare delete statement and execute
        const sql = "DELETE FROM users WHERE id = ?";
        const params = [userId];
        const [rows] = await promisePool.execute(sql, params);
        // console.log("rows", rows);

        if (rows.affectedRows === 0) {
            console.log("User not found or not removed");
            return false;
        }

        return true;

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
        console.log('findUserByUsername in user-model');

        //sql query to get user with username
        const query = promisePool.format('SELECT * FROM users where username = ?', username);
        const [userArray] = await promisePool.execute(query);

        //only 1 result should be found
        if (userArray.length > 0) {
            return userArray[0];

        } else if (userArray.length > 1) {
            //if multiple results exist, first one will be returned
            console.error('user table has multiple users with same username!');
            return userArray[0];

        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};


export {listAllUsers, findUserById, addUser, modifyUser, removeUser, findUserByUsername};
