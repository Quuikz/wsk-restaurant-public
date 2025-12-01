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
    .post('/', authenticateToken, postReservation); //TODO: is posting reservations without order or login allowed?

//endpoint http://hostname:port/api/reservations/:id
reservationRouter.route('/:id')
    .get(authenticateToken, getReservationById) //TODO: user should be allowed to access only their own reservations
    .put(authenticateToken, putReservation) //TODO: user should be allowed to access only their own reservations
    .delete(authenticateToken, deleteReservation); //TODO: user should be allowed to access only their own reservations

//endpoint http://hostname:port/api/reservations/user/:id
reservationRouter.get('/user',authenticateToken, filterByUserIdOrAdmin, getReservationByUserId) //TODO: user should be allowed to access only their own reservations

//endpoint http://hostname:port/api/reservations/location/:id
reservationRouter.get('/location',authenticateToken, userIsAdmin, getReservationByLocation)


export default reservationRouter;




