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
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiDescription Returns an array of all orders. This endpoint is protected and
 * requires an admin token (checked by `userIsAdmin` middleware). Each order
 * object includes `id`, `user`, `cost`, `timestamp`, `message`, `reservations` (array),
 * and `gift_cards` (array).
 *
 * @apiSuccess (200) {Object[]} orders Array of order objects
 *
 * @apiError (401) Unauthorized Invalid or missing token / not admin
 * @apiError (500) Internal server error
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
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Order ID
 * @apiDescription Returns a single order object including its `reservations`
 * and `gift_cards` arrays. Requires an authenticated token. If the order is
 * not found the endpoint returns 404.
 *
 * @apiSuccess (200) {Object} order Order object
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) Order not found
 * @apiError (500) Internal server error
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
 * @apiBody {Number} user User ID placing the order (optional - defaults used by model)
 * @apiBody {Number} cost Total cost
 * @apiBody {String} timestamp Order timestamp (YYYY-MM-DD HH:mm:ss)
 * @apiBody {Number[]} [reservations] Reservation IDs linked to order
 * @apiBody {Number[]} [gift_cards] Gift card IDs linked to order
 * @apiBody {String} [message] Optional description
 * @apiDescription Creates a new order. Currently this endpoint is not
 * protected (no token required) in the router; the model applies default
 * values for missing fields. On success the created order object is
 * returned.
 *
 * @apiSuccess (200) {Object} order Created order object
 *
 * @apiError (400) Bad Request Invalid payload
 * @apiError (404) Failed to create order
 * @apiError (500) Internal server error
 */
const postOrder = async (req, res) => {
  try {
    console.log("postOrder in order-controller");
    console.log(req.body);

    const result = await addOrder(req.body);
    if (result) {
      console.log("added order: ", result);
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
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Order ID
 * @apiBody {Number} [id] ID (if provided must match URL param)
 * @apiBody {Number} [user] User ID placing the order
 * @apiBody {Number} [cost] Total cost
 * @apiBody {String} [timestamp] Order timestamp (YYYY-MM-DD HH:mm:ss)
 * @apiBody {Number[]} [reservations] Reservation IDs linked to order
 * @apiBody {Number[]} [gift_cards] Gift card IDs linked to order
 * @apiBody {String} [message] Optional description
 * @apiDescription Updates an existing order. If both `req.params.id` and
 * `req.body.id` are present they must match; a mismatch returns HTTP 400 with
 * message `param.id !== body.id: <param> <body>`. If the order does not exist
 * returns 404. Authorization rules: an admin may update any fields; a user
 * may only update `reservations` and `gift_cards` for their own orders.
 *
 * @apiSuccess (200) {Object} order Updated order object
 *
 * @apiError (400) Bad Request Id mismatch or invalid payload
 * @apiError (401) Unauthorized User not authorized to update this order
 * @apiError (404) Order not found
 * @apiError (500) Internal server error
 */
const putOrder = async (req, res) => {
  try {
    console.log("putOrder in order-controller");
    console.log("user authenticated:" + res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    //check for id mismatch
    if (req.params.id && req.body.id && req.params?.id !== req.body?.id) {
      console.log(req.params.id, req.body.id);
      return res
        .status(400)
        .send(`param.id !== body.id: ${req.params.id} ${req.body.id}`);
    }

    //get previous order
    const previousOrder = await findOrderById(req.params.id);

    //abort if not found
    if (!previousOrder) {
      return res.status(404).send(`No order found by id ${req.params.id}`);
    }

    //check for ownership. if user not admin, only allow edit reservations, and gift_cards
    let updatedFields = {};
    if (
      res.locals.user.role === "user" &&
      res.locals.user.id === previousOrder.user
    ) {
      updatedFields = {
        reservations: req.body.reservations,
        gift_cards: req.body.gift_cards,
        message: `order modified by user ${res.locals.user.username}`,
      };
    } else if (res.locals.user.role === "admin") {
      updatedFields = {
        ...req.body,
        message: `order modified by admin ${res.locals.user.username}`,
      };
    } else {
      return res.status(401).send("user not authorized for this order");
    }

    //previous order values overridden by new order
    const updatedOrder = {
      ...previousOrder,
      ...updatedFields,
    };

    const result = await modifyOrder(updatedOrder, previousOrder.id);
    if (result) {
      console.log("return order: ", result);
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
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Order ID
 * @apiDescription Deletes an order. The controller delegates authorization
 * checks to the model which may enforce user/admin rules. On success returns
 * an HTTP 200 with a textual success message. If the order was not found
 * returns 404.
 *
 * @apiSuccess (200) {String} message Success message
 *
 * @apiError (401) Unauthorized Invalid or missing token / not permitted
 * @apiError (404) Order not found
 * @apiError (500) Internal server error
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
 * @apiHeader {String} Authorization Bearer token (user or admin)
 * @apiParam {Number} id User ID
 * @apiDescription Returns orders for the given user id. If no orders are
 * found the controller currently returns 404. Some model functions may return
 * a single object in older implementations; callers should accept an array
 * of orders or a single order object.
 *
 * @apiSuccess (200) {Object[]|Object} orders Array of order objects or single order
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) No orders found for user
 * @apiError (500) Internal server error
 */
const getOrdersByUserId = async (req, res) => {
  try {
    console.log("getOrderByUserId in order-controller");
    console.log(req.params.id);
    const orderArray = await findOrdersByUserId(req.params.id);
    if (orderArray) {
      console.log("return orders for user ", req.params.id);
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

// NOTE: getOrdersByLocation is not currently exposed via a router endpoint.
const getOrdersByLocation = async (req, res) => {
  try {
    console.log("getOrderByLocation in order-controller");
    console.log(req.params.id);
    const orderArray = await findOrdersByLocation(req.params.id);
    if (orderArray) {
      console.log("return orders for location ", req.params.id);
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
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam {String} date Date/timestamp to filter orders (exact match)
 * @apiDescription The `date` parameter should match the `timestamp` field
 * stored in the database (e.g. `YYYY-MM-DD HH:mm:ss`). The endpoint returns
 * an array of matching orders or 404 if none are found.
 *
 * @apiSuccess (200) {Object[]} orders Array of order objects
 *
 * @apiError (401) Unauthorized Invalid or missing token / not admin
 * @apiError (404) No orders found for date
 * @apiError (500) Internal server error
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
 * @api {post} /orders/list/id Get order list by IDs
 * @apiName GetOrderList
 * @apiGroup Order
 * @apiDescription Takes an array of order IDs in the request body under
 * `orders` and returns the corresponding order objects. Missing `orders`
 * in the body leads to 404 with message `No id array found in request.`
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiBody {Number[]} orders Array of order IDs
 *
 * @apiSuccess (200) {Object[]} orders Array of order objects
 *
 * @apiError (400) Bad Request Invalid body
 * @apiError (404) No ID array in request
 * @apiError (500) Internal server error
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
