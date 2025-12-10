"use strict";

//node imports
import express from "express";

//other imports
import {
  getMeals,
  getMealById,
  postMeal,
  putMeal,
  deleteMeal,
  getMealList,
} from "../controllers/meal-controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";
import userIsAdmin from "../../middlewares/userIsAdmin.js";
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import createImageScaler from "../../middlewares/createImageScaler.js";
import createMulterUploader from "../../middlewares/createMulterUploader.js";

//router
const mealRouter = express.Router();

//multer upload
const imageUploader = createMulterUploader("./uploads");

//configurable middleware for image scaling
const imageScaler = createImageScaler(
  200,
  200,
  "./public/images/meals",
  "_meal",
  "webp"
);

//endpoint http://hostname:port/api/meals
mealRouter
  .get("/", getMeals)
  .post(
    "/",
    authenticateToken,
    userIsAdmin,
    imageUploader,
    imageScaler,
    formatBodyTypes,
    postMeal
  );

//endpoint http://hostname:port/api/meals/:id
mealRouter
  .route("/:id")
  .get(formatIdToNumber, getMealById)
  .put(
    authenticateToken,
    formatIdToNumber,
    userIsAdmin,
    imageUploader,
    imageScaler,
    formatBodyTypes,
    putMeal
  )
  .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMeal);

//Get a specified list
//endpoint http://hostname:port/api/meals/list/id
mealRouter.route("/list/id").post(getMealList);

export default mealRouter;
