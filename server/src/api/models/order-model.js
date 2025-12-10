"use strict";

//default datastructure
import promisePool from "../../utils/database.js";

const default_order = {
  id: 1,
  user: 1, //user.id = who made the order
  cost: 10.5,
  timestamp: "2025-12-06 12:00:00",
  reservations: [], //Vieras avain osoittamaan reservations tauluun, esim. id:1 id:2 id:3
  gift_cards: [], //Vieras avain osoittamaan giftcards tauluun.
  message:
    "reservations = array of reservation id, gift_cards = array of card id",
};

/**
 * Gets reservations and gift_cards arrays for one order object from database
 * @param order
 * @return {Promise<*>}
 */
const getOrderSubArrays = async (order) => {
  const [reservationArray] = await promisePool.query(
    `SELECT reservation FROM order_reservations WHERE order_reservations.order = ${order.id}`
  );
  order.reservations = reservationArray.map(
    (reservationObject) => reservationObject.reservation
  );

  const [gift_cardArray] = await promisePool.query(
    `SELECT gift_card FROM order_gift_cards WHERE order_gift_cards.order = ${order.id}`
  );
  order.gift_cards = gift_cardArray.map(
    (gift_cardObject) => gift_cardObject.gift_card
  );

  //console.log(order);
  return order;
};

/**
 * @function
 * @return
 * array of all objects or false if error
 */
