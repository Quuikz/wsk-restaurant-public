'use strict';

//default datastructure
import promisePool from "../../utils/database.js";

const default_order = {
    id : 0,
    user: 0,    //user.id = who made the order
    cost: 10.5,
    timestamp: '2025-12-06 12:00:00',
    reservations : [ 1, 2, 3 ], //Vieras avain osoittamaan reservations tauluun, esim. id:1 id:2 id:3
    gift_cards: [ 1 ],    //Vieras avain osoittamaan giftcards tauluun.
    message: 'reservations = array of reservation id, gift_cards = array of card id'
}

const orders = [
    {...default_order, id: 1, message: "order number 1 in order model"},
    {...default_order, id: 2, message: "order number 2 in order model"},
    {...default_order, id: 3, message: "order number 3 in order model"},
];

const getOrderSubArrays = async (order) => {
    const [reservationArray] = await promisePool.query(`SELECT reservation FROM order_reservations WHERE order_reservations.order = ${order.id}`);
    order.reservations = reservationArray.map(reservationObject => reservationObject.reservation);

    const [gift_cardArray] = await promisePool.query(`SELECT gift_card FROM order_gift_cards WHERE order_gift_cards.order = ${order.id}`);
    order.gift_cards = gift_cardArray.map(gift_cardObject => gift_cardObject.gift_card);

    //console.log(order);
    return order;
}


/**
 * @function
 * @return
 * array of all objects or false if error
 */
