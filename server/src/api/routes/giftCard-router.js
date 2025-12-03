'use strict';

import express from 'express';

//other imports
import {
    getGiftCards,
    getGiftCardById,
    postGiftCard,
    putGiftCard,
    deleteGiftCard,
    getGiftCardsByUserId,
    getGiftCardValidation,
    redeemGiftCard
} from '../controllers/giftCard-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import userIsAdmin from '../../middlewares/userIsAdmin.js';
import formatIdToNumber from "../../middlewares/formatIdToNumber.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";
import filterByUserIdOrAdmin from "../../middlewares/filterByUserIdOrAdmin.js";
import formatParamTypes from "../../middlewares/formatParamTypes.js";


const giftCardRouter = express.Router();


//endpoint http://hostname:port/api/giftcards
giftCardRouter.get('/', authenticateToken, userIsAdmin, getGiftCards);
giftCardRouter.post('/', authenticateToken, userIsAdmin, formatBodyTypes, postGiftCard);
//giftcards shouldn't be posted, instead they are generated when orders are posted...

//endpoint http://hostname:port/api/giftcards/:id
giftCardRouter.route('/:id')
    .get(authenticateToken, userIsAdmin, formatIdToNumber, getGiftCardById)
    .put(authenticateToken, userIsAdmin, formatIdToNumber, formatBodyTypes, putGiftCard)
    .delete(authenticateToken, userIsAdmin, formatIdToNumber, deleteGiftCard);

//endpoint http://hostname:port/api/giftcards/user/:id
giftCardRouter.route('/user/:id')
    .get(authenticateToken, filterByUserIdOrAdmin, formatIdToNumber, getGiftCardsByUserId);

//used to validate a giftcard
//endpoint http://hostname:port/api/giftcards/validate
giftCardRouter.get('/validate/:password',authenticateToken, formatParamTypes, formatBodyTypes, getGiftCardValidation)

//used to redeem giftcard
//endpoint http://hostname:port/api/giftcards/redeem
giftCardRouter.put('/redeem/:password',authenticateToken, formatParamTypes, formatBodyTypes, redeemGiftCard);


export default giftCardRouter;