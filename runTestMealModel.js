import {
  listAllMeals,
  findMealById,
  addMeal,
  modifyMeal,
  removeMeal,
} from "./server/src/api/models/meal-model.js";

async function test() {
  // Test listAllMeals
  console.log("Testing meal-model.js listAllMeals");
  try {
    const allMeals = await listAllMeals();
    console.log(allMeals);
    console.log();
  } catch (error) {
    console.error("Error during listAllMeals:", error);
  }

  // Test findMealById with existing and non-existing IDs
  console.log("Testing meal-model.js findMealById with id 1");
  try {
    const meal = await findMealById(1);
    console.log(meal);
    console.log();
  } catch (error) {
    console.error("Error during findMealById:", error);
  }

  console.log("Testing meal-model.js findMealById with id 99");
  try {
    const meal = await findMealById(99);
    console.log(meal);
    console.log();
  } catch (error) {
    console.error("Error during findMealById:", error);
  }

  // Test addMeal without picture
  console.log("Testing meal-model.js addMeal without picture");
  try {
    const newMeal = {
      name_fi: "Test Meal FI",
      name_en: "Test Meal EN",
      description_fi: "This is a test meal",
      description_en: "This is a test meal",
      cost: 9.99,
    };
    const addedMeal = await addMeal(newMeal);
    console.log("Meal added:", addedMeal);
    console.log();
  } catch (error) {
    console.error("Error during addMeal:", error);
  }

  // Test addMeal with picture
  console.log("Testing meal-model.js addMeal with picture");
  try {
    const newMeal = {
      name_fi: "Test Meal FI",
      name_en: "Test Meal EN",
      description_fi: "This is a test meal",
      description_en: "This is a test meal",
      cost: 9.99,
      image: "testpic.jpg",
    };
    const addedMeal = await addMeal(newMeal);
    console.log("Meal added:", addedMeal);
    console.log();
  } catch (error) {
    console.error("Error during addMeal:", error);
  }

  // Tests for modifyMeal with all, some, and some fields but empty data
  console.log("Testing meal-model.js modifyMeal with all fields changed");
  try {
    const mealToModify = {
      id: 39,
      name_fi: "Modified Meal FI",
      name_en: "Modified Meal EN",
      description_fi: "This meal has been modified",
      description_en: "This meal has been modified",
      cost: 12.99,
      image: "modifiedpic.jpg",
    };
    const modifiedMeal = await modifyMeal(mealToModify, null);
    console.log(modifiedMeal);
    console.log();
  } catch (error) {
    console.error("Error during modifyMeal:", error);
  }

  console.log("Testing meal-model.js modifyMeal with some fields changed");
  try {
    const mealToModify = {
      id: 39,
      name_fi: "Partially Modified Meal FI",
      cost: 11.99,
    };
    const modifiedMeal = await modifyMeal(mealToModify, null);
    console.log(modifiedMeal);
    console.log();
  } catch (error) {
    console.error("Error during modifyMeal:", error);
  }

  console.log(
    "Testing meal-model.js modifyMeal with some fields changed and empty data"
  );
  try {
    const mealToModify = {
      id: 39,
      name_fi: undefined,
      name_en: "",
      description_fi: "name_en set to empty string",
      description_en: "Modified description only",
      cost: null,
    };
    const modifiedMeal = await modifyMeal(mealToModify, null);
    console.log(modifiedMeal);
    console.log();
  } catch (error) {
    console.error("Error during modifyMeal:", error);
  }

  console.log(
    "Testing meal-model.js modifyMeal with no fields changed (only id provided)"
  );
  try {
    const mealToModify = {
      id: 39,
    };
    const modifiedMeal = await modifyMeal(mealToModify, null);
    console.log(modifiedMeal);
    console.log();
  } catch (error) {
    console.error("Error during modifyMeal:", error);
  }

  // Test removeMeal with existing and non-existing IDs
  console.log("Testing meal-model.js removeMeal with id 39");
  try {
    const removeResult = await removeMeal(39);
    console.log("Remove result:", removeResult);
    console.log();
  } catch (error) {
    console.error("Error during removeMeal:", error);
  }

  console.log("Testing meal-model.js removeMeal with id 99");
  try {
    const removeResult = await removeMeal(99);
    console.log("Remove result:", removeResult);
    console.log();
  } catch (error) {
    console.error("Error during removeMeal:", error);
  }
}
test();
