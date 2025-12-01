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


const mealRouter = express.Router();

//endpoint http://hostname:port/api/meals
mealRouter.get('/', getMeals)
    .post('/', authenticateToken, userIsAdmin, postMeal);

//endpoint http://hostname:port/api/meals/:id
mealRouter.route('/:id')
    .get(formatIdToNumber, getMealById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, putMeal)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMeal);

export default mealRouter;




