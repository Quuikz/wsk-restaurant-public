//TODO: everything here

//example datastructure
// import { promises } from "supertest/lib/test.js";
import e from "cors";
import promisePool from "../../utils/database.js";

/**
 * @return
 * array of all objects or false if error
 */

const listAllMeals = async () => {
  console.log("Listing all meals..");

  try {
    const sql = "SELECT * FROM `meals`";
    const [rows] = await promisePool.query(sql);

    // console.log("rows", rows);
    return rows;
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
  console.log("Finding meal by id:", id);

  try {
    const sql = "SELECT * FROM `meals` WHERE id = ?";
    const params = [id];

    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    if (rows.length === 0) {
      console.log("Meal not found");
      return false;
    }
    return rows[0];
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
const addMeal = async (meal) => {
  console.log("Adding new meal:", meal);

  try {
    const sql = `INSERT INTO meals (name_fi, name_en, description_fi, description_en, cost, picture)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const pictureName = meal.image ? meal.image : null;
    const params = [
      meal.name_fi,
      meal.name_en,
      meal.description_fi,
      meal.description_en,
      meal.cost,
      pictureName,
    ];

    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    if (rows.affectedRows === 0) {
      console.log("Meal not added");
      return false;
    }

    return findMealById(rows.insertId);
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 *
 * @param meal meal object
 * @return
 * meal or false if error or not found
 */
const modifyMeal = async (meal) => {
  console.log("Modifying meal:", meal);

  // Helper function to check for empty data
  const emptyDataHelper = (data) => {
    return data === null || data === undefined || String(data).trim() === "";
  };

  try {
    const fields = [];
    const params = [];

    // Build dynamic query based on provided fields
    if (meal.name_fi && emptyDataHelper(meal.name_fi) === false) {
      fields.push("name_fi = ?");
      params.push(meal.name_fi);
    }
    if (meal.name_en && emptyDataHelper(meal.name_en) === false) {
      fields.push("name_en = ?");
      params.push(meal.name_en);
    }
    if (meal.description_fi && emptyDataHelper(meal.description_fi) === false) {
      fields.push("description_fi = ?");
      params.push(meal.description_fi);
    }
    if (meal.description_en && emptyDataHelper(meal.description_en) === false) {
      fields.push("description_en = ?");
      params.push(meal.description_en);
    }
    if (meal.cost && emptyDataHelper(meal.cost) === false) {
      fields.push("cost = ?");
      params.push(meal.cost);
    }
    if (meal.image && emptyDataHelper(meal.image) === false) {
      fields.push("picture = ?");
      params.push(meal.image);
    }

    // For WHERE clause
    params.push(meal.id);

    // If no fields to update, return the existing meal
    if (fields.length === 0) {
      console.log("No fields to update");
      return await findMealById(meal.id);
    }

    const sql = `UPDATE meals SET ${fields.join(", ")} WHERE id = ?`;
    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    // If no rows were affected, return false
    if (rows.affectedRows === 0) {
      console.log("Meal not modified");
      return false;
    }

    // Return the updated meal
    return await findMealById(meal.id);
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
  console.log("Removing meal with id:", mealId);

  try {
    const sql = "DELETE FROM meals WHERE id = ?";
    const params = [mealId];
    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    if (rows.affectedRows === 0) {
      console.log("Meal not found or not removed");
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { listAllMeals, findMealById, addMeal, modifyMeal, removeMeal };
