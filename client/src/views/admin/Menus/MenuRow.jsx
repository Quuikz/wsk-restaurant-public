import {useEffect, useState} from 'react';
import MealRow from '../../../components/admin/MealRow';
import {useMealCommon} from '../../../hooks/common/apiHooks';
import {useMenu} from '../../../hooks/admin/apiHooks';
import MealSelector from '../../../components/admin/MealSelector';

const MenuRow = ({menuItem}) => {
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

  const {getAllMeals, getMealByIDList} = useMealCommon();
  const {updateMenu} = useMenu();

  //For adding meals to menu
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const [meals, setMeals] = useState([]);

  const loadMealsByIDs = async () => {
    try {
      const mealsByIDsData = await getMealByIDList(menuItem.meals);
      setMeals(mealsByIDsData.filter(Boolean));
    } catch (error) {
      console.log('Error in loadMealsByIDs: ', error);
    }
  };

  const loadAllMeals = async () => {
    try {
      const mealsData = await getAllMeals();
      //console.log(mealsData);
      setAvailableMeals(mealsData);
    } catch (error) {
      console.log('Error in loadAllMeals: ', error);
    }
  };

  const handleAddMealToMenu = async () => {
    const token = localStorage.getItem('token');

    try {
      const newIDs = [
        ...menuItem.meals,
        ...selectedMeals.filter((id) => !menuItem.meals.includes(id)),
      ];

      await updateMenu({meals: newIDs}, token, menuItem.id);

      // Refresh UI
      const newMealsData = await getMealByIDList(newIDs);
      setMeals(newMealsData.filter(Boolean));

      setShowMealSelector(false);
      setSelectedMeals([]);

      console.log('Meals added to menu', selectedMeals);
    } catch (error) {
      console.log('Error in handleAddMealToMenu: ', error);
    }
  };

  useEffect(() => {
    loadMealsByIDs();
  }, []);

  useEffect(() => {
    loadAllMeals();
  }, []);

  const handleDeleteMealFromMenu = async (mealID) => {
    const token = localStorage.getItem('token');
    try {
      const updatedMealIDs = menuItem.meals.filter((ID) => ID != mealID);

      await updateMenu({meals: updatedMealIDs}, token, menuItem.id);

      setMeals(meals.filter((meal) => meal.id !== mealID));
      console.log(`Meal ${mealID} removed from menu ${menuItem.id}`);
      //menuItem.meals = updatedMealIDs;
    } catch (error) {
      console.log('Error removing meal from menu: ', error);
    }
  };

  return (
    <li className="p-4 border rounded bg-gray-50 mb-6">
      {/* MENU HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Menu #{menuItem.id}</h2>

        <div className="text-sm text-gray-600">
          <>
            <p>Week: {menuItem.week}</p>
            <p>Date: {menuItem.date || 'N/A'}</p>
          </>
        </div>
      </div>

      {/* Add Meal */}
      <button
        //onClick={() => console.log("ADD meal for menu", menuItem.id)}
        onClick={() => setShowMealSelector(true)}
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

      {showMealSelector && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Meals to Menu</h3>

            <MealSelector
              availableMeals={availableMeals}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
            />

            {/*Cancel button */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowMealSelector(false)}
                className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              {/*Add button */}
              <button
                onClick={handleAddMealToMenu}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default MenuRow;
