//node imports
import express from 'express';

//TODO: KESKEN KORVAA LOCATION -> MEAL

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


const mealRouter = express.Router();

//endpoint http://hostname:port/api/meals
mealRouter.get('/', getMeals)
    .post('/', authenticateToken, userIsAdmin, postMeal);

//endpoint http://hostname:port/api/meals/:id
mealRouter.route('/:id')
    .get(getMealById)
    .put(authenticateToken, userIsAdmin, putMeal)
    .delete(authenticateToken, userIsAdmin, deleteMeal);

export default mealRouter;




