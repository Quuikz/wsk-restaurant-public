//node imports
import express from 'express';

//other imports
import {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    getUserByUsername,
    isUsernameTaken,
    getUserList,
} from '../controllers/user-controller.js';

//middleware
import multer from "multer";
import authenticateToken from "../../middlewares/authenticateToken.js";
import userIsAdmin from "../../middlewares/userIsAdmin.js";
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";
import createImageScaler from "../../middlewares/createImageScaler.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatParamTypes from "../../middlewares/formatParamTypes.js";
import createMulterUploader from "../../middlewares/createMulterUploader.js";

//router
const userRouter = express.Router();

//multer upload
const imageUploader = createMulterUploader('./uploads');

//configurable middleware for image scaling
const imageScaler = createImageScaler(160, 160, './public/images/users', '_user', 'webp');



//endpoint http://hostname:port/api/users
userRouter.get('/',authenticateToken, userIsAdmin, getUsers)
    .post('/',
        imageUploader,
        imageScaler,
        formatBodyTypes,
        postUser);


//endpoint http://hostname:port/api/users/:id
userRouter.route('/:id')
    .get(authenticateToken, formatIdToNumber, filterByUserIdOrAdmin, getUserById)
    .put(authenticateToken,
        formatIdToNumber,
        filterByUserIdOrAdmin,
        imageUploader,
        imageScaler,
        formatBodyTypes,
        putUser)
    .delete(authenticateToken, formatIdToNumber, filterByUserIdOrAdmin, deleteUser);

//endpoint http://hostname:port/api/users/username/:username
userRouter.route('/username/:username')
    .get(authenticateToken, userIsAdmin, formatParamTypes, getUserByUsername);

//Retruns boolean if username exists already.
//endpoint http://hostname:port/api/users/username/exists/:username
userRouter.route('/username/exists/:username')
    .get(formatParamTypes, isUsernameTaken);

//Get a specified list
//endpoint http://hostname:port/api/users/list/id
userRouter.route('/list/id')
    .post(authenticateToken, getUserList);


export default userRouter;




