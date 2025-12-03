

//example datastructure
import {default_menu} from "../../../../database/datastructures.js";

const menus = [
    {...default_menu, id: 1, message: "menu number 1 in menu model"},
    {...default_menu, id: 2, message: "menu number 2 in menu model"},
    {...default_menu, id: 3, message: "menu number 3 in menu model"},
];

/**
 *
 * @return
 * array of all objects or false if error
 */
const listAllMenus = async () => {
    try {
        return menus;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return
 * first object that has the id or false if not found or error
 */
const findMenuById = async (id) => {
    try {
        const resultArray = menus.filter(menu => menu.id === Number(id));
        if (resultArray.length > 0) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param menu
 * @return
 * object added to array/database or false if fails
 */
const addMenu = async (menu) => {
    try {
        menus.push(menu);
        return menus[menus.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 *
 * @param menu menu object
 * @param menuId number
 * @return {Promise<*|boolean>}
 * menu or false if error or not found
 */
const modifyMenu = async (menu, menuId) => {
    try {
        console.log('modifyMenu: ',menuId, menu);
        const index = menus.findIndex( (d) => {
            console.log(d.id, menuId);
            return  d.id === Number(menuId);  //Has to be number!
        } );


        if (index >= 0) {
            console.log('found at:'+index);
            menus.splice(index,1, {...menus[index], ...menu });
            return menus[index];

        } else {
            console.log('not found: ',menuId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param menuId number
 * @return {Promise<boolean>} false if not found
 */
const removeMenu = async (menuId) => {
    try {
        const index = menus.findIndex(menu => menu.id === Number(menuId));
        if (index >= 0) {
            menus.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

};

/**
 * @param locationId
 * @return
 * array filtered by id given or false if error

 */
const findMenusByLocation = async (locationId) => {
    try {
        const resultArray = menus.filter(menu => menu.location === Number(locationId));
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * @param date
 * @return
 * array filtered by id given or false if error

 */
const findMenusByDate = async (date) => {
    try {
        const resultArray = menus.filter(menu => menu.date === date);
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    listAllMenus,
    findMenuById,
    addMenu,
    modifyMenu,
    removeMenu,
    findMenusByLocation,
    findMenusByDate
};
