//node imports
import express from 'express';

//other imports
import {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
} from '../controllers/user-controller.js';
import authenticateToken from "../../middlewares/authenticateToken.js";
import userIsAdmin from "../../middlewares/userIsAdmin.js";


const userRouter = express.Router();


//endpoint http://hostname:port/api/users
userRouter.get('/',authenticateToken, userIsAdmin, getUsers)
    .post('/', postUser);


//endpoint http://hostname:port/api/users/:id
userRouter.route('/:id')
    .get(authenticateToken, getUserById)
    .put(authenticateToken, putUser)
    .delete(authenticateToken, deleteUser);


export default userRouter;




