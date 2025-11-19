//node imports
import express from 'express';

//other imports
import {
    getOrders,
    getOrderById,
    postOrder,
    putOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByLocation
} from '../controllers/order-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';


const orderRouter = express.Router();


//endpoint http://hostname:port/api/orders
orderRouter.get('/', authenticateToken, userIsAdmin, getOrders)
    .post('/', postOrder);

//endpoint http://hostname:port/api/orders/:id
orderRouter.route('/:id')
    .get(authenticateToken, getOrderById)
    .put(authenticateToken, putOrder)
    .delete(authenticateToken, deleteOrder);

//endpoint http://hostname:port/api/orders/user/:id
orderRouter.get('/user',authenticateToken, getOrderByUserId)

//endpoint http://hostname:port/api/orders/location/:id
orderRouter.get('/location',authenticateToken, getOrderByLocation)


export default orderRouter;




