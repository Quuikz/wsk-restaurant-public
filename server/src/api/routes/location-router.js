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


const locationRouter = express.Router();

//endpoint http://hostname:port/api/locations
locationRouter.get('/', getLocations)
    .post('/', authenticateToken, userIsAdmin, postLocation);

//endpoint http://hostname:port/api/locations/:id
locationRouter.route('/:id')
    .get(getLocationById)
    .put(authenticateToken, userIsAdmin, putLocation)
    .delete(authenticateToken, userIsAdmin, deleteLocation);

export default locationRouter;




