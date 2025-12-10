"use strict";

import {
  listAllReservations,
  findReservationById,
  addReservation,
  modifyReservation,
  removeReservation,
  findReservationsByUserId,
  findReservationsByOrder,
  findReservationsByDate,
} from "../models/reservation-model.js";

/**n * @api {get} /reservations Get all reservationsn * @apiName GetReservationsn * @apiGroup Reservationn *n * @apiHeader {String} Authorization Bearer token (admin)n * @apiDescription Returns an array of all reservations. This endpoint is protected
 * and the router applies `authenticateToken` and `userIsAdmin` middleware. Each
 * reservation object contains `id`, `user`, `order`, `date`, `table_customer_count`,
 * `grill_customer_count`, and `message`.
 *
 * @apiSuccess (200) {Object[]} reservations Array of reservation objects
 *
 * @apiError (401) Unauthorized Invalid or missing token / not admin
 * @apiError (500) Internal server error
 *
 * @note If no reservations are found some implementations return HTTP 200 with
 * a plain text message `no reservations found`.
 */
const getReservations = async (req, res) => {
  try {
    console.log("getReservations in reservation-controller");
    console.log("user authenticated:" + res.locals.user);

    //TODO: only admins can get all reservations!

    const result = await listAllReservations();
    if (result) {
      return res.json(result);
    } else {
      console.log("no reservations found");
      return res.status(200).send("no reservations found");
    }
  } catch (error) {
    console.log("error in getReservations in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /reservations/:id Get reservation by ID
 * @apiName GetReservationById
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Reservation ID
 * @apiDescription Returns a single reservation object. The router requires an
 * authenticated token for this endpoint. If the reservation is not found the
 * endpoint returns HTTP 404.
 *
 * @apiSuccess (200) {Object} reservation Reservation object
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) Reservation not found
 * @apiError (500) Internal server error
 */
const getReservationById = async (req, res) => {
  try {
    //TODO: user should be allowed to access only their own reservations
    console.log("getReservationById in reservation-controller");
    console.log(req.params.id);
    const reservation = await findReservationById(req.params.id);
    if (reservation) {
      console.log("return reservation" + req.params.id);
      return res.json(reservation);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getReservationById in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /reservations Create new reservation
 * @apiName PostReservation
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiBody {Number} user User ID
 * @apiBody {Number} order Order ID
 * @apiBody {String} date Reservation date/time (YYYY-MM-DD HH:mm:ss)
 * @apiBody {Number} table_customer_count Table reservation customer count
 * @apiBody {Number} grill_customer_count Grill reservation customer count
 * @apiBody {String} [message] Optional description
 * @apiDescription Creates a new reservation. The router applies `authenticateToken`,
 * `filterIfPurchase` and `formatBodyTypes` middleware. On success the created
 * reservation object is returned. If creation fails the controller returns 404
 * (legacy behavior) or 500 on server error.
 *
 * @apiSuccess (200) {Object} reservation Created reservation object
 *
 * @apiError (400) Bad Request Invalid payload
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) Failed to create reservation
 * @apiError (500) Internal server error
 */
const postReservation = async (req, res) => {
  try {
    console.log("postReservation in reservation-controller");
    console.log(req.body);

    const result = await addReservation(req.body);
    if (result) {
      console.log("added reservation: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postReservation in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /reservations/:id Update reservation
 * @apiName PutReservation
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Reservation ID
 * @apiBody {Number} [user] User ID
 * @apiBody {Number} [order] Order ID
 * @apiBody {String} [date] Reservation date/time (YYYY-MM-DD HH:mm:ss)
 * @apiBody {Number} [table_customer_count] Table reservation customer count
 * @apiBody {Number} [grill_customer_count] Grill reservation customer count
 * @apiBody {String} [message] Optional description
 * @apiDescription Updates an existing reservation. The router requires an
 * authenticated token and uses `formatIdToNumber` and `formatBodyTypes` before
 * calling this controller. On success the updated reservation object is
 * returned. If the reservation is not found the controller returns 404.
 *
 * @apiSuccess (200) {Object} reservation Updated reservation object
 *
 * @apiError (400) Bad Request Invalid payload
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) Reservation not found
 * @apiError (500) Internal server error
 */
const putReservation = async (req, res) => {
  try {
    //TODO: user should be allowed to access only their own reservations
    console.log("putReservation in reservation-controller");
    console.log("user authenticated:" + res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyReservation(
      req.body,
      req.params.id,
      res.locals.user
    );
    if (result) {
      console.log("return reservation: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putReservation in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /reservations/:id Delete reservation
 * @apiName DeleteReservation
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Reservation ID
 * @apiDescription Deletes a reservation. The controller delegates authorization
 * checking to the model layer. On success returns HTTP 200 with a textual
 * success message; if the reservation is not found returns 404.
 *
 * @apiSuccess (200) {String} message Success message
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) Reservation not found
 * @apiError (500) Internal server error
 */
const deleteReservation = async (req, res) => {
  try {
    //TODO: user should be allowed to access only their own reservations

    console.log("deleteReservation in reservation-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeReservation(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteReservation: reservation not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteReservation in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /reservations/user/:id Get reservations by user ID
 * @apiName GetReservationByUserId
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token (user or admin)
 * @apiParam {Number} id User ID
 * @apiDescription Returns reservations for the specified user. The router
 * applies `filterByUserIdOrAdmin` to ensure that only the user or an admin
 * may access this endpoint. If no reservations found the controller returns 404.
 *
 * @apiSuccess (200) {Object[]|Object} reservations Array of reservation objects or single reservation
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (403) Forbidden User not authorized to view these reservations
 * @apiError (404) No reservations found for user
 * @apiError (500) Internal server error
 */
const getReservationByUserId = async (req, res) => {
  try {
    //filterByUserIdOrAdmin filter unauthorized users
    console.log("getReservationByUserId in reservation-controller");
    console.log(req.params.id);
    const reservationArray = await findReservationsByUserId(req.params.id);
    if (reservationArray) {
      console.log("return reservations for user " + req.params.id);
      return res.json(reservationArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getReservationByUserId in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /reservations/order/:id Get reservations by order ID
 * @apiName GetReservationByOrder
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam {Number} id Order ID
 * @apiDescription Returns reservations linked to the given order id. This
 * endpoint is protected and requires an admin token (router applies
 * `userIsAdmin`). If none found returns 404.
 *
 * @apiSuccess (200) {Object[]} reservations Array of reservation objects
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) No reservations found for order
 * @apiError (500) Internal server error
 */
const getReservationByOrder = async (req, res) => {
  try {
    console.log("getReservationByOrder in reservation-controller");
    console.log(req.params.id);
    const reservationArray = await findReservationsByOrder(req.params.id);
    if (reservationArray) {
      console.log("return reservations for order ", req.params.id);
      return res.json(reservationArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getReservationByOrder in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /reservations/date/:date Get reservations by date
 * @apiName GetReservationByDate
 * @apiGroup Reservation
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam {String} date Date/timestamp to filter reservations
 * @apiDescription The `date` parameter should match the `date` column value
 * (e.g. `YYYY-MM-DD HH:mm:ss`). This endpoint requires an admin token.
 *
 * @apiSuccess (200) {Object[]} reservations Array of reservation objects
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) No reservations found for date
 * @apiError (500) Internal server error
 */
const getReservationByDate = async (req, res) => {
  try {
    console.log("getReservationByDate in reservation-controller");
    console.log("date: ", req.params.date);
    const reservationArray = await findReservationsByDate(req.params.date);
    if (reservationArray) {
      console.log("return reservations for date " + req.params.date);
      return res.json(reservationArray);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getReservationByDate in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /reservations/list/id Get reservation list by IDs
 * @apiName GetReservationList
 * @apiGroup Reservation
 * @apiDescription Takes an array of reservation IDs in the request body under
 * `reservations` and returns the corresponding reservation objects. Missing
 * `reservations` in the request body results in HTTP 404 with message
 * `No id array found in request.`
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiBody {Number[]} reservations Array of reservation IDs
 *
 * @apiSuccess (200) {Object[]} reservations Array of reservation objects
 *
 * @apiError (400) Bad Request Invalid body
 * @apiError (404) No ID array in request
 * @apiError (500) Internal server error
 */
const getReservationList = async (req, res) => {
  try {
    console.log("getReservationList in reservation-controller");

    if (req.body.reservations) {
      const reservationArray = await Promise.all(
        req.body.reservations.map((id) => findReservationById(id))
      );
      console.log("reservations found: ", reservationArray);
      res.json(reservationArray);
    } else {
      console.log(
        "no id array in getReservationList in reservation-controller"
      );
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getReservationList in reservation-controller");
    res.sendStatus(500);
  }
};

/**
 * @api {get} /reservations/date/:date Get reservation count by date
 * @apiName GetReservationCountByDate
 * @apiGroup Reservation
 *
 * @apiParam {String} date Date/timestamp to filter reservations
 * @apiDescription Returns the number of reservations for the given date. This
 * endpoint is public (no auth middleware applied in the router) and returns
 * a numeric count on success.
 *
 * @apiSuccess (200) {Number} count Number of reservations for date
 *
 * @apiError (500) Internal server error
 */
const getReservationCountByDate = async (req, res) => {
  try {
    console.log("getReservationCountByDate in reservation-controller");
    console.log("date: ", req.params.date);
    const reservationArray = await findReservationsByDate(req.params.date);
    if (reservationArray) {
      console.log("return reservation count for date " + req.params.date);
      return res.json(reservationArray.length);
    } else {
      console.log(
        "error in getReservationCountByDate in reservation-controller"
      );
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log("error in getReservationCountByDate in reservation-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

export {
  getReservations,
  getReservationById,
  postReservation,
  putReservation,
  deleteReservation,
  getReservationByUserId,
  getReservationByOrder,
  getReservationByDate,
  getReservationCountByDate,
  getReservationList,
};