const listAllOrders = async () => {
  try {
    console.log("listAllOrders in order-model");

    //get all orders
    const [orderArray] = await promisePool.query("SELECT * FROM orders");

    //get arrays for all orders
    if (orderArray) {
      const returnArray = await Promise.all(
        orderArray.map((order) => getOrderSubArrays(order))
      );
      console.log("return array in listAllOrders in order-model:", returnArray);
      return returnArray;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in listAllOrders in order-model");
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
    console.log("findOrderById in order-model");
    const query = promisePool.format(
      "SELECT * FROM orders where orders.id = ?",
      id
    );
    const [orderArray] = await promisePool.execute(query);

    if (orderArray.length > 0) {
      //get meal array for all orders
      const returnArray = await Promise.all(
        orderArray.map((order) => getOrderSubArrays(order))
      );
      console.log(
        "return order in findOrderById in order-model:",
        returnArray[0]
      );
      return returnArray[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 *
 * @return
 * object added to array/database or false if fails
 * @param order
 */
const addOrder = async (order) => {
  try {
    console.log("addOrder in order-model");

    //get connection for transaction
    const connection = await promisePool.getConnection();

    try {
      //start transaction
      await connection.beginTransaction();

      //default order values overridden by order
      const newOrder = {
        ...default_order,
        ...order,
        message: "new order added by order-model",
      };
        console.log('new order in addOrder:', newOrder);

      //sql for orders table
      const orderSql = `INSERT INTO orders (user, cost, timestamp, message)
                   VALUES (?,?,?,?)`;
      console.log(orderSql);

      //sql parameters
      const orderParams = [
        newOrder.user,
        newOrder.cost,
        newOrder.timestamp,
        newOrder.message,
      ];
      console.log(orderParams);

      //execute sql for orders table
      const orderResult = await connection.execute(orderSql, orderParams);
      console.log(orderResult);

      //sql for order.reservations and order.gift_cards arrays
      if (orderResult[0].insertId && orderResult[0].affectedRows > 0) {

        //sql for reservations
          let resResult = true;
          if (newOrder.reservations.length > 0) {
              const reservationSql = `INSERT INTO order_reservations (\`order\`, reservation)
                                      VALUES ?`;
              console.log(reservationSql);

              //parameters
              const reservationParams = [];
              newOrder.reservations.forEach((resId) => {
                  reservationParams.push([orderResult[0].insertId, resId]);
              });
              console.log(reservationParams);

              const formatted_res = connection.format(reservationSql, [
                  reservationParams,
              ]);
              console.log(formatted_res);
              resResult = await connection.execute(formatted_res);
          }

        //sql for gift_cards
          let gcResult = true;
          if(newOrder.gift_cards.length > 0) {
              const gcSql = `INSERT INTO order_gift_cards (\`order\`, gift_card)
                             VALUES ?`;
              console.log(gcSql);

              //parameters
              const gift_cardParams = [];
              newOrder.gift_cards.forEach((gcId) => {
                  gift_cardParams.push([orderResult[0].insertId, gcId]);
              });
              console.log(gift_cardParams);

              const formatted_gc = connection.format(gcSql, [gift_cardParams]);
              console.log(formatted_gc);
              gcResult = await connection.execute(formatted_gc);
          }

        //if results
        if (resResult && gcResult) {
          //TODO: better error checking
          //return added order
          console.log("Order added");
          await connection.commit();
          return findOrderById(orderResult[0].insertId);
        } else {
          return false;
        }
      } else {
        console.log("Order not added");
        return false;
      }
    } catch (error) {
      //this will revert all sql queries if one fails
      await connection.rollback();
      console.error("database error, rollback transaction", error.message);
      return false;
    } finally {
      await connection.release();
    }
  } catch (error) {
    console.log("error getting database connection in order-model");
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
    console.log("modifyOrder: ", orderId, order);

    //get previous order
    const previousOrder = await findOrderById(orderId);

    //abort if not found
    if (!previousOrder) {
      return false;
    }

    //previous order values overridden by new order
    const updatedOrder = {
      ...previousOrder,
      ...order,
      message: "order modified by order-model",
    };
    console.log("values to update: ", updatedOrder);

    //get connection for transaction
    const connection = await promisePool.getConnection();

    try {
      //start transaction
      await connection.beginTransaction();

      /*    //disable foreign key checks
            await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);*/

      //sql for orders table
      const orderSql = `UPDATE orders SET user = ?, cost = ?, timestamp = ?, message = ?, deleted = ? 
                   WHERE orders.id = ?`;
      console.log(orderSql);

      //sql parameters
      const orderParams = [
        updatedOrder.user,
        updatedOrder.cost,
        updatedOrder.timestamp,
        updatedOrder.message,
        updatedOrder.deleted,
        orderId,
      ];
      console.log(orderParams);

      //execute sql for orders table
      const orderResult = await connection.execute(orderSql, orderParams);
      console.log(orderResult);

      //sql for order.reservations array into order_meals table //TODO: does this catch errors?
      if (orderResult[0].affectedRows > 0) {
        console.log("orderResult ok");

        //delete old array from order_reservations
        await connection.execute(
          `DELETE FROM order_reservations WHERE order_reservations.order = ?`,
          [updatedOrder.id]
        );
        ////delete old array from order_gift_cards
        await connection.execute(
          `DELETE FROM order_gift_cards WHERE order_gift_cards.order = ?`,
          [updatedOrder.id]
        );

        //insert new values into order_reservations
        //sql
        const resSql = `INSERT INTO order_reservations (\`order\`, reservation)
                   VALUES ?`;
        console.log(resSql);

        const resParams = [];
        updatedOrder.reservations.forEach((resId) => {
          resParams.push([updatedOrder.id, resId]);
        });
        console.log(resParams);

        //insert parameters
        const formatted_res = connection.format(resSql, [resParams]);
        console.log(formatted_res);

        //execute sql
        const resResult = await connection.execute(formatted_res);

        //insert new values into order_gift_cards
        //sql
        const gcSql = `INSERT INTO order_gift_cards (\`order\`, gift_card)
                   VALUES ?`;
        console.log(gcSql);

        const gcParams = [];
        updatedOrder.gift_cards.forEach((gcId) =>
          gcParams.push([updatedOrder.id, gcId])
        );
        console.log(gcParams);

        //insert parameters
        const formatted_gc = connection.format(gcSql, [gcParams]);
        console.log(formatted_gc);

        //execute sql
        const gcResult = await connection.execute(formatted_gc);

        //if result is success
        if (resResult && gcResult) {
          //TODO: better error checking
          //return added order
          console.log("Order updated");
          await connection.commit();
          return findOrderById(updatedOrder.id);
        } else {
          await connection.rollback();
          return false;
        }
      } else {
        await connection.rollback();
        console.log("Order not updated");
        return false;
      }
    } catch (error) {
      //this will revert all sql queries if one fails
      await connection.rollback();
      console.error("database error, rollback transaction", error.message);
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

      //delete from order_reservations table
      const resSql =
        "DELETE FROM order_reservations WHERE order_reservations.order = ?";
      const resParams = [orderId];
      const [resResult] = await connection.execute(resSql, resParams);

      //delete from order_gift_cards table
      const gcSql =
        "DELETE FROM order_gift_cards WHERE order_gift_cards.order = ?";
      const gcParams = [orderId];
      const [gcResult] = await connection.execute(gcSql, gcParams);

      //if result commit to transaction, return true
      if (resResult && gcResult) {
        console.log("order removed:", orderId);
        await connection.commit();
        return true;
      } else {
        console.log("order not removed:", mealResult);
        await connection.rollback();
        return false;
      }
    } catch (error) {
      await connection.rollback();
      console.error("error", error);
      return false;
    } finally {
      await connection.release();
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

/**
 * @return
 * array filtered by date given or false if error. Can retrun empty array.

 * @param userId
 */
const findOrdersByUserId = async (userId) => {
  try {
    console.log("findOrderById in order-model");
    const query = promisePool.format(
      "SELECT * FROM orders where orders.user = ?",
      userId
    );
    const [orderArray] = await promisePool.execute(query);

    if (orderArray.length > 0) {
      //get arrays for all orders
      const returnArray = await Promise.all(
        orderArray.map((order) => getOrderSubArrays(order))
      );
      console.log(
        "return order in findOrderById in order-model:",
        returnArray[0]
      );
      return returnArray[0];
    } else {
      return false;
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
const findOrdersByTimestamp = async (date) => {
  try {
    console.log("findOrdersByDate in order-model");
    const query = promisePool.format(
      "SELECT * FROM orders where orders.timestamp = ?",
      userId
    );
    const [orderArray] = await promisePool.execute(query);

    if (orderArray.length > 0) {
      //get arrays for all orders
      const returnArray = await Promise.all(
        orderArray.map((order) => getOrderSubArrays(order))
      );
      console.log(
        "return order in findOrdersByDate in order-model:",
        returnArray[0]
      );
      return returnArray[0];
    } else {
      return false;
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
  findOrdersByTimestamp,
};
