/**
 * 
 * Row component to display a Meal along with it's ID in a list.
 * Allows user to toggle and highlights selected meals.
 * 
 * @param {Array<Object>} availableMeals - An array of Meal objects available for selection.
 * @param {Array<number>} selectedMeals - An array of currently selected Meal IDs.
 * @param {Function} availableMeals - Function to update the selected meals array.
 *  
 */
const MealSelector = ({availableMeals, selectedMeals, setSelectedMeals}) =>{

    /**
     * 
     * Function to add or remove a Meal ID from a list of selected meals.
     */
    const toggleMeal = (mealID) => {
        if(selectedMeals.includes(mealID)){
            setSelectedMeals(selectedMeals.filter((ID) => ID != mealID));
        }
        else{
            setSelectedMeals([...selectedMeals, mealID]);
        }
    };

    return(
    <div className="flex flex-col">
        <label className="mb-4 font-medium">Select meals to add:</label>
        <div className="border rounded p-4 max-h-60 overflow-y-auto">
            {availableMeals.map((meal) => {
            const isSelected = selectedMeals.includes(meal.id);
            return (
                <div
                key={meal.id}
                onClick={() => toggleMeal(meal.id)}
                className={`cursor-pointer p-2 mb-1 rounded transition ${
                    isSelected ? "bg-gray-500 text-white" : "bg-white hover:bg-gray-100"
                }`}
                >
                {meal.name_fi} (ID {meal.id})
                </div>
            );
            })}
        </div>
        </div>
    );



}

export default MealSelector;