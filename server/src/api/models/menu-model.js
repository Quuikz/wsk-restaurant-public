'use strict';

//imports
import promisePool from "../../utils/database.js";



//default datastructure
const default_menu = {
    id : 0,
    date : '2025-12-06', //date format
    week: 12, //week number
    special_meal: 1,
    meals : [1,2,3],
    image: "placeholder.jpg",
    message: 'default menu. meals array contains meal.id values. date format: YYYY-MM-DD'
}


/**
 * @function
 * @return
 * array of all objects or false if error
 */
const listAllMenus = async () => {
    try {
        console.log('listAllMenus in menu-model');

        //get all menus
        const [menuArray] = await promisePool.query('SELECT * FROM menus');

        //get meal array for all menus
        if (menuArray){
            const returnArray = await Promise.all( menuArray.map( async (menu) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM menu_meals WHERE menu_meals.menu = ${menu.id}`);
                menu.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(menu);
                return menu;
            }));

            console.log('return array in listAllMenus in menu-model:',returnArray);
            return returnArray;

        } else {
            return false;
        }

    } catch (error) {
        console.log('error in listAllMenus in menu-model');
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
        console.log('findMenuById in menu-model');
        const query = promisePool.format('SELECT * FROM menus where menus.id = ?', id);
        const [menuArray] = await promisePool.execute(query);


        if (menuArray.length > 0) {
            //get meal array for all menus
            const returnArray = await Promise.all( menuArray.map( async (menu) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM menu_meals WHERE menu_meals.menu = ${menu.id}`);
                menu.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(menu);
                return menu;
            }));

            console.log('return menu in findMenuById in menu-model:',returnArray[0]);
            return returnArray[0];

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
        console.log('addMenu in menu-model');

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //start transaction
            await connection.beginTransaction();

            //default menu values overridden by menu
            const newMenu = {...default_menu, ...menu, message: "new menu added by menu-model"};

            //sql for menus table
            const menuSql =  `INSERT INTO menus (date, week, special_meal, image, message)
                   VALUES (?,?,?,?,?)`;
            console.log(menuSql);

            //sql parameters
            const menuParams = [
                newMenu.date,
                newMenu.week,
                newMenu.special_meal,
                newMenu.image,
                newMenu.message
            ];
            console.log(menuParams);

            //execute sql for menus table
            const menuResult = await connection.execute(menuSql, menuParams);
            console.log(menuResult);

            //sql for menu.meals array into menu_meals table
            if (menuResult[0].insertId && menuResult[0].affectedRows > 0 ) {

                //sql
                const mealSql =  `INSERT INTO menu_meals (menu, meal)
                   VALUES ?`;
                console.log(mealSql);

                //parameters
                const mealParams = [];
                menu.meals.forEach((mealId) => {
                    mealParams.push( [menuResult[0].insertId, mealId] );
                })
                console.log(mealParams);

                const formatted = connection.format(mealSql , [mealParams]);
                console.log(formatted);
                const mealResult = await connection.execute(formatted);

                //if result
                if (mealResult) {  //TODO: better error checking
                    //return added menu
                    console.log('Menu added');
                    await connection.commit();
                    return  findMenuById(menuResult[0].insertId);

                } else {
                    return false;
                }


            } else {
                console.log('Menu not added');
                return false;
            }

        } catch (error) {
            //this will revert all sql queries if one fails
            await connection.rollback();
            console.error('database error, rollback transaction', error.message);
            return false;

        } finally {
            await connection.release();
        }


    } catch (error) {
        console.log('error getting database connection in menu-model');
        console.error(error);
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
        console.log('modifyMenu: ', menuId, menu);

        //get previous menu
        const previousMenu = await findMenuById(menuId);

        //abort if not found
        if (!previousMenu) {
            return false;
        }

        //previous menu values overridden by new menu
        const updatedMenu = {...previousMenu, ...menu, message: "menu modified by menu-model"};

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //start transaction
            await connection.beginTransaction();

            //disable foreign key checks
            await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);

            //sql for menus table
            const menuSql =  `UPDATE menus SET date = ?, week = ?, special_meal = ?, image = ?, message = ?
                   WHERE menus.id = ?`;
            console.log(menuSql);

            //sql parameters
            const menuParams = [
                updatedMenu.date,
                updatedMenu.week,
                updatedMenu.special_meal,
                updatedMenu.image,
                updatedMenu.message,
                menuId
            ];
            console.log(menuParams);

            //execute sql for menus table
            const menuResult = await connection.execute(menuSql, menuParams);
            console.log(menuResult);

            //sql for menu.meals array into menu_meals table //TODO: does this catch errors?
            if (menuResult[0].affectedRows > 0 ) {
                console.log('menuResult ok');

                //delete old meals array from menu_meals
                await connection.execute(
                    `DELETE FROM menu_meals WHERE menu_meals.menu = ?`,
                    [updatedMenu.id]);

                //insert new values into menu_meals
                //sql
                const mealSql =  `INSERT INTO menu_meals (menu, meal)
                   VALUES ?`;
                console.log(mealSql);

                const mealParams = [];
                menu.meals.forEach((mealId) => {
                    mealParams.push( [updatedMenu.id, mealId] );
                })
                console.log(mealParams);

                //insert parameters
                const formatted = connection.format(mealSql , [mealParams]);
                console.log(formatted);

                //execute sql
                const mealResult = await connection.execute(formatted);

                //if result is success
                if (mealResult) {  //TODO: better error checking
                    //return added menu
                    console.log('Menu updated');
                    await connection.commit();
                    return  findMenuById(updatedMenu.id);

                } else {
                    await connection.rollback();
                    return false;
                }


            } else {
                await connection.rollback();
                console.log('Menu not updated');
                return false;
            }

        } catch (error) {
            //this will revert all sql queries if one fails
            await connection.rollback();
            console.error('database error, rollback transaction', error.message);
            return false;

        } finally {
            connection.release();
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
        console.log("Removing menu with id:", menuId);

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //get transaction
            await connection.beginTransaction();

            // Prepare delete statement for menus table
            const sql = "DELETE FROM menus WHERE id = ?";
            const params = [menuId];
            const [result] = await connection.execute(sql, params);

            //if nothing deleted, abort transaction
            if (result.affectedRows === 0) {
                await connection.rollback();
                console.log("Menu not found or not removed");
                return false;
            }

            //delete from menu_meals table
            const mealsSql = "DELETE FROM menu_meals WHERE menu_meals.menu = ?";
            const mealsParams = [menuId];
            const [mealResult] = await connection.execute(mealsSql, mealsParams);

            //if result commit to transaction, return true
            if(mealResult) {
                console.log('menu removed:', mealResult)
                connection.commit();
                return true;

            } else {
                console.log('menu not removed:', mealResult)
                connection.rollback();
                return false;
            }


        } catch (error) {
            await connection.rollback();
            console.error('error', error);
            return false;

        } finally {
            await connection.release();
        }

    } catch (error) {
        console.error('error', error);
        return false;
    }

};


