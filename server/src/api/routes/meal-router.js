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
} from '../controllers/meal-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import { createImageScaler } from "../../middlewares/createImageScaler.js";

//router
const mealRouter = express.Router();

//multer
const multerUpload = multer({
    dest: './uploads/'  //uploads kansio
});

//configurable middleware for image scaling
const imageScaler = createImageScaler(160,160,'./uploads');

//endpoint http://hostname:port/api/meals
mealRouter.get('/', getMeals)
    .post('/',
        authenticateToken,
        userIsAdmin,
        multerUpload.single('file'),
        imageScaler,
        postMeal);

//endpoint http://hostname:port/api/meals/:id
mealRouter.route('/:id')
    .get(formatIdToNumber, getMealById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, putMeal)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMeal);

export default mealRouter;




