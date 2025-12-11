import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

/**
 * Server URL for image assets.
 * Dynamically determined based on environment configuration.
 * Falls back to local server if VITE_USE_LOCAL_SERVER is enabled.
 *
 * @type {string}
 */
let server_url = import.meta.env.VITE_SERVER_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  server_url = import.meta.env.VITE_SERVER_URL_LOCAL;
}

/**
 * Specials component that displays today's special and buffet meals.
 *
 * Features:
 * - Fetches menu data for the current day
 * - Loads meal details including images, names, descriptions, and prices
 * - Distinguishes between grill specials and buffet items
 * - Displays meals in a horizontally scrollable container
 * - Supports bilingual content (Finnish/English)
 * - Provides link to full week menu
 *
 * @returns {React.ReactElement} JSX element containing meal cards
 */
const Specials = () => {
  // Get today's date in YYYY-MM-DD format
  // Switch between hardcoded date and real-time date here
  //const dateString = '2025-12-06'; //hardcoded date for testing
  const dateString = new Date().toISOString().split('T')[0];

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

    /**
     * Async function to load menu and meal data for the day.
     * Handles errors gracefully with console logging.
     *
     * @async
     * @returns {Promise<void>}
     */
    const loadMenuForDay = async () => {
      try {
        const menuData = await getMenuByDate(dateString);

        if (menuData.length > 0) {
          const menu = menuData[0];
          setDailyMenu(menu);

          // Load meals for Menu of the day AND special meal
          const mealItems = await getMealByIDList([
            menu.special_meal,
            ...menu.meals,
          ]);

          setMeals(mealItems);
          setSpecialMealID(menu.special_meal);
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
      <div className=" p-7 pt-20 pb-30 bg-orange-50 ">
        <div className="flex gap-4 overflow-x-auto">
          {/* Meal boxes mapping */}
          {meals.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              {finnish
                ? 'Spesiaali- ja noutopöytäruokia ei löytynyt tälle päivälle. Tarkisat aukioloajat.'
                : 'No special or buffet meals found for this day. Please check opening hours.'}
            </div>
          ) : (
            meals.map((meal) => (
              <div key={meal.id}>
                <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200 w-99 h-115">
                  <img
                    className="w-99 h-65"
                    src={server_url + '/images/meals/' + meal.image}
                    alt={
                      finnish ? 'Spesiaali ruoka tänään' : 'Special meal today'
                    }
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
                        {finnish ? 'Hinta' : 'Cost'} - {meal.cost.toFixed(2)} €
                      </li>
                      <li>
                        {finnish ? 'Tietoa' : 'Description'} -{' '}
                        {finnish
                          ? `${meal.description_fi}`
                          : `${meal.description_en}`}
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Specials;
