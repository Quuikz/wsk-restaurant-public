import { useEffect, useState } from "react";
//import { useMeal } from "../../../hooks/admin/apiHooks"
import { useMealCommon } from "../../../hooks/common/apiHooks.js";
import MealRow from "../../../components/admin/MealRow";
import ModifyMealModal from "../../../components/admin/MealModals/ModifyMealModal.jsx";
import DeleteMealModal from "../../../components/admin/MealModals/DeleteMealModal.jsx";

const Meals = () => {

    const { getAllMeals } = useMealCommon();
    const [meals, setMeals] = useState([]);

    //Modals
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const loadMeals = async () => {
        try{
            const mealData = await getAllMeals();
            setMeals(mealData);
        }
        catch(error){
            console.log('Error in loadMeals: ', error);
        }
    };
        
    useEffect(() => {
        loadMeals();
    }, []);


    const handleModify = async (meal) => {
        console.log('Modifying the meal id: ', meal.id);
        setSelectedMeal(meal);
        setShowModifyModal(true);
    }

    const handleDelete = async (meal) => {
        console.log('Deleting meal id: ', meal.id);
        setSelectedMeal(meal);
        setShowDeleteModal(true);
    }


    return(
        <>
        {/*TODO: refine style */}
        <li className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Name FI/EN</span>
            <span>Description FI/EN</span>
            <span>Cost</span>
            <span>Edit</span>
            <span>Delete</span>
        </li>
        <ul>
            {meals.map((meal) => (
                <MealRow
                    key={meal.id}
                    meal={meal}
                    onDelete={() => handleDelete(meal)}
                    onModify={() => handleModify(meal)} 
                    showModifyButton={true}
                />
            ))}
        </ul>
        

        {/*Modify Meal modal */}
        <ModifyMealModal 
            meal={selectedMeal}
            isOpen={showModifyModal}
            onClose={() => setShowModifyModal(false)}
            onUpdated={loadMeals}
        />

        {/*Delete Meal modal */}
        <DeleteMealModal 
            meal={selectedMeal}
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}

            onDeleted={(mealId) =>
                setMeals((prev) => prev.filter((m) => m.id !== mealId))
            }
        />

        </>
    );



}

export default Meals;