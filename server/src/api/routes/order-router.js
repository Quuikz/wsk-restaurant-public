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
    getOrdersByDate,
    getOrderList
} from '../controllers/order-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";
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
orderRouter.get('/user/:id',authenticateToken, filterByUserIdOrAdmin, getOrdersByUserId)

//endpoint http://hostname:port/api/orders/date/:date
orderRouter.get('/date/:date',authenticateToken, userIsAdmin, getOrdersByDate)

//Get a specified list
//endpoint http://hostname:port/api/orders/list/id
orderRouter.route('/list/id')
    .post(authenticateToken, getOrderList);


export default orderRouter;




