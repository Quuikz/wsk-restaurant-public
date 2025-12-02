//node imports
import express from 'express';

//other imports
import {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser, getUserByUsername,
} from '../controllers/user-controller.js';

//middleware
import multer from "multer";
import authenticateToken from "../../middlewares/authenticateToken.js";
import userIsAdmin from "../../middlewares/userIsAdmin.js";
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";
import {createImageScaler} from "../../middlewares/createImageScaler.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatParamTypes from "../../middlewares/formatParamTypes.js";

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
        formatBodyTypes,
        postUser);


//endpoint http://hostname:port/api/users/:id
userRouter.route('/:id')
    .get(authenticateToken, filterByUserIdOrAdmin, formatIdToNumber, getUserById)
    .put(authenticateToken, filterByUserIdOrAdmin, formatIdToNumber, putUser)
    .delete(authenticateToken, filterByUserIdOrAdmin, formatIdToNumber, deleteUser);

//endpoint http://hostname:port/api/users/byname/:username
userRouter.route('/username/:username')
    .get(authenticateToken, userIsAdmin, formatParamTypes, getUserByUsername);


export default userRouter;




