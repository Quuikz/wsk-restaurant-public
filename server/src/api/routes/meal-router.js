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
import multer from "multer";

//router
const mealRouter = express.Router();

//multer upload
const imageUploader = createMulterUploader("./uploads");

//alternate multer
const multerUpload = multer({
    dest: './uploads/'  //uploads kansio
});

//configurable middleware for image scaling
const imageScaler = createImageScaler(
  320,
  240,
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
    //multerUpload.single("file"),
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
