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
    getMenuByDate
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
menuRouter.get('/date/:date', getMenuByDate)

//endpoint http://hostname:port/api/menus/location/:id
menuRouter.get('/location', getMenusByLocation)


export default menuRouter;




