import { useEffect, useState } from "react";
import { useMenu } from "../../../hooks/admin/apiHooks.js";
import MenuRow from "./MenuRow.jsx";


const Menus = () => {

    const { getAllMenuItems } = useMenu();
    const [ menuItems, setMenuItems ] = useState([]);


    useEffect(() => {
        const loadAllMenuItems = async() => {
            try{
                const menuData = await getAllMenuItems();
                setMenuItems(menuData);
                console.log(menuData);
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
                />
            ))}

        </ul>
        </>






    );
}

export default Menus;