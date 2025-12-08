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

const WeeklistBox = ({date}) => {
  const weekDate = isoToDate(date);

  const {getMenuByDate} = useMenuCommon();
  const [dailyMenu, setDailyMenu] = useState([]);

  console.log('Menu item: ', weekDate);
  //console.log('Menu item meals IDs: ', menuItem.meals);

  useEffect(() => {
    // Load all menu items

    const loadDailyMenu = async () => {
      try {
        const mealData = await getMenuByDate(weekDate);
        setDailyMenu(mealData);
        console.log('MEAL DATA: ', mealData);
      } catch (error) {
        console.log('Error in loadMenuItems: ', error);
      }
    };
    loadDailyMenu();
  }, []);

  const handleDailyMealInfo = async () => {
    let meals = [];

    if (dailyMenu.meals?.length > 0) {
      meals = await getMealsByIDList(dailyMenu.meals);
    }

    setSelectedOrder({
      ...order,
      reservations: reservations,
      gift_cards: giftcards,
    });

    setShowViewOrderModal(true);
  };

  /*
      <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
      <div className="px-6">
        <h3 className="text-3xl  mt-2 text-center border-b">
          {isoToWeekdayName(menuItem.date)} | {isoToDate(menuItem.date)}
        </h3>
        <div className="grid grid-cols-2 gap-4 my-4">
          <p className="mt-1 font-bold">Grilli spesiaali</p>

          <ul>
            <li>ID - {menuItem.meals[0].id}</li>
            <li>Nimi - {menuItem.meals[0].name_fi}</li>
            <li>Hinta - {menuItem.meals[0].cost}€</li>
            <li>Tietoa - {menuItem.meals[0].description_fi}</li>
          </ul>

          <p className="mt-1 font-bold">Noutopöytä</p>
          <ul>
            <li>Nimi - {menuItem.meals[1].name_fi}</li>
            <li>Hinta - {menuItem.meals[1].cost}€</li>
            <li>Tietoa - {menuItem.meals[1].description_fi}</li>
          </ul>
        </div>
      </div>
    </div>
  */
  return <></>;
};

export default WeeklistBox;
