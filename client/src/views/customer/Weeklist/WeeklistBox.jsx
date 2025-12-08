import React, {useEffect, useState} from 'react';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';

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

// Function to convert ISO date to date string "YYYY-MM-DD"
function isoToDate(isoDate) {
  if (!isoDate) return 'Päivämäärä puuttuu';

  let datePart = isoDate;
  if (typeof isoDate === 'string' && isoDate.includes('T')) {
    datePart = isoDate.split('T')[0];
  }

  return datePart;
}

//DO NOT LOOK ABOVE THIS CODE
const WeeklistBox = ({menu}) => {
  //const weekDate = isoToDate(menu.date);
  const dateString = menu?.date?.split('T')[0];
  //console.log(dateString);

  const {getMenuByDate} = useMenuCommon();
  const {getMealByIDList} = useMealCommon();
  const [dailyMenu, setDailyMenu] = useState([]);
  const [meals, setMeals] = useState([]);
  //const [selectedMenu, setSelectedMenu] = useState(null);

  //const [showDailyMenuMeals, setShowDailyMenuMeals] = useState(false);

  //console.log('Menu item: ', weekDate);
  //console.log('Menu item meals IDs: ', menuItem.meals);

  useEffect(() => {
    if (!dateString) {
      return;
    }
    // Load all menu items

    const loadMenuForDay = async () => {
      try {
        const menuData = await getMenuByDate(dateString);
        //console.log('Date string in useEffect: ', dateString);
        setDailyMenu(menuData);
        console.log('DAILY MENU: ', dailyMenu);
        console.log('MENU DATA: ', menuData.meals);
        //console.log('MEAL FETCH: ', menuData[0].meals[0]);

        //Load meals for Menu of the day
        if (menuData.length > 0) {
          //console.log(dailyMenu);
          const mealItems = await getMealByIDList(dailyMenu);
          console.log('MEAL DATA: ', mealItems);
          setMeals(mealItems);
        }
      } catch (error) {
        console.log('Error in loadMenuItems: ', error);
      }
    };
    loadMenuForDay();
  }, [dateString]);

  /*
  const handleDailyMealInfo = async () => {
    let meals = [];

    if (dailyMenu.meals?.length > 0) {
      meals = await getMealsByIDList(dailyMenu.meals);
    }

    setSelectedMenu({
      ...dailyMenu,
      meals: meals,
    });

    setShowDailyMenuMeals(true);
  };
  */

  //console.log('GET MEALS', meals);
  return (
    <>
      <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
        <div className="px-6">
          <h3 className="text-3xl  mt-2 text-center border-b">{dateString}</h3>
          <div className="grid grid-cols-2 gap-4 my-4">
            <p className="font-bold">Grilli spesiaali</p>
            {meals[0] ? (
              <ul>
                <li>ID - {meals[0].id}</li>
                <li>Nimi - {meals[0].name_fi}</li>
                <li>Hinta - {meals[0].cost}€</li>
                <li>Tietoa - {meals[0].description_fi}</li>
              </ul>
            ) : (
              <p>Ei saatavilla</p>
            )}

            <p className="font-bold">Noutopöytä</p>
            {meals[1] ? (
              <ul>
                <li>Nimi - {meals[1].name_fi}</li>
                <li>Hinta - {meals[1].cost}€</li>
                <li>Tietoa - {meals[1].description_fi}</li>
              </ul>
            ) : (
              <p>Ei saatavilla</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklistBox;
