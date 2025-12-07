'use strict';


import {
    listAllMeals,
    findMealById,
    addMeal,
    modifyMeal,
    removeMeal,
} from "../models/meal-model.js";
import {listAllLocations} from "../models/location-model.js";

const getMeals = (req, res) => {
    console.log('getMeals in meal-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);


    listAllMeals().then(
        (result) => {
            if (result) {
                res.json(result);
            } else {
                console.log('no meals found');
                res.status(200).send("no meals found");
            }
        },

        (result) => {
            console.log('error in getMeals in meal-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const getMealById = (req, res) => {
    console.log('getMealById in meal-controller')
    console.log(req.params.id);
    const meal = findMealById(req.params.id);
    meal.then(
        meal => {
            if (meal) {
                console.log('return meal'+req.params.id)
                res.json(meal);

            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getMealById in meal-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postMeal = (req, res) => {
    console.log('postMeal in meal-controller');
    console.log(req.body);

    const result = addMeal(req.body, req.file);
    //TODO: what to do with image data in req.file? nothing?
    result.then(
        result => {
            if (result) {
                console.log('added meal: ', result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in postMeal in meal-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putMeal = (req, res) => {
    try {
        console.log('putMeal in meal-controller');
        console.log(req.body);
        console.log(req.params.id);

        if (req.body.id === req.params.id) {
            const result = modifyMeal(req.body);
            result.then(
                result => {
                    if (result) {
                        console.log('return meal: ', result)
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                },
                result => {
                    console.log('error in putMeal in meal-controller');
                    console.log(result);
                    res.sendStatus(500);
                }
            );

        } else {
            console.log('req.body.id !== req.params.id in putMeal');
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const deleteMeal = (req, res) => {
    console.log('deleteMeal in meal-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let message = removeMeal(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.status(200).send(message);

            } else {
                console.log('deleteMeal: meal not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteMeal in meal-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

export {
    getMeals,
    getMealById,
    postMeal,
    putMeal,
    deleteMeal,
};