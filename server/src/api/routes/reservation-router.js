//node imports
import express from 'express';

//other imports
import {
    getReservations,
    getReservationById,
    postReservation,
    putReservation,
    deleteReservation,
    getReservationByUserId,
    getReservationByLocation,
    getReservationByDate
} from '../controllers/reservation-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";


const reservationRouter = express.Router();

//endpoint http://hostname:port/api/reservations
reservationRouter.get('/', authenticateToken, userIsAdmin, getReservations)
    .post('/', authenticateToken, userIsAdmin, postReservation);

//endpoint http://hostname:port/api/reservations/:id
reservationRouter.route('/:id')
    .get(authenticateToken,  getReservationById)
    .put(authenticateToken,  putReservation)
    .delete(authenticateToken, deleteReservation);

//endpoint http://hostname:port/api/reservations/user/:id
reservationRouter.route('/:id')
    .get(authenticateToken, filterByUserIdOrAdmin, getReservationByUserId)

//endpoint http://hostname:port/api/reservations/date/:location
reservationRouter.route('/:id')
    .get(authenticateToken, userIsAdmin, getReservationByLocation)

//endpoint http://hostname:port/api/reservations/date/:date
reservationRouter.route('/:id')
    .get(authenticateToken, userIsAdmin, getReservationByDate)


export default reservationRouter;




