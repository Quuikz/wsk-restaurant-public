//node imports
import express from 'express';

//other imports
import {
    getDiscounts,
    getDiscountById,
    postDiscount,
    putDiscount,
    deleteDiscount,
    getDiscountByMeal
} from '../controllers/discount-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';


const discountRouter = express.Router();

//endpoint http://hostname:port/api/discounts
discountRouter.get('/', getDiscounts)
    .post('/', authenticateToken, userIsAdmin, postDiscount);

//endpoint http://hostname:port/api/discounts/:id
discountRouter.route('/:id')
    .get(getDiscountById)
    .put(authenticateToken, userIsAdmin, putDiscount)
    .delete(authenticateToken, userIsAdmin, deleteDiscount);

//endpoint http://hostname:port/api/discounts/bymeal/:id
discountRouter.route('/bymeal/:id')
    .get(authenticateToken, getDiscountByMeal);

export default discountRouter;




