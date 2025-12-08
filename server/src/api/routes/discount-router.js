//node imports
import express from 'express';

//other imports
import {
    getDiscounts,
    getDiscountById,
    postDiscount,
    putDiscount,
    deleteDiscount,
    getDiscountList
} from '../controllers/discount-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";


const discountRouter = express.Router();

//endpoint http://hostname:port/api/discounts
discountRouter.get('/', getDiscounts)
    .post('/', authenticateToken, userIsAdmin, postDiscount);

//endpoint http://hostname:port/api/discounts/:id
discountRouter.route('/:id')
    .get(formatIdToNumber, getDiscountById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, putDiscount)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteDiscount);

//Get a specified list
//endpoint http://hostname:port/api/discounts/list/id
discountRouter.route('/list/id')
    .get(authenticateToken, getDiscountList);

export default discountRouter;




