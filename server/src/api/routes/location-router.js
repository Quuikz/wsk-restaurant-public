//node imports
import express from 'express';

//other imports
import {
    getLocations,
    getLocationById,
    postLocation,
    putLocation,
    deleteLocation,
} from '../controllers/location-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";


const locationRouter = express.Router();

//endpoint http://hostname:port/api/locations
locationRouter.get('/', getLocations)
    .post('/', authenticateToken, userIsAdmin, postLocation);

//endpoint http://hostname:port/api/locations/:id
locationRouter.route('/:id')
    .get(formatIdToNumber, getLocationById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, putLocation)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteLocation);

export default locationRouter;




