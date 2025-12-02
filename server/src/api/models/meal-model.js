
//TODO: everything here


//example datastructure
import {default_meal} from "../../../../database/datastructures.js";

const meals = [
    {...default_meal, id: 1, name: "burger 1", message: "meal number 1 in meal model"},
    {...default_meal, id: 2, name: "burger 2", message: "meal number 2 in meal model"},
    {...default_meal, id: 3, name: "burger 3", message: "meal number 3 in meal model"},
];

/**
 * @return
 * array of all objects or false if error
 */
const listAllMeals = async () => {
    try {
        return meals;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return
 * first object that has the id or false if not found or error
 */
const findMealById = async (id) => {
    try {
        const resultArray = meals.filter(meal => meal.id === Number(id));
        if (resultArray.length > 0) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param meal
 * @param file image file
 *
 * object added to array/database or false if fails
 */
const addMeal = async (meal,file) => {
    try {
        //TODO: meal.id has to be number!!
        meals.push({...meal, file: {...file}}); //TODO: file doesn't have to be here!
        return meals[meals.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 *
 * @param meal meal object
 * @param mealId number
 * @return
 * meal or false if error or not found
 */
const modifyMeal = async (meal, mealId) => {
    try {
        console.log('modifyMeal: ',mealId, meal);
        const index = meals.findIndex( (d) => {
            console.log(d.id, mealId);
            return  d.id === Number(mealId);  //Has to be number!
        } );


        if (index >= 0) {
            console.log('found at:'+index);
            meals.splice(index,1, {...meals[index], ...meal });
            return meals[index];

        } else {
            console.log('not found: ',mealId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param mealId number
 * @return
 * false if not found
 */
const removeMeal = async (mealId) => {
    try {
        const index = meals.findIndex(meal => meal.id === Number(mealId));
        if (index >= 0) {
            meals.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

};

export {
    listAllMeals,
    findMealById,
    addMeal,
    modifyMeal,
    removeMeal,
};
