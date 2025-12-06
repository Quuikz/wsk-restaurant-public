import {useEffect, useState} from 'react';
import {useMenu} from '../../../hooks/admin/apiHooks.js';
import MenuRow from '../../admin/Menus/MenuRow.jsx';

const Specials = () => {
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
      {/* Daily Special boxes */}
      <div className="grid grid-cols-3 gap-4 p-7 pt-20 pb-30 bg-orange-50">
        {/* Box1 */}
        <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
          <img
            src="https://placehold.co/1148x498"
            alt="Spesiaali ruoka tänään"
          />
          <div className="px-6">
            <h2 className="text-2xl  mt-2 text-center">
              {/*{menuItems[0].meals[0].name_fi}*/}Aterian nimi
            </h2>
            <p className="mt-1 font-bold">Tietoa</p>
            <ul>
              <li>Hinta</li>
              <li>Allergeenit</li>
            </ul>
            <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 ">
              Lisää
            </button>
          </div>
        </div>

        {/* Box2 */}
        <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
          <img
            src="https://placehold.co/1148x498"
            alt="Spesiaali ruoka huomenna"
          />
          <div className="px-6">
            <h2 className="text-2xl  mt-2 text-center">Aterian nimi</h2>
            <p className="mt-1 font-bold">Tietoa</p>
            <ul>
              <li>Hinta</li>
              <li>Allergeenit</li>
            </ul>
            <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 ">
              Lisää
            </button>
          </div>
        </div>

        {/* Box3 */}
        <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
          <img
            src="https://placehold.co/1148x498"
            alt="Spesiaali ruoka ylihuomenna"
          />
          <div className="px-6">
            <h2 className="text-2xl  mt-2 text-center">Aterian nimi</h2>
            <p className="mt-1 font-bold">Tietoa</p>
            <ul>
              <li>Hinta</li>
              <li>Allergeenit</li>
            </ul>
            <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 ">
              Lisää
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Specials;
