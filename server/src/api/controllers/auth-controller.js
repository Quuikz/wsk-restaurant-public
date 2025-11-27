//import {findUserByUsername} from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = (req, res) => {
    console.log('login in auth-controller')
    console.log('user name: '+req.body.username);

        const user = {
            username: 'user',
            password: bcrypt.hashSync('password', 10)
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log('password correct');

            //create token
            const userWithNoPassword = {
                user_id: 'user_id',
                name: 'name',
                username: user.username,
                email: 'email',
                role: 'role',
            };

            //TODO: this lets
            if (req.body.username === 'admin') {
                userWithNoPassword.role = 'admin';
            }

            const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });

            res.json({user: userWithNoPassword, token});

        }


        /*  //TODO: replace with actual database query
    if(req.body.username !== undefined) {



        const user = findUserByUsername(req.body.username);
        user.then(
            user => {
                if (user) {
                    console.log('user found in auth-controller-login: ' + user)

                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        console.log('password correct');

                        //create token
                        const userWithNoPassword = {
                            user_id: user.user_id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            role: user.role,
                        };

                        const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
                            expiresIn: '24h',
                        });

                        res.json({user: userWithNoPassword, token});


                    } else {
                        console.log('password incorrect');
                        res.sendStatus(401);
                    }

                    res.json();


                } else {
                    res.sendStatus(401);
                }
            },
            error => {
                console.log('error in login in auth-controller');
                console.log(error);
                res.sendStatus(500);
            }
        );

    } else {
        console.log('undefined input in auth-controller');
        res.sendStatus(404);
    }

    */
}

const getMe = async (req, res) => {
    console.log('getMe', res.locals.user);
    if ( res.locals.user) {
        res.json({message: 'token ok', user:  res.locals.user});
    } else {
        res.sendStatus(401);
    }
};


export {login, getMe };
