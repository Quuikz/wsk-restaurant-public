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
import {createImageScaler} from "../../middlewares/createImageScaler.js";
import multer from "multer";

//router
const userRouter = express.Router();

//configurable middleware for image scaling
const imageScaler = createImageScaler(160, 160, './public/images/users', '_user', 'png');

//multer
const multerUpload = multer({
    dest: './uploads/'  //uploads kansio
});

//endpoint http://hostname:port/api/users
userRouter.get('/',authenticateToken, userIsAdmin, getUsers)
    .post('/',
        multerUpload.single('file'),
        imageScaler,
        postUser);


//endpoint http://hostname:port/api/users/:id
userRouter.route('/:id')
    .get(authenticateToken, filterByUserIdOrAdmin, getUserById)
    .put(authenticateToken, filterByUserIdOrAdmin,  putUser)
    .delete(authenticateToken, filterByUserIdOrAdmin, deleteUser);

//endpoint http://hostname:port/api/users/byname/:username
userRouter.route('/byname/:username')


export default userRouter;




