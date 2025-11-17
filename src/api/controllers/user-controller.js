'use strict';

import bcrypt from 'bcrypt';

import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from "../models/user-model.js";

const getUser = (req, res) => {
    console.log('getUser in user-controller')
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
                console.log('return user: '+user)
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

const postUser = (req, res) => {
    console.log('postUser in user-controller');
    console.log(req.body);

    //Bcrypt password hash
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const result = addUser(req.body);
    result.then(
        result => {
            if (result) {
                console.log('return user: '+result)
                res.json(result);
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
};

const putUser = (req, res) => {
    console.log('putUser in user-controller');
    console.log('user authorized:' +res.locals.user);
    console.log(req.body);
    console.log(req.params.id);


    const result = modifyUser(req.body, req.params.id, res.locals.user);
    result.then(
        result => {
            if (result) {
                console.log('return user: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in putUser in user-controller');
            console.log(result);
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
                res.sendStatus(200);
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

export {getUser, getUserById, postUser, putUser, deleteUser};
