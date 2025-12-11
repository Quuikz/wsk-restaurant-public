import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

//Set server URL
let server_url = import.meta.env.VITE_SERVER_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  server_url = import.meta.env.VITE_SERVER_URL_LOCAL;
}
console.log('url in Specials', server_url);

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

  //language
  const {finnish} = useLanguageContext();

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

          // Load meals for Menu of the day AND special meal
          const mealItems = await getMealByIDList([
            menu.special_meal,
            ...menu.meals,
          ]);
          //console.log('SPECIAL MEAL ID: ', specialMealID);
          //console.log('MEAL DATA: ', mealItems);
          setMeals(mealItems);
          setSpecialMealID(menu.special_meal);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-7 pt-20 pb-30 bg-orange-50">
        {/* Meal boxes mapping */}
        {meals.map((meal) => (
          <div key={meal.id}>
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img
                src={server_url + '/images/meals/' + meal.image}
                alt={finnish ? 'Spesiaali ruoka tänään' : 'Special meal today'}
              />
              <div className="px-6">
                <h2 className="text-2xl  mt-2 text-center">
                  {finnish ? meal.name_fi : meal.name_en}
                </h2>
                <p className="mt-1 font-bold">
                  {meal.id === specialMealID
                    ? finnish
                      ? 'Grilli spesiaali'
                      : 'Grill special'
                    : finnish
                      ? 'Noutopöytä'
                      : 'Buffet'}
                </p>
                <ul>
                  <li>
                    {finnish ? 'Hinta' : 'Cost'} - {meal.cost}€
                  </li>
                  <li>
                    {finnish ? 'Tietoa' : 'Description'} - {meal.description_fi}
                  </li>
                </ul>
                <div className="my-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300 max-w-fit hover:cursor-pointer">
                  <Link to="/weeklist">
                    {finnish ? 'Viikon lista' : 'Week menu'}
                  </Link>
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
