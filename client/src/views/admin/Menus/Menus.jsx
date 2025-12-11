import { useEffect, useState } from "react";
import { useMenuCommon } from "../../../hooks/common/apiHooks.js";
import MenuRow from "./MenuRow.jsx";

/**
 * Component for displaying and managing menu items in the admin dashboard.
 * Fetches menu items from the API and allows deleting individual items from the list.
 * 
 * @returns The Menus page for the admin panel, displaying the list of menu items.
 */
const Menus = () => {

    const { getAllMenuItems } = useMenuCommon();
    const [ menuItems, setMenuItems ] = useState([]);


    /**
     * Removes a menu item from the state when it is deleted.
     * 
     * @param {number} deletedMenuID - The ID of a menu item to be deleted.
     */
    const deleteMenu = (deletedMenuID) => {
        setMenuItems(prev => prev.filter(menu => menu.id != deletedMenuID));
    }


    /**
     * Fetches all menu items and updates the state with the result.
     * This function is called when the component is mounted to load the menu items.
     */
    useEffect(() => {
        const loadAllMenuItems = async() => {
            try{
                const menuData = await getAllMenuItems();
                setMenuItems(menuData);
                //console.log(menuData);
            }
            catch(error){
                console.log('Error in loadMenuItems: ', error);
            }
        }
        loadAllMenuItems();
        
    }, []);



    return(
        <>
        <ul>
            {menuItems.map((menuItem) => (
                <MenuRow 
                    key={menuItem.id}
                    menuItem={menuItem}
                    onDeleteMenu={deleteMenu}
                />
            ))}
        </ul>
        </>
    );
}

export default Menus;