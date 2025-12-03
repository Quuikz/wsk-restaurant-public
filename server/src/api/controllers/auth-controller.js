//import {findUserByUsername} from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function for getting user
import {findUserByUsername} from '../models/user-model.js';


const login = async (req, res) => {
    try {
        console.log('login in auth-controller')
        console.log('user name: ' + req.body.username);

        if (req.body.username !== undefined) {

            findUserByUsername(req.body.username).then(
                (user) => {
                    if (user) {
                        console.log('user found in auth-controller-login: ' + user)

                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            console.log('password correct');

                            //create token
                            const userWithNoPassword = {
                                id: user.id,
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                role: user.role,
                            };
                            const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
                                expiresIn: '24h',
                            });

                            //respond with user and token
                            res.json( {user: userWithNoPassword, token} );

                        } else {
                            console.log('password incorrect');
                            res.sendStatus(401);
                        }

                    } else {
                        console.log('user is null in auth-controller-login');
                        res.sendStatus(403);
                    }
                },
                (error) => {
                    console.log('error in login in auth-controller');
                    console.log(error);
                    res.sendStatus(500);
                }
            );

        } else {
            console.log('undefined input in auth-controller');
            res.sendStatus(404);
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

/**
 * Validates user token
 * @param req
 * @param res
 * @return {Promise<void>}
 * {message: 'token ok', user:  res.locals.user} or 401 if invalid
 */
const validateToken = async (req, res) => {
    console.log('validateToken', res.locals.user);
    if ( res.locals.user) {
        res.json({message: 'token ok', user:  res.locals.user});
    } else {
        res.sendStatus(401);
    }
};


export {login, validateToken};
