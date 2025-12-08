"use strict";

import {
  listAllMeals,
  findMealById,
  addMeal,
  modifyMeal,
  removeMeal,
} from "../models/meal-model.js";
import { listAllLocations } from "../models/location-model.js";

/**
 * @api {get} /meals Get all meals
 * @apiName GetMeals
 * @apiGroup Meal
 *
 * @apiSuccess {Array} meals Array of meal objects
 *
 * @apiError 500 Internal server error
 */
const getMeals = async (req, res) => {
  try {
    console.log("getMeals in meal-controller");
    const user = res.locals.user;
    console.log("user authenticated:" + res.locals.user);

    const result = await listAllMeals();
    if (result) {
      return res.json(result);
    } else {
      console.log("no meals found");
      return res.status(200).send("no meals found");
    }
  } catch (error) {
    console.log("error in getMeals in meal-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /meals/:id Get meal by ID
 * @apiName GetMealById
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 *
 * @apiSuccess {Object} meal Meal object
 *
 * @apiError 404 Meal not found
 * @apiError 500 Internal server error
 */
const getMealById = async (req, res) => {
  try {
    console.log("getMealById in meal-controller");
    console.log(req.params.id);
    const meal = await findMealById(req.params.id);
    if (meal) {
      console.log("return meal" + req.params.id);
      return res.json(meal);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getMealById in meal-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /meals Create new meal
 * @apiName PostMeal
 * @apiGroup Meal
 *
 * @apiParam {Object} body Meal object
 * @apiParam {File} file Optional meal image file
 *
 * @apiSuccess {Object} meal Created meal object
 *
 * @apiError 404 Failed to create meal
 * @apiError 500 Internal server error
 */
const postMeal = async (req, res) => {
  try {
    console.log("postMeal in meal-controller");
    console.log(req.body);

    const result = await addMeal(req.body, req.file);
    //TODO: what to do with image data in req.file? nothing?
    if (result) {
      console.log("added meal: ", result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postMeal in meal-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /meals/:id Update meal
 * @apiName PutMeal
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 * @apiParam {Object} body Updated meal object
 *
 * @apiSuccess {Object} meal Updated meal object
 *
 * @apiError 400 ID mismatch between body and params
 * @apiError 404 Meal not found
 * @apiError 500 Internal server error
 */
const putMeal = async (req, res) => {
  try {
    console.log("putMeal in meal-controller");
    console.log(req.body);
    console.log(req.params.id);

    if (req.body.id === req.params.id) {
      const result = await modifyMeal(req.body);
      if (result) {
        console.log("return meal: ", result);
        return res.json(result);
      } else {
        return res.sendStatus(404);
      }
    } else {
      console.log("req.body.id !== req.params.id in putMeal");
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /meals/:id Delete meal
 * @apiName DeleteMeal
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Meal not found
 * @apiError 500 Internal server error
 */
const deleteMeal = async (req, res) => {
  try {
    console.log("deleteMeal in meal-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeMeal(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteMeal: meal not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteMeal in meal-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /meals/list Get meal list by IDs
 * @apiName GetMealList
 * @apiGroup Meal
 * @apiDescription Takes an array of meal IDs and returns corresponding meal objects
 *
 * @apiParam {Array} meals Array of meal IDs
 *
 * @apiSuccess {Array} meals Array of meal objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
 */
const getMealList = async (req, res) => {
  try {
    console.log("getMealList in meal-controller");

    if (req.body.meals) {
      const mealArray = await Promise.all(
        req.body.meals.map((id) => findMealById(id))
      );
      console.log("meals found: ", mealArray);
      res.json(mealArray);
    } else {
      console.log("no id array in getMealList in meal-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getMealList in meal-controller");
    res.sendStatus(500);
  }
};

export { getMeals, getMealById, postMeal, putMeal, deleteMeal, getMealList };