/**
 * @param date
 * @return
 * array filtered by date given or false if error. Can retrun empty array.

 */
const findMenusByDate = async (date) => {
    try {
        console.log('findMenusByDate in menu-model', date);
        const query = promisePool.format('SELECT * FROM menus where menus.date = ?', date);
        const [menuArray] = await promisePool.execute(query);


        if (menuArray.length > 0) {
            //get meal array for all menus
            const returnArray = await Promise.all( menuArray.map( async (menu) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM menu_meals WHERE menu_meals.menu = ${menu.id}`);
                menu.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(menu);
                return menu;
            }));

            console.log('return menus in findMenusByDate in menu-model:', returnArray);
            return returnArray;

        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param week
 * @return
 * array filtered by week number or false if error. Can return empty array.

 */
const findMenusByWeek = async (week) => {
    try {
        console.log('findMenusByWeek in menu-model', week);
        const query = promisePool.format('SELECT * FROM menus where menus.week = ?', week);
        const [menuArray] = await promisePool.execute(query);


        if (menuArray.length > 0) {
            //get meal array for all menus
            const returnArray = await Promise.all( menuArray.map( async (menu) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM menu_meals WHERE menu_meals.menu = ${menu.id}`);
                menu.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(menu);
                return menu;
            }));

            console.log('return menus in findMenusByWeek in menu-model:', returnArray);
            return returnArray;

        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};


export {
    listAllMenus,
    findMenuById,
    addMenu,
    modifyMenu,
    removeMenu,
    findMenusByDate,
    findMenusByWeek
};
