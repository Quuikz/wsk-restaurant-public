//node imports
import express from 'express';

//other imports
import {
    getOrders,
    getOrderById,
    postOrder,
    putOrder,
    deleteOrder,
    getOrdersByUserId,
    getOrdersByLocation, getOrdersByDate
} from '../controllers/order-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";


const orderRouter = express.Router();


//endpoint http://hostname:port/api/orders
orderRouter.get('/', authenticateToken, userIsAdmin, getOrders)
    .post('/', formatBodyTypes, postOrder);

//endpoint http://hostname:port/api/orders/:id
orderRouter.route('/:id')
    .get(authenticateToken, formatIdToNumber, getOrderById)
    .put(authenticateToken, formatIdToNumber, formatBodyTypes, putOrder)
    .delete(authenticateToken, formatIdToNumber, deleteOrder);

//endpoint http://hostname:port/api/orders/user/:id
orderRouter.get('/user/:id',authenticateToken, getOrdersByUserId)

//endpoint http://hostname:port/api/orders/location/:id
orderRouter.get('/location/:id',authenticateToken, userIsAdmin, getOrdersByLocation)

//endpoint http://hostname:port/api/orders/date/:date
orderRouter.get('/date/:date',authenticateToken, userIsAdmin, getOrdersByDate)




export default orderRouter;




