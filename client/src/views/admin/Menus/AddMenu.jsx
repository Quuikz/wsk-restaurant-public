import { useEffect, useState } from "react";
import { useMenu } from "../../../hooks/admin/apiHooks";
import { useMealCommon } from "../../../hooks/common/apiHooks";
import useForm from "../../../hooks/formHooks";
import MealSelector from "../../../components/admin/MealSelector";


const AddMenu = () => {

    const { postNewMenu } = useMenu();

    const { getAllMeals } = useMealCommon();
    const [availableMeals, setAvailableMeals] = useState([]);
    const [selectedMealsForMenu, setSelectedMealsForMenu] = useState([]);

    const loadAllMeals = async () => {
        try{
            const mealsData = await getAllMeals();
            console.log(mealsData);
            setAvailableMeals(mealsData);
        }
        catch(error){
            console.log('Error in loading all meals: ', error);
        }
    }

    useEffect(() => {
        loadAllMeals();
    }, []);



    const initValues = {
    date: '',
    week: '',
    special_meal: '',
    image: '',
    meals: [],
  };


  const doAddMenu = async () => {
    const token = localStorage.getItem('token');
    try{
        const dataToSend = {
            ...inputs,
            meals: selectedMealsForMenu,
        };
        const result = await postNewMenu(dataToSend, token);
        console.log(result);
    }
    catch (error){
        console.log('Error in doAddMenu: ', error);
    }
  }




  const {inputs, handleInputChange, handleSubmit} = useForm(
    doAddMenu,
    initValues,
  );


  return (
    <>
      <div className="max-w-3xl mx-auto bg-gray-300 p-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Upload New Menu</h1>
        </div>

        <div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/*Menu: date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium text-gray-700">
                Date
              </label>
              <input
                name="date"
                type="text"
                id="date"
                onChange={handleInputChange}
                autoComplete="date"
                value={inputs.date}
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/*Menu: Week */}
            <div className="flex flex-col">
              <label htmlFor="week" className="mb-2 font-medium text-gray-700">
                Week</label>
              <input
                name="week"
                type="text"
                id="week"
                onChange={handleInputChange}
                autoComplete="week"
                value={inputs.week}
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/*Menu: special meal */}
            <div className="flex flex-col">
              <label htmlFor="special_meal">Special Meal:</label>
              <input
                name="special_meal"
                type="text"
                id="special_meal"
                onChange={handleInputChange}
                autoComplete="special meal"
                value={inputs.special_meal}
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <MealSelector
                availableMeals={availableMeals}
                selectedMeals={selectedMealsForMenu}
                setSelectedMeals={setSelectedMealsForMenu}
            />


            <button 
                type="submit"
                className="border p-2 hover:bg-gray-200"
            >Upload</button>

          </form>






        </div>
      </div>
    </>
  );
};

export default AddMenu;
