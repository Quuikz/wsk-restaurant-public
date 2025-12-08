

const MealSelector = ({availableMeals, selectedMeals, setSelectedMeals}) =>{

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
        <label className="mb-2 font-medium">Meals</label>
        <div className="border rounded p-2 max-h-60 overflow-y-auto">
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