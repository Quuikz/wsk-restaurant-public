"use strict";

import {
  listAllGiftCards,
  findGiftCardById,
  addGiftCard,
  modifyGiftCard,
  removeGiftCard,
  findGiftCardsByUserId,
  findGiftCardByPassword,
} from "../models/giftCard-model.js";
import { findOrdersByUserId } from "../models/order-model.js";

/**
 * @api {get} /giftcards Get all gift cards
 * @apiName GetGiftCards
 * @apiGroup GiftCard
 *
 * @apiSuccess {Array} giftCards Array of gift card objects
 *
 * @apiError 500 Internal server error
 */
const getGiftCards = async (req, res) => {
  try {
    console.log("getGiftCards in giftCard-controller");

    const result = await listAllGiftCards();
    if (result) {
      return res.json(result);
    } else {
      console.log("no giftCards found");
      return res.status(200).send("no giftCards found");
    }
  } catch (error) {
    console.log("error in getGiftCards in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /giftcards/:id Get gift card by ID
 * @apiName GetGiftCardById
 * @apiGroup GiftCard
 *
 * @apiParam {Number} id Gift card ID
 *
 * @apiSuccess {Object} giftCard Gift card object
 *
 * @apiError 404 Gift card not found
 * @apiError 500 Internal server error
 */
const getGiftCardById = async (req, res) => {
  try {
    console.log("getGiftCardById in giftCard-controller");
    console.log(req.params.id);
    const giftCard = await findGiftCardById(req.params.id);
    if (giftCard) {
      console.log("return giftCard" + req.params.id);
      return res.json(giftCard);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getGiftCardById in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /giftcards Create new gift card
 * @apiName PostGiftCard
 * @apiGroup GiftCard
 *
 * @apiParam {Object} body Gift card object
 *
 * @apiSuccess {Object} giftCard Created gift card object
 *
 * @apiError 404 Failed to create gift card
 * @apiError 500 Internal server error
 */
const postGiftCard = async (req, res) => {
  try {
    console.log("postGiftCard in giftCard-controller");
    console.log(req.body);

    const result = await addGiftCard(req.body);
    if (result) {
      console.log("added giftCard: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postGiftCard in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /giftcards/:id Update gift card
 * @apiName PutGiftCard
 * @apiGroup GiftCard
 *
 * @apiParam {Number} id Gift card ID
 * @apiParam {Object} body Updated gift card object
 *
 * @apiSuccess {Object} giftCard Updated gift card object
 *
 * @apiError 404 Gift card not found
 * @apiError 500 Internal server error
 */
const putGiftCard = async (req, res) => {
  try {
    console.log("putGiftCard in giftCard-controller");
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyGiftCard(req.body, req.params.id);
    if (result) {
      console.log("return giftCard: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putGiftCard in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /giftcards/:id Delete gift card
 * @apiName DeleteGiftCard
 * @apiGroup GiftCard
 *
 * @apiParam {Number} id Gift card ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Gift card not found
 * @apiError 500 Internal server error
 */
const deleteGiftCard = async (req, res) => {
  try {
    console.log("deleteGiftCard in giftCard-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const success = await removeGiftCard(req.params.id);
    if (success) {
      console.log("giftcard removed:", req.params.id);
      return res.status(200).send("giftcard removed");
    } else {
      console.log("deleteGiftCard: giftCard not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteGiftCard in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /giftcards/user/:id Get gift cards by user ID
 * @apiName GetGiftCardsByUserId
 * @apiGroup GiftCard
 * @apiDescription Returns array of gift cards for a specific user (without password hashes)
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Array} giftCards Array of gift card objects
 *
 * @apiError 404 No gift cards found for user
 * @apiError 500 Internal server error
 */
const getGiftCardsByUserId = async (req, res) => {
  try {
    console.log("getGiftCardsByUserId in order-controller");
    console.log(req.params.id);

    const giftCardArray = await findGiftCardsByUserId(req.params.id);
    if (giftCardArray) {
      console.log(
        "number of giftcards for user ",
        req.params.id,
        giftCardArray.length
      );

      //remove hashed passwords from giftcards
      const giftCardArrayWithoutPassword = [];
      for (const giftCard of giftCardArray) {
        const giftCardWithoutPassword = {
          id: giftCard.id,
          value: giftCard.value,
          expiration_date: giftCard.expiration_date,
          redeemed: giftCard.redeemed,
          order: giftCard.order,
          user: giftCard.user,
        };
        giftCardArrayWithoutPassword.push(giftCardWithoutPassword);
      }
      //return the array
      return res.json(giftCardArrayWithoutPassword);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getGiftCardsByUserId in redeemGiftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /giftcards/validate Validate gift card
 * @apiName GetGiftCardValidation
 * @apiGroup GiftCard
 * @apiDescription Validates a gift card by password and checks if it has been redeemed
 *
 * @apiParam {String} password Gift card password/code
 *
 * @apiSuccess {Object} giftCard Gift card object (without password)
 *
 * @apiError 404 No gift card found
 * @apiError 500 Internal server error
 */
const getGiftCardValidation = async (req, res) => {
  try {
    //this should check if the giftcard password is valid and the valid giftcard has not been redeemed.
    console.log("validateGiftCard in giftCard-controller");
    console.log("giftcard password:", req.body.password);

    const giftCard = await findGiftCardByPassword(req.body.password);
    if (giftCard) {
      console.log("giftcard found");

      const giftCardWithoutPassword = {
        id: giftCard.id,
        value: giftCard.value,
        expiration_date: giftCard.expiration_date,
        order: giftCard.order,
        user: giftCard.user,
      };

      return res.json(giftCardWithoutPassword);
    } else {
      console.log("no giftcard found in getGiftCardValidation");
      return res.status(404).send("No giftcard found.");
    }
  } catch (error) {
    console.log("error in getGiftCardValidation in giftCard-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /giftcards/list Get gift card list by IDs
 * @apiName GetGiftCardList
 * @apiGroup GiftCard
 * @apiDescription Takes an array of gift card IDs and returns corresponding gift card objects
 *
 * @apiParam {Array} giftCards Array of gift card IDs
 *
 * @apiSuccess {Array} giftCards Array of gift card objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
 */
const getGiftCardList = async (req, res) => {
  try {
    console.log("getGiftCardList in giftCard-controller");

    if (req.body.giftCards) {
      const giftCardArray = await Promise.all(
        req.body.giftCards.map((id) => findGiftCardById(id))
      );
      console.log("giftcards found: ", giftCardArray);
      res.json(giftCardArray);
    } else {
      console.log("no id array in getGiftCardList in giftCard-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getGiftCardList in giftCard-controller");
    res.sendStatus(500);
  }
};

export {
  getGiftCards,
  getGiftCardById,
  postGiftCard,
  putGiftCard,
  deleteGiftCard,
  getGiftCardsByUserId,
  getGiftCardValidation,
  getGiftCardList,
};
