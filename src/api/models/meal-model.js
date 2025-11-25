
//TODO: everything here


//example datastructure
import {default_meal} from "../../../database/datastructures.js";

const listAllMeals = async () => {
    return [
        {text: 'listAllMeals hard coded response from meal-model.js'},
        {...default_meal},
        {...default_meal},
        {...default_meal},
    ];
};

const findMealById = async (id) => {
    return {text: 'findMealById hard coded response from meal-model.js', ...default_meal};
};

const addMeal = async (meal) => {
    return {text: 'addMeal hard coded response from meal-model.js', ...default_meal};
};

const modifyMeal = async (meal, mealId) => {
    return {text: 'modifyMeal hard coded response from meal-model.js', ...default_meal};
};

const removeMeal = async (mealId) => {
    return {text: 'removeMeal hard coded response from meal-model.js', ...default_meal};
};


export {
    listAllMeals,
    findMealById,
    addMeal,
    modifyMeal,
    removeMeal,
};
