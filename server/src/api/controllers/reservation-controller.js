"use strict";

import bcrypt from "bcrypt";

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
import { listAllDiscounts } from "../models/discount-model.js";

/**
 * @api {get} /reservations Get all reservations
 * @apiName GetReservations
 * @apiGroup Reservation
 *
 * @apiSuccess {Array} reservations Array of reservation objects
 *
 * @apiError 500 Internal server error
 */
const getReservations = async (req, res) => {
  try {
    console.log("getReservations in reservation-controller");
    const user = res.locals.user;
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
 * @apiParam {Number} id Reservation ID
 *
 * @apiSuccess {Object} reservation Reservation object
 *
 * @apiError 404 Reservation not found
 * @apiError 500 Internal server error
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
 * @apiParam {Object} body Reservation object
 *
 * @apiSuccess {Object} reservation Created reservation object
 *
 * @apiError 404 Failed to create reservation
 * @apiError 500 Internal server error
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
 * @apiParam {Number} id Reservation ID
 * @apiParam {Object} body Updated reservation object
 *
 * @apiSuccess {Object} reservation Updated reservation object
 *
 * @apiError 404 Reservation not found
 * @apiError 500 Internal server error
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
 * @apiParam {Number} id Reservation ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Reservation not found
 * @apiError 500 Internal server error
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
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Array} reservations Array of reservations for user
 *
 * @apiError 404 No reservations found for user
 * @apiError 500 Internal server error
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
 * @apiParam {Number} id Order ID
 *
 * @apiSuccess {Array} reservations Array of reservations for order
 *
 * @apiError 404 No reservations found for order
 * @apiError 500 Internal server error
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
 * @apiParam {String} date Date/timestamp to filter reservations
 *
 * @apiSuccess {Array} reservations Array of reservations for date
 *
 * @apiError 404 No reservations found for date
 * @apiError 500 Internal server error
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
 * @api {post} /reservations/list Get reservation list by IDs
 * @apiName GetReservationList
 * @apiGroup Reservation
 * @apiDescription Takes an array of reservation IDs and returns corresponding reservation objects
 *
 * @apiParam {Array} reservations Array of reservation IDs
 *
 * @apiSuccess {Array} reservations Array of reservation objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
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

export {
  getReservations,
  getReservationById,
  postReservation,
  putReservation,
  deleteReservation,
  getReservationByUserId,
  getReservationByOrder,
  getReservationByDate,
  getReservationList,
};
