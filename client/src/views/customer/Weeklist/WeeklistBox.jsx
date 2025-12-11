import React, {useEffect, useState} from 'react';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';
import {useLanguageContext} from "../../../hooks/contextHooks.js";

// Function to convert ISO date to weekday name "Finnish"
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

const WeeklistBox = ({menu}) => {
  //console.log('MENU PROP: ', menu);
  console.log('MENU DATE: ', menu?.date);
  const dateString = menu?.date?.split('T')[0];
  //console.log('DATE STRING: ', dateString);

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
          const mealItems = await getMealByIDList([menu.special_meal, ...menu.meals]);
          const specialMealID = menu.special_meal;
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
                  {meal.id === specialMealID ?
                    (finnish ? 'Grilli spesiaali' : 'Grill special') :
                    (finnish ? 'Noutopöytä' : 'Buffet')}
                </p>

                {meal ? (
                  <ul>
                    <li>{finnish ? `Nimi - ${meal.name_fi}` : `Name - ${meal.name_en}`} </li>
                    <li>{finnish ? `Hinta - ${meal.cost.toFixed(2)} €` : `Cost - ${meal.cost.toFixed(2)} €`}</li>
                    <li>{finnish ? `Tietoa - ${meal.description_fi}` : `Description - ${meal.description_en}`}</li>
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
