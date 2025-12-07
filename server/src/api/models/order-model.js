//example datastructure
import { default_order } from "../../../../database/datastructures.js";

const orders = [
  { ...default_order, id: 1, message: "order number 1 in order model" },
  { ...default_order, id: 2, message: "order number 2 in order model" },
  { ...default_order, id: 3, message: "order number 3 in order model" },
];

/**
 *
 * @return
 * array of all objects or false if error
 */
const listAllOrders = async () => {
  try {
    return orders;
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
const findOrderById = async (id) => {
  try {
    const resultArray = orders.filter((order) => order.id === Number(id));
    if (resultArray.length > 0) {
      return resultArray[0];
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
 * @param order
 * @return
 * object added to array/database or false if fails
 */
const addOrder = async (order) => {
  try {
    orders.push(order);
    return orders[orders.length - 1];
  } catch (error) {
    console.log(error);
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
    const index = orders.findIndex((d) => {
      console.log(d.id, orderId);
      return d.id === Number(orderId); //Has to be number!
    });

    if (index >= 0) {
      console.log("found at:" + index);
      orders.splice(index, 1, { ...orders[index], ...order });
      return orders[index];
    } else {
      console.log("not found: ", orderId);
      return false;
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
    const index = orders.findIndex((order) => order.id === Number(orderId));
    if (index >= 0) {
      orders.splice(index, 1);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findOrdersByUserId = async (userId) => {
  try {
    const resultArray = orders.filter((order) => order.user === Number(userId));
    if (resultArray) {
      return resultArray;
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
const findOrdersByLocation = async (locationId) => {
  try {
    const resultArray = orders.filter(
      (order) => order.location === Number(locationId)
    );
    if (resultArray) {
      return resultArray;
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
 * array filtered by id given or false if error

 */
const findOrdersByDate = async (date) => {
  try {
    const resultArray = orders.filter((order) => order.date === date);
    if (resultArray) {
      return resultArray;
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
  findOrdersByLocation,
  findOrdersByDate,
};
