import React, {useEffect, useState} from 'react';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

/**
 * Converts an ISO date string to a weekday name in the specified locale
 * @param {string} isoDate - ISO date string (e.g., "2024-12-11" or "2024-12-11T10:00:00")
 * @param {string} [locale='fi-FI'] - Locale string for formatting (default: Finnish)
 * @param {string} [weekday='long'] - Weekday format ('long', 'short', or 'narrow')
 * @returns {string} Formatted weekday name or error message if date is invalid
 */
function isoToWeekdayName(isoDate, locale = 'fi-FI', weekday = 'long') {
  if (!isoDate) return 'Päivämäärä puuttuu';

  let datePart = isoDate;
  if (typeof isoDate === 'string' && isoDate.includes('T')) {
    datePart = isoDate.split('T')[0];
  }

  const parts = String(datePart).split('-').map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [year, month, day] = parts;
    const dt = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat(locale, {weekday}).format(dt);
  }
}

/**
 * WeeklistBox component displays a daily menu with meals for a specific date
 * Shows the weekday name, date, and all meals (including special meals) available for that day
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.menu - Menu object containing date and meal information
 * @param {string} props.menu.date - ISO date string for the menu
 * @param {number} props.menu.special_meal - ID of the special meal for the day
 * @param {number[]} props.menu.meals - Array of meal IDs for the day
 * @returns {JSX.Element} A card displaying the daily menu with meals
 *
 * @example
 * <WeeklistBox menu={{
 *   date: "2024-12-11T00:00:00",
 *   special_meal: 5,
 *   meals: [1, 2, 3]
 * }} />
 */
const WeeklistBox = ({menu}) => {
  const dateString = menu?.date?.split('T')[0];

  const {getMenuByDate} = useMenuCommon();
  const {getMealByIDList} = useMealCommon();
  const [, setDailyMenu] = useState([]);
  const [meals, setMeals] = useState([]);
  const [specialMealID, setSpecialMealID] = useState([]);
  const {finnish} = useLanguageContext();

  useEffect(() => {
    if (!menu?.date?.split('T')[0]) {
      return;
    }
    /**
     * Loads menu data for the specified date and fetches associated meal details
     * @async
     * @function loadMenuForDay
     * @returns {Promise<void>}
     */
    const loadMenuForDay = async () => {
      try {
        const menuData = await getMenuByDate(dateString);

        if (menuData.length > 0) {
          const menu = menuData[0];
          setDailyMenu(menu);

          // Load meals for Menu of the day
          const mealItems = await getMealByIDList([
            menu.special_meal,
            ...menu.meals,
          ]);
          const specialMealID = menu.special_meal;
          setMeals(mealItems);
          setSpecialMealID(specialMealID);
        }
      } catch (error) {
        console.log('Error in loadMenuItems: ', error);
      }
    };
    loadMenuForDay();
  }, []);

  return (
    <>
      <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
        <div className="px-6">
          <h3 className="text-3xl  mt-2 text-center border-b">
            {isoToWeekdayName(menu?.date?.split('T')[0])} |{' '}
            {menu?.date?.split('T')[0]}
          </h3>
          <div className="grid grid-cols-2 gap-4 my-4">
            {meals.map((meal) => (
              <div key={meal.id}>
                <p className="font-bold">
                  {meal.id === specialMealID
                    ? finnish
                      ? 'Grilli spesiaali'
                      : 'Grill special'
                    : finnish
                      ? 'Noutopöytä'
                      : 'Buffet'}
                </p>

                {meal ? (
                  <ul>
                    <li>
                      {finnish
                        ? `Nimi - ${meal.name_fi}`
                        : `Name - ${meal.name_en}`}{' '}
                    </li>
                    <li>
                      {finnish
                        ? `Hinta - ${meal.cost.toFixed(2)} €`
                        : `Cost - ${meal.cost.toFixed(2)} €`}
                    </li>
                    <li>
                      {finnish
                        ? `Tietoa - ${meal.description_fi}`
                        : `Description - ${meal.description_en}`}
                    </li>
                    <li className="text-red-600">{meal.type}</li>
                  </ul>
                ) : (
                  <p>{finnish ? 'Ei saatavilla' : 'Not available'}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklistBox;
