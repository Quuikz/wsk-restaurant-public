import { useEffect, useState } from "react";
import MealRow from "../../../components/admin/MealRow";
import { useMealCommon } from "../../../hooks/common/apiHooks";
import { useMenu } from "../../../hooks/admin/apiHooks";

const MenuRow = ({ menuItem }) => {

    //Test function to display week
    /*
    const currentWeek = () => {
        const d = new Date();
        let yearStart = +new Date(d.getFullYear(), 0, 1);
        let today = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
        let dayOfYear = ((today - yearStart + 1 ) / 86400000);
        let week = Math.ceil(dayOfYear / 7);
        console.log(week)

    }
    currentWeek();
    */

    const { getMealByIDList } = useMealCommon();
    const { updateMenu } = useMenu();




    const [meals, setMeals] = useState([]);

    const loadMealsByIDs = async () => {
        try{
            const mealsByIDsData = await getMealByIDList(menuItem.meals);
            setMeals(mealsByIDsData.filter(Boolean));
        }
        catch(error){
            console.log('Error in loadMealsByIDs: ', error);
        }
    }

    useEffect(() => {
        loadMealsByIDs();
    }, []);


    const handleDeleteMealFromMenu = async (mealID) => {
        const token = localStorage.getItem('token');
        try{
            const updatedMealIDs = menuItem.meals.filter(ID => ID != mealID);

            await updateMenu({ meals: updatedMealIDs }, token, menuItem.id);

            setMeals(meals.filter(meal => meal.id !== mealID));
            console.log(`Meal ${mealID} removed from menu ${menuItem.id}`);
            //menuItem.meals = updatedMealIDs;
        }
        catch(error){
            console.log('Error removing meal from menu: ', error);
        }
    }




  return (
    <li className="p-4 border rounded bg-gray-50 mb-6">

        {/* MENU HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Menu #{menuItem.id}</h2>

        <div className="text-sm text-gray-600">
            <>
            <p>Week: {menuItem.week}</p>
            <p>Date: {menuItem.date || "N/A"}</p>
            </>
        </div>
      </div>

      {/* Add Meal */}
      <button
        onClick={() => console.log("ADD meal for menu", menuItem.id)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ➕ Add Meal
      </button>

      {/* Meals list */}
      {/*TODO: refine style */}
        <div className="grid grid-cols-5 items-center gap-4 px-4 py-3 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Name (fi/en)</span>
            <span>Description (fi/en)</span>
            <span>Cost (€)</span>
            <span>Delete from menu</span>
        </div>
      <ul className="divide-y">
        {meals.map((meal) => (
          <MealRow
            key={meal.id}
            meal={meal}
            //onModify={() => console.log("Modify meal", meal.id)}
            onDelete={() => handleDeleteMealFromMenu(meal.id)}
          />
        ))}
      </ul>

    </li>
  );
};

export default MenuRow;
