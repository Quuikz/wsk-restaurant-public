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
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";


const userRouter = express.Router();


//endpoint http://hostname:port/api/users
userRouter.get('/',authenticateToken, userIsAdmin, getUsers)
    .post('/', postUser); //TODO: tilaukset vain kirjautuneille käyttäjille


//endpoint http://hostname:port/api/users/:id
userRouter.route('/:id')
    .get(authenticateToken, filterByUserIdOrAdmin, getUserById)
    .put(authenticateToken, filterByUserIdOrAdmin,  putUser)
    .delete(authenticateToken, filterByUserIdOrAdmin, deleteUser);


export default userRouter;




