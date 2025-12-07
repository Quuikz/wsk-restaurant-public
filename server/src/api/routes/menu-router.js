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
    getMenusByDate,
    getMenusByWeek
} from '../controllers/menu-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import formatParamTypes from "../../middlewares/formatParamTypes.js";


const menuRouter = express.Router();


//endpoint http://hostname:port/api/menus
menuRouter.get('/', getMenus)
    .post('/',
        authenticateToken,
        userIsAdmin,
        formatBodyTypes,
        postMenu);

//endpoint http://hostname:port/api/menus/:id
menuRouter.route('/:id')
    .get(formatIdToNumber, getMenuById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, formatBodyTypes, putMenu)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteMenu);

//endpoint http://hostname:port/api/menus/date/:date
menuRouter.route('/date/:date').get(getMenusByDate)

//endpoint http://hostname:port/api/menus/week/:week
menuRouter.route('/week/:week').get(formatParamTypes, getMenusByWeek)


export default menuRouter;




