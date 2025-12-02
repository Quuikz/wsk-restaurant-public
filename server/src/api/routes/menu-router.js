'use strict';

//node imports
import express from 'express';

//other imports
import {
    getMenus,
    getMenuById,
    postMenu,
    putMenu,
    deleteMenu,
    getMenusByLocation,
    getMenusByDate
} from '../controllers/menu-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';


const menuRouter = express.Router();


//endpoint http://hostname:port/api/menus
menuRouter.get('/', getMenus)
    .post('/', authenticateToken, userIsAdmin, postMenu);

//endpoint http://hostname:port/api/menus/:id
menuRouter.route('/:id')
    .get(getMenuById)
    .put(authenticateToken, userIsAdmin, putMenu)
    .delete(authenticateToken, userIsAdmin, deleteMenu);

//endpoint http://hostname:port/api/menus/date/:date
menuRouter.route('/date/:date').get(getMenusByDate)

//endpoint http://hostname:port/api/menus/location/:id
menuRouter.route('/location/:id').get(getMenusByLocation)


export default menuRouter;




