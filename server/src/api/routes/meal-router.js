'use strict';

//node imports
import express from 'express';
import multer from "multer";

//other imports
import {
    getMeals,
    getMealById,
    postMeal,
    putMeal,
    deleteMeal,
    getMealList
} from '../controllers/meal-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import { createImageScaler } from "../../middlewares/createImageScaler.js";


//router
const mealRouter = express.Router();

//multer
const multerUpload = multer({
    dest: './uploads/'  //uploads kansio
});

//configurable middleware for image scaling
const imageScaler = createImageScaler(200,200,'./public/images/meals', '_meal', 'webp');

//endpoint http://hostname:port/api/meals
mealRouter.get('/', getMeals)
    .post('/',
        authenticateToken,
        userIsAdmin,
        multerUpload.single('file'),
        imageScaler,
        formatBodyTypes,
        postMeal);

//endpoint http://hostname:port/api/meals/:id
mealRouter.route('/:id')
    .get(formatIdToNumber, getMealById)
    .put(authenticateToken,
        formatIdToNumber,
        userIsAdmin,
        multerUpload.single('file'),
        imageScaler,
        formatBodyTypes,
        putMeal)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMeal);


//Get a specified list
//endpoint http://hostname:port/api/discounts/list/id
mealRouter.route('/list/id')
    .get(authenticateToken, getMealList);

export default mealRouter;




