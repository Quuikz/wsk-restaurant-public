"use strict";

import bcrypt from "bcrypt";

import {
  listAllOrders,
  findOrderById,
  addOrder,
  modifyOrder,
  removeOrder,
  findOrdersByUserId,
  findOrdersByTimestamp,
} from "../models/order-model.js";

/**
 * @api {get} /orders Get all orders
 * @apiName GetOrders
 * @apiGroup Order
 *
 * @apiSuccess {Array} orders Array of order objects
 *
 * @apiError 500 Internal server error
 */
const getOrders = async (req, res) => {
  try {
    console.log("getOrders in order-controller");
    const user = res.locals.user;
    console.log("user authenticated:" + res.locals.user);

    //TODO: only admins can get all orders!

    const result = await listAllOrders();
    return res.json(result);
  } catch (error) {
    console.log("error in listAllUsers");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /orders/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Order
 *
 * @apiParam {Number} id Order ID
 *
 * @apiSuccess {Object} order Order object
 *
 * @apiError 404 Order not found
 * @apiError 500 Internal server error
 */
const getOrderById = async (req, res) => {
  try {
    console.log("getOrderById in order-controller");
    console.log(req.params.id);
    const order = await findOrderById(req.params.id);
    if (order) {
      console.log("return order" + req.params.id);
      return res.json(order);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getOrderById in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /orders Create new order
 * @apiName PostOrder
 * @apiGroup Order
 *
 * @apiParam {Object} body Order object
 *
 * @apiSuccess {Object} order Created order object
 *
 * @apiError 404 Failed to create order
 * @apiError 500 Internal server error
 */
const postOrder = async (req, res) => {
  try {
    console.log("postOrder in order-controller");
    console.log(req.body);

    const result = await addOrder(req.body);
    if (result) {
      console.log("added order: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postOrder in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /orders/:id Update order
 * @apiName PutOrder
 * @apiGroup Order
 *
 * @apiParam {Number} id Order ID
 * @apiParam {Object} body Updated order object
 *
 * @apiSuccess {Object} order Updated order object
 *
 * @apiError 404 Order not found
 * @apiError 500 Internal server error
 */
const putOrder = async (req, res) => {
  try {
    console.log("putOrder in order-controller");
    console.log("user authenticated:" + res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyOrder(req.body, req.params.id, res.locals.user);
    if (result) {
      console.log("return order: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putOrder in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 *
 * @apiParam {Number} id Order ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Order not found
 * @apiError 500 Internal server error
 */
const deleteOrder = async (req, res) => {
  try {
    console.log("deleteOrder in order-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeOrder(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteOrder: order not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteOrder in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /orders/user/:id Get orders by user ID
 * @apiName GetOrdersByUserId
 * @apiGroup Order
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Array} orders Array of orders for user
 *
 * @apiError 404 No orders found for user
 * @apiError 500 Internal server error
 */
const getOrdersByUserId = async (req, res) => {
  try {
    console.log("getOrderByUserId in order-controller");
    console.log(req.params.id);
    const orderArray = await findOrdersByUserId(req.params.id);
    if (orderArray) {
      console.log("return orders for user " + req.params.id);
      return res.json(orderArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getOrderByUserId in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /orders/location/:id Get orders by location ID
 * @apiName GetOrdersByLocation
 * @apiGroup Order
 *
 * @apiParam {Number} id Location ID
 *
 * @apiSuccess {Array} orders Array of orders for location
 *
 * @apiError 404 No orders found for location
 * @apiError 500 Internal server error
 */
const getOrdersByLocation = async (req, res) => {
  try {
    console.log("getOrderByLocation in order-controller");
    console.log(req.params.id);
    const orderArray = await findOrdersByLocation(req.params.id);
    if (orderArray) {
      console.log("return orders for location " + req.params.id);
      return res.json(orderArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getOrderByLocation in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /orders/date/:date Get orders by date
 * @apiName GetOrdersByDate
 * @apiGroup Order
 *
 * @apiParam {String} date Date/timestamp to filter orders
 *
 * @apiSuccess {Array} orders Array of orders for date
 *
 * @apiError 404 No orders found for date
 * @apiError 500 Internal server error
 */
const getOrdersByDate = async (req, res) => {
  try {
    console.log("getOrderByDate in order-controller");
    console.log(req.params.date);
    const orderArray = await findOrdersByTimestamp(req.params.date);
    if (orderArray) {
      console.log("return orders for date " + req.params.date);
      return res.json(orderArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getOrderByLocation in order-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /orders/list Get order list by IDs
 * @apiName GetOrderList
 * @apiGroup Order
 * @apiDescription Takes an array of order IDs and returns corresponding order objects
 *
 * @apiParam {Array} orders Array of order IDs
 *
 * @apiSuccess {Array} orders Array of order objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
 */
const getOrderList = async (req, res) => {
  try {
    console.log("getOrderList in order-controller");

    if (req.body.orders) {
      const orderArray = await Promise.all(
        req.body.orders.map((id) => findOrderById(id))
      );
      console.log("orders found: ", orderArray);
      res.json(orderArray);
    } else {
      console.log("no id array in getOrderList in order-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getOrderList in order-controller");
    res.sendStatus(500);
  }
};

export {
  getOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
  getOrdersByUserId,
  getOrdersByLocation,
  getOrdersByDate,
  getOrderList,
};
