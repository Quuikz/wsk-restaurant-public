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
    getGiftCardValidation
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
giftCardRouter.route('/validate/password')
    .get(authenticateToken, formatParamTypes, formatBodyTypes, getGiftCardValidation)



export default giftCardRouter;