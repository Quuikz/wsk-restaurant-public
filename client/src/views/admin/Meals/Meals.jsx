import { useEffect, useState } from "react";
import { useMeal } from "../../../hooks/admin/apiHooks"
import MealRow from "../../../components/admin/MealRow";

const Meals = () => {

    const { getAllMeals } = useMeal();
    const [meals, setMeals] = useState([]);



    useEffect(() => {

        const loadMeals = async () => {
            try{
                const mealData = await getAllMeals();
                setMeals(mealData);
            }
            catch(error){
                console.log('Error in loadMeals: ', error);
            }
        };
        loadMeals();
    }, []);


    const handleModify = async (id) => {
        console.log('Modifying the meal id: ', id);
    }

    const handleDelete = async (id) => {
        console.log('Deleting meal id: ', id);
    }


    


    return(
        <>
        {/*TODO: refine style */}
            <li className="grid grid-cols-7 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Name FI</span>
            <span>Name EN</span>
            <span>Type</span>
            <span>Cost</span>
            <span>Edit</span>
            <span>Delete</span>
        </li>
        <ul>
            {meals.map((meal) => (
                <MealRow
                    key={meal.id}
                    meal={meal}
                    onDelete={() => handleDelete(meal.id)}
                    onModify={() => handleModify(meal.id)} 
                
                />
            ))}
        </ul>



        </>
    );



}

export default Meals;