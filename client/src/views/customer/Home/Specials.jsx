import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useMealCommon, useMenuCommon} from '../../../hooks/common/apiHooks.js';

const Specials = () => {
  const realTimeWeek = () => {
    const d = new Date();
    let yearStart = +new Date(d.getFullYear(), 0, 1);
    let today = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
    let dayOfYear = (today - yearStart + 1) / 86400000;
    let week = Math.ceil(dayOfYear / 7);
    console.log(week);
    return week;
  };

  const {getMenuByDate} = useMenuCommon();
  const {getMealByIDList} = useMealCommon();
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);
  const [meals, setMeals] = useState([]);
  const [specialMealID, setSpecialMealID] = useState([]);

  // Set current week number here or use realTimeWeek function
  const currentWeek = 50;

  // Load all menu items
  useEffect(() => {
    const loadMenuByWeek = async () => {
      try {
        const menuData = await getMenuByWeek(currentWeek);
        setWeeklyMenu(menuData);
        console.log(menuData);
      } catch (error) {
        console.log('Error in loadMenuByWeek: ', error);
      }
    };
    loadMenuByWeek();
  }, [currentWeek]);

  const menu = weeklyMenu[0];

  console.log('MENU DATE: ', menu?.date);
  const dateString = menu?.date?.split('T')[0];
  //console.log('DATE STRING: ', dateString);

  // Load all menu items
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
      {/* Daily Special boxes */}
      <div className="grid grid-cols-3 gap-4 p-7 pt-20 pb-30 bg-orange-50">
        {/* Box1 */}
        {}
        <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
          <img
            src="https://placehold.co/1148x498"
            alt="Spesiaali ruoka tänään"
          />
          <div className="px-6">
            <h2 className="text-2xl  mt-2 text-center">Aterian nimi</h2>
            <p className="mt-1 font-bold">Tietoa</p>
            <ul>
              <li>Hinta</li>
              <li>Allergeenit</li>
            </ul>
            <div className="my-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300 max-w-fit hover:cursor-pointer">
              <Link to="/weeklist">Lisää</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Specials;
