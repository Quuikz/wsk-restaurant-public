import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/admin/apiHooks.js';
import WeeklistBox from './Weeklist/WeeklistBox';

const Weeklist = () => {
  const {getAllMenuItems} = useMenu();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
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
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="p-7 pt-20 pb-30 bg-orange-100">
          {/* Page title */}
          <div className="text-center w-full pb-10 ">
            <h2 className="text-3xl font-medium">| Viikko 1 |</h2>
            <p className="mt-2 ">
              Päivät 1-7: Lorem ipsum dolor sit amet consectetur
            </p>
          </div>

          {/* Weekly list */}
          <div className="grid grid-cols-3 gap-4 ">
            {menuItems.map((menuItem) => (
              <WeeklistBox key={menuItem.id} menuItem={menuItem} />
            ))}
          </div>

          <div className="grid grid-cols-2 mt-10">
            <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 width-fit mr-auto">
              ← Viime viikko
            </button>
            <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 width-fit ml-auto">
              Ensi viikko →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weeklist;
