import {useEffect, useMemo, useState} from 'react';
import {useMenuCommon} from '../../hooks/common/apiHooks.js';
import WeeklistBox from './Weeklist/WeeklistBox';

const Weeklist = () => {
  const {getAllMenuItems} = useMenuCommon();
  const [menuItems, setMenuItems] = useState([]);
  // Set current week number here
  // Currently hardcoded to 12 for testing
  const initialWeek = 50;
  const [currentWeek, setCurrentWeek] = useState(initialWeek);

  // Button managers for week navigation
  const min = initialWeek;
  const max = initialWeek + 3;
  const inc = (set) => () => set((v) => Math.min(max, v + 1));
  const dec = (set) => () => set((v) => Math.max(min, v - 1));

  useEffect(() => {
    // Load all menu items
    const loadAllMenuItems = async () => {
      try {
        const menuData = await getAllMenuItems();
        setMenuItems(menuData);
        console.log(menuData);
      } catch (error) {
        console.log('Error in loadMenuItems: ', error);
      }
    };
    loadAllMenuItems();
  }, []);

  // Filter the menu items for the current week (memoized)
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.week === currentWeek);
  }, [menuItems, currentWeek]);

  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <div className="p-7 pt-20 pb-30 bg-orange-100 min-h-screen">
          {/* Page title */}
          <div className="text-center w-full pb-10 ">
            <h2 className="text-3xl font-medium">| Viikko {currentWeek} |</h2>
            <p className="mt-2 ">Tutustu viikon herkkulliseen valikoimaan!</p>
          </div>

          {/* Weekly list */}
          <div className="grid grid-cols-3 gap-4 ">
            {filteredMenuItems.map((menuItem) => (
              <WeeklistBox key={menuItem.id} menuItem={menuItem} />
            ))}
          </div>

          <div className="grid grid-cols-2 mt-10">
            <button
              className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 width-fit mr-auto"
              onClick={dec(setCurrentWeek)}
            >
              ← Viime viikko
            </button>
            <button
              className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 width-fit ml-auto"
              onClick={inc(setCurrentWeek)}
            >
              Ensi viikko →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weeklist;
