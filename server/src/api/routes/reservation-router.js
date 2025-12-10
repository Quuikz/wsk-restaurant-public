//node imports
import express from "express";

//other imports
import {
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
} from "../controllers/reservation-controller.js";

//middlewares
import authenticateToken from "../../middlewares/authenticateToken.js";
import userIsAdmin from "../../middlewares/userIsAdmin.js";
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatParamTypes from "../../middlewares/formatParamTypes.js";
import filterIfPurchase from "../../middlewares/filterIfPurchase.js";

const reservationRouter = express.Router();

//endpoint http://hostname:port/api/reservations
reservationRouter
  .get("/", authenticateToken, userIsAdmin, getReservations)
  .post(
    "/",
    authenticateToken,
    filterIfPurchase,
    formatBodyTypes,
    postReservation
  ); //TODO: is posting reservations without order or login allowed?

//endpoint http://hostname:port/api/reservations/:id
reservationRouter
  .route("/:id")
  .get(authenticateToken, formatIdToNumber, getReservationById) //TODO: user should be allowed to access only their own reservations
  .put(authenticateToken, formatIdToNumber, formatBodyTypes, putReservation) //TODO: user should be allowed to access only their own reservations
  .delete(authenticateToken, formatIdToNumber, deleteReservation); //TODO: user should be allowed to access only their own reservations

//endpoint http://hostname:port/api/reservations/user/:id
reservationRouter.get(
  "/user/:id",
  authenticateToken,
  filterByUserIdOrAdmin,
  formatIdToNumber,
  getReservationByUserId
); //TODO: user should be allowed to access only their own reservations

//endpoint http://hostname:port/api/reservations/order/:id
reservationRouter.get(
  "/order/:id",
  authenticateToken,
  userIsAdmin,
  formatIdToNumber,
  getReservationByOrder
);

//endpoint http://hostname:port/api/reservations/date/:date
reservationRouter.get(
  "/date/:date",
  authenticateToken,
  userIsAdmin,
  formatParamTypes,
  getReservationByDate
);

//number of reservations for given datetime
//endpoint http://hostname:port/api/reservations/count/:date
reservationRouter.get(
  "/count/:date",
  formatParamTypes,
  getReservationCountByDate
);

//Get a specified list
//endpoint http://hostname:port/api/reservations/list/id
reservationRouter.route("/list/id").post(authenticateToken, getReservationList);

export default reservationRouter;
