'use strict';

//node imports
import express from 'express';

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
import { createImageUploader } from "../../middlewares/createImageUploader.js";


const mealRouter = express.Router();

//configurable middleware for image uploads
const imageUploader = createImageUploader(160,160,'./uploads');

//endpoint http://hostname:port/api/meals
mealRouter.get('/', getMeals)
    .post('/', authenticateToken, userIsAdmin, imageUploader, postMeal);

//endpoint http://hostname:port/api/meals/:id
mealRouter.route('/:id')
    .get(formatIdToNumber, getMealById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, putMeal)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMeal);

export default mealRouter;




