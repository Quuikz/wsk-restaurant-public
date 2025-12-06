import { useEffect, useState } from "react";
import { useMeal } from "../../../hooks/admin/apiHooks"
import MealRow from "./MealRow";

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