const listAllOrders = async () => {
    try {
        console.log('listAllOrders in order-model');

        //get all orders
        const [orderArray] = await promisePool.query('SELECT * FROM orders');

        //get meal array for all orders
        if (orderArray){
            const returnArray = await Promise.all( orderArray.map( order => getOrderSubArrays(order) ));

            console.log('return array in listAllOrders in order-model:',returnArray);
            return returnArray;

        } else {
            return false;
        }

    } catch (error) {
        console.log('error in listAllOrders in order-model');
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return
 * first object that has the id or false if not found or error
 */
const findOrderById = async (id) => {
    try {
        console.log('findOrderById in order-model');
        const query = promisePool.format('SELECT * FROM orders where orders.id = ?', id);
        const [orderArray] = await promisePool.execute(query);


        if (orderArray.length > 0) {
            //get meal array for all orders
            const returnArray = await Promise.all( orderArray.map( async (order) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM order_meals WHERE order_meals.order = ${order.id}`);
                order.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(order);
                return order;
            }));

            console.log('return order in findOrderById in order-model:',returnArray[0]);
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
 * @param order
 * @return
 * object added to array/database or false if fails
 */
const addOrder = async (order) => {
    try {
        console.log('addOrder in order-model');

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //start transaction
            await connection.beginTransaction();

            //default order values overridden by order
            const newOrder = {...default_order, ...order, message: "new order added by order-model"};

            //sql for orders table
            const orderSql =  `INSERT INTO orders (date, week, special_meal, image, message)
                   VALUES (?,?,?,?,?)`;
            console.log(orderSql);

            //sql parameters
            const orderParams = [
                newOrder.date,
                newOrder.week,
                newOrder.special_meal,
                newOrder.image,
                newOrder.message
            ];
            console.log(orderParams);

            //execute sql for orders table
            const orderResult = await connection.execute(orderSql, orderParams);
            console.log(orderResult);

            //sql for order.meals array into order_meals table
            if (orderResult[0].insertId && orderResult[0].affectedRows > 0 ) {

                //sql
                const mealSql =  `INSERT INTO order_meals (order, meal)
                   VALUES ?`;
                console.log(mealSql);

                //parameters
                const mealParams = [];
                order.meals.forEach((mealId) => {
                    mealParams.push( [orderResult[0].insertId, mealId] );
                })
                console.log(mealParams);

                const formatted = connection.format(mealSql , [mealParams]);
                console.log(formatted);
                const mealResult = await connection.execute(formatted);

                //if result
                if (mealResult) {  //TODO: better error checking
                    //return added order
                    console.log('Order added');
                    await connection.commit();
                    return  findOrderById(orderResult[0].insertId);

                } else {
                    return false;
                }


            } else {
                console.log('Order not added');
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
        console.log('error getting database connection in order-model');
        console.error(error);
        return false;
    }
};


/**
 *
 * @param order order object
 * @param orderId number
 * @return {Promise<*|boolean>}
 * order or false if error or not found
 */
const modifyOrder = async (order, orderId) => {
    try {
        console.log('modifyOrder: ', orderId, order);

        //get previous order
        const previousOrder = await findOrderById(orderId);

        //abort if not found
        if (!previousOrder) {
            return false;
        }

        //previous order values overridden by new order
        const updatedOrder = {...previousOrder, ...order, message: "order modified by order-model"};

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //start transaction
            await connection.beginTransaction();

            //disable foreign key checks
            await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);

            //sql for orders table
            const orderSql =  `UPDATE orders SET date = ?, week = ?, special_meal = ?, image = ?, message = ?
                   WHERE orders.id = ?`;
            console.log(orderSql);

            //sql parameters
            const orderParams = [
                updatedOrder.date,
                updatedOrder.week,
                updatedOrder.special_meal,
                updatedOrder.image,
                updatedOrder.message,
                orderId
            ];
            console.log(orderParams);

            //execute sql for orders table
            const orderResult = await connection.execute(orderSql, orderParams);
            console.log(orderResult);

            //sql for order.meals array into order_meals table //TODO: does this catch errors?
            if (orderResult[0].affectedRows > 0 ) {
                console.log('orderResult ok');

                //delete old meals array from order_meals
                await connection.execute(
                    `DELETE FROM order_meals WHERE order_meals.order = ?`,
                    [updatedOrder.id]);

                //insert new values into order_meals
                //sql
                const mealSql =  `INSERT INTO order_meals (order, meal)
                   VALUES ?`;
                console.log(mealSql);

                const mealParams = [];
                order.meals.forEach((mealId) => {
                    mealParams.push( [updatedOrder.id, mealId] );
                })
                console.log(mealParams);

                //insert parameters
                const formatted = connection.format(mealSql , [mealParams]);
                console.log(formatted);

                //execute sql
                const mealResult = await connection.execute(formatted);

                //if result is success
                if (mealResult) {  //TODO: better error checking
                    //return added order
                    console.log('Order updated');
                    await connection.commit();
                    return  findOrderById(updatedOrder.id);

                } else {
                    await connection.rollback();
                    return false;
                }


            } else {
                await connection.rollback();
                console.log('Order not updated');
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
 * @param orderId number
 * @return {Promise<boolean>} false if not found
 */
const removeOrder = async (orderId) => {
    try {
        console.log("Removing order with id:", orderId);

        //get connection for transaction
        const connection = await promisePool.getConnection();

        try {
            //get transaction
            await connection.beginTransaction();

            // Prepare delete statement for orders table
            const sql = "DELETE FROM orders WHERE id = ?";
            const params = [orderId];
            const [result] = await connection.execute(sql, params);

            //if nothing deleted, abort transaction
            if (result.affectedRows === 0) {
                await connection.rollback();
                console.log("Order not found or not removed");
                return false;
            }

            //delete from order_meals table
            const mealsSql = "DELETE FROM order_meals WHERE order_meals.order = ?";
            const mealsParams = [orderId];
            const [mealResult] = await connection.execute(mealsSql, mealsParams);

            //if result commit to transaction, return true
            if(mealResult) {
                console.log('order removed:', mealResult)
                connection.commit();
                return true;

            } else {
                console.log('order not removed:', mealResult)
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
const findOrdersByUserId = async (userId) => {
    try {
        console.log('findOrdersByDate in order-model', userId);
        const query = promisePool.format('SELECT * FROM orders where orders.user = ?', userId);
        const [orderArray] = await promisePool.execute(query);


        if (orderArray.length > 0) {
            //get meal array for all orders
            const returnArray = await Promise.all( orderArray.map( async (order) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM order_meals WHERE order_meals.order = ${order.id}`);
                order.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(order);
                return order;
            }));





            console.log('return orders in findOrdersByDate in order-model:', returnArray);
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
 * @param date
 * @return
 * array filtered by date given or false if error. Can retrun empty array.

 */
const findOrdersByDate = async (date) => {
    try {
        console.log('findOrdersByDate in order-model', date);
        const query = promisePool.format('SELECT * FROM orders where orders.date = ?', date);
        const [orderArray] = await promisePool.execute(query);


        if (orderArray.length > 0) {
            //get meal array for all orders
            const returnArray = await Promise.all( orderArray.map( async (order) => {
                const [mealArray] = await promisePool.query(`SELECT meal FROM order_meals WHERE order_meals.order = ${order.id}`);
                order.meals = mealArray.map(mealObject => mealObject.meal);
                //console.log(order);
                return order;
            }));

            console.log('return orders in findOrdersByDate in order-model:', returnArray);
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
    listAllOrders, 
    findOrderById,
    addOrder, 
    modifyOrder, 
    removeOrder, 
    findOrdersByUserId, 
    findOrdersByDate};
