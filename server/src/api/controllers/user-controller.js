'use strict';


// TODO: user passwords must not be returned with responses!!!


import bcrypt from 'bcrypt';

import {addUser, findUserById, listAllUsers, modifyUser, removeUser, findUserByUsername} from "../models/user-model.js";

const getUsers = (req, res) => {
    console.log('getUsers in user-controller')
    listAllUsers().then(
        result => {
            res.json(result);
        },

        (result) => {
            console.log('error in listAllUsers');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const getUserById = (req, res) => {
    console.log('getUserById in user-controller')
    console.log(req.params.id);
    const user = findUserById(req.params.id);
    user.then(
        user => {
            if (user) {
                console.log('return user: ',user)
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getUserById in user-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

/**
 *
 * @param req
 * @param res
 */
const postUser = (req, res) => {
    try {
        console.log('postUser in user-controller');
        console.log(req.body);

        //Bcrypt password hash
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        addUser(req.body).then(
            user => {
                if (user) {
                    console.log('added user: ', user)

                    const userWithNoPassword = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        name: user.name,
                        email: user.email,
                        image : user.image,
                        message : user.message
                    }

                    res.json(userWithNoPassword);

                } else {
                    res.sendStatus(404);
                }
            },
            result => {
                console.log('error in postUser in user-controller');
                console.log(result);
                res.sendStatus(500);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const putUser = (req, res) => {
    console.log('putUser in user-controller');
    console.log('user authorized:' +res.locals.user);
    console.log(req.body);
    console.log(req.params.id);


    const result = modifyUser(req.body, req.params.id);
    result.then(
        user => {
            if (user) {
                console.log('return user: ',user);
                const userWithNoPassword = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    image : user.image,
                    message : user.message
                }
                res.json(userWithNoPassword);

            } else {
                res.sendStatus(404);
            }
        },
        error => {
            console.log('error in putUser in user-controller');
            console.log(error);
            res.sendStatus(500);
        }
    );
};

const deleteUser = (req, res) => {
    console.log('deleteUser in user-controller');
    console.log(req.params.id);
    console.log(res.locals.user);

    let message = removeUser(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.status(200).send(message);
            } else {
                console.log('deleteUser: user not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteUser in user-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

/**
 *
 * @param req
 * @param res
 */
const getUserByUsername = (req, res) => {
    console.log('getUserByUsername in user-controller')
    console.log('username: ',req.params.username);

    const user = findUserByUsername(req.params.username);
    user.then(
        user => {
            if (user) {
                console.log('return user: ',user)
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getUserByUsername in user-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

/**
 * Takes an array if id numbers from request.body and returns a corresponding array of objects.
 * @param req
 * @param res
 */
const getUserList = async (req, res) => {
    try {
        console.log('getUserList in user-controller')

        if (req.body.users) {
            const userArray = await Promise.all( req.body.users.map( id => findUserById(id) ));
            console.log('users found: ', userArray);
            res.json(userArray);

        } else {
            console.log('no id array in getUserList in user-controller');
            res.status(404).send('No id array found in request.');
        }

    } catch (error) {
        console.log('error in getUserList in user-controller');
        res.sendStatus(500);
    }
}


export {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    getUserByUsername,
    getUserList
};
