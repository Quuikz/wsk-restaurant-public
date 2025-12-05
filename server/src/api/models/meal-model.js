import promisePool from "../../utils/database.js";

/**
 * Retrieve all meals from the database.
 *
 * Queries the `meals` table and returns an array of meal rows.
 * On error the function returns `false` so callers can handle failures.
 *
 * @async
 * @function listAllMeals
 * @returns {Promise<Array<Object>|false>} Resolves to an array of meal objects or `false` on error.
 */
const listAllMeals = async () => {
  console.log("Listing all meals..");

  try {
    // Prepare SQL to fetch all meals
    const sql = "SELECT * FROM `meals`";
    // Execute query; `query` returns [rows, fields]
    const [rows] = await promisePool.query(sql);

    // console.log("rows", rows);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Find a single meal by its id.
 *
 * @async
 * @function findMealById
 * @param {number|string} id - The id of the meal to find.
 * @returns {Promise<Object|false>} Resolves to the meal object if found, or `false` if not found or on error.
 */
const findMealById = async (mealId) => {
  console.log("Finding meal by id:", mealId);

  try {
    // Prepare parametrized SQL to avoid injection
    const sql = "SELECT * FROM `meals` WHERE id = ?";
    const params = [mealId];

    // Execute the prepared statement with params
    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    // If no rows, meal not found
    if (rows.length === 0) {
      console.log("Meal not found");
      return false;
    }
    // Return the first (and only) meal found
    return rows[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Add a new meal to the database.
 *
 * Expected `meal` properties: `name_fi`, `name_en`, `description_fi`,
 * `description_en`, `cost` and an optional `image` (picture filename).
 * The function inserts the record and returns the newly created meal
 * by calling `findMealById` with the inserted id. On failure returns `false`.
 *
 * @async
 * @function addMeal
 * @param {Object} meal - Meal data to insert.
 * @param {string} [meal.name_fi]
 * @param {string} [meal.name_en]
 * @param {string} [meal.description_fi]
 * @param {string} [meal.description_en]
 * @param {number|string} [meal.cost]
 * @param {string} [meal.image] - Optional filename for the meal picture.
 * @returns {Promise<Object|false>} Resolves to the inserted meal object or `false` on error.
 */
const addMeal = async (meal) => {
  console.log("Adding new meal:", meal);

  try {
    // Prepare parametrized SQL to avoid injection
    const sql = `INSERT INTO meals (name_fi, name_en, description_fi, description_en, cost, picture)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    // Use provided image filename or null when not provided
    const pictureName = meal.image ? meal.image : null;

    // Build parameter array matching the INSERT placeholders
    const params = [
      meal.name_fi,
      meal.name_en,
      meal.description_fi,
      meal.description_en,
      meal.cost,
      pictureName,
    ];

    // Execute the insert and check affectedRows
    const [rows] = await promisePool.execute(sql, params);
    // console.log("rows", rows);

    // If no rows were affected, return false
    if (rows.affectedRows === 0) {
      console.log("Meal not added");
      return false;
    }

    // Return the newly added meal
    return findMealById(rows.insertId);
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Modify an existing meal record.
 *
 * The `meal` object must include an `id` property and may include any of the
 * updatable fields: `name_fi`, `name_en`, `description_fi`, `description_en`,
 * `cost` and `image`. Only the provided non-empty fields are updated.
 * If no fields are provided the current meal is returned unchanged.
 *
 * @async
 * @function modifyMeal
 * @param {Object} meal - Meal data to update; must include `id`.
 * @param {number|string} meal.id - The id of the meal to update.
 * @returns {Promise<Object|false>} Resolves to the updated meal object, or `false` on error or if not modified.
 */
const modifyMeal = async (meal) => {
  console.log("Modifying meal:", meal);

  /**
   * Helper to determine whether a value should be considered "empty" for updates.
   * Treats null, undefined and whitespace-only strings as empty.
   *
   * @param {*} data - Value to check.
   * @returns {boolean} `true` if data is null/undefined/empty string, otherwise `false`.
   */
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

    // Prepare and execute the UPDATE statement
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
 * Remove a meal by id.
 *
 * Deletes the row with the provided id from the `meals` table. Returns
 * `true` when a row was deleted, or `false` if no row was removed or on error.
 *
 * @async
 * @function removeMeal
 * @param {number|string} mealId - The id of the meal to delete.
 * @returns {Promise<boolean|false>} `true` when deleted, `false` if not found or on error.
 */
const removeMeal = async (mealId) => {
  console.log("Removing meal with id:", mealId);

  try {
    // Prepare delete statement and execute
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
