import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';

//TODO:
const auth_api = import.meta.env.VITE_CUSTOM_AUTH_API;
const server_url = import.meta.env.VITE_SERVER_URL;
console.log('AUTH_API:',auth_api);
console.log('SERVER_URL:',server_url);

const Specials = () => {
  // Get today's date in YYYY-MM-DD format
  // Switch between hardcoded date and real-time date here
  const dateString = '2025-12-06'; //hardcoded date for testing
  //const dateString = new Date().toISOString().split('T')[0];
  const {getMenuByDate} = useMenuCommon();
  const {getMealByIDList} = useMealCommon();
  const [, setDailyMenu] = useState([]);
  const [meals, setMeals] = useState([]);
  const [specialMealID, setSpecialMealID] = useState([]);

  //console.log('DATE STRING: ', dateString);

  // Load all menu items
  useEffect(() => {
    if (!dateString) {
      return;
    }
    // Load all menu items

    const loadMenuForDay = async () => {
      try {
        const menuData = await getMenuByDate(dateString);

        //console.log('DATE STRING: ', dateString);
        //console.log('MENU DATA: ', menuData);

        if (menuData.length > 0) {
          const menu = menuData[0];
          setDailyMenu(menu);
          // console.log('DAILY MENU: ', menu);

          // Load meals for Menu of the day
          const mealItems = await getMealByIDList(menu.meals);
          const specialMealID = menu.meals[menu.special_meal - 1];
          //console.log('SPECIAL MEAL ID: ', specialMealID);
          //console.log('MEAL DATA: ', mealItems);
          setMeals(mealItems);
          setSpecialMealID(specialMealID);
          //console.log('isSpecial? ', menu.special_meal);
        }
      } catch (error) {
        console.log('Error in loadMenuItems: ', error);
      }
    };
    loadMenuForDay();
  }, []);

  return (
    <>
      {/* Daily meal boxes */}
      <div className="grid grid-cols-3 gap-4 p-7 pt-20 pb-30 bg-orange-50">
        {/* Meal boxes mapping */}
        {meals.map((meal) => (
          <div key={meal.id}>
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img src={server_url+'/images/meals/'+meal.image} alt="Spesiaali ruoka tänään" />
              <div className="px-6">
                <h2 className="text-2xl  mt-2 text-center">{meal.name_fi}</h2>
                <p className="mt-1 font-bold">
                  {meal.id == specialMealID ? 'Grilli spesiaali' : 'Noutopöytä'}
                </p>
                <ul>
                  <li>Hinta - {meal.cost}€</li>
                  <li>Tietoa - {meal.description_fi}</li>
                </ul>
                <div className="my-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300 max-w-fit hover:cursor-pointer">
                  <Link to="/weeklist">Lisää</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Specials;
