"use strict";

import {
  listAllDiscounts,
  findDiscountById,
  addDiscount,
  modifyDiscount,
  removeDiscount,
} from "../models/discount-model.js";

/**
 * @api {get} /discounts Get all discounts
 * @apiName GetDiscounts
 * @apiGroup Discount
 *
 * @apiSuccess {Array} discounts Array of discount objects
 * @apiSuccess {Number} discounts.id Discount ID
 * @apiSuccess {String} discounts.code Discount code
 *
 * @apiError 500 Internal server error
 */
const getDiscounts = async (req, res) => {
  try {
    console.log("getDiscounts in discount-controller");
    const user = res.locals.user;
    console.log("user authenticated:" + res.locals.user);

    const result = await listAllDiscounts();
    if (result) {
      return res.json(result);
    } else {
      console.log("no discounts found");
      return res.status(200).send("no discounts found");
    }
  } catch (error) {
    console.log("error in getDiscounts in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /discounts/:id Get discount by ID
 * @apiName GetDiscountById
 * @apiGroup Discount
 *
 * @apiParam {Number} id Discount ID
 *
 * @apiSuccess {Object} discount Discount object
 * @apiSuccess {Number} discount.id Discount ID
 * @apiSuccess {String} discount.code Discount code
 *
 * @apiError 404 Discount not found
 * @apiError 500 Internal server error
 */
const getDiscountById = async (req, res) => {
  try {
    console.log("getDiscountById in discount-controller");
    console.log(req.params.id);
    const discount = await findDiscountById(req.params.id);
    if (discount) {
      console.log("return discount" + req.params.id);
      return res.json(discount);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getDiscountById in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /discounts Create new discount
 * @apiName PostDiscount
 * @apiGroup Discount
 *
 * @apiBody {Number} discount Multiplier for discount (e.g. 0.9 for 10% off)
 * @apiBody {String} discount_code Discount code used at checkout
 * @apiBody {String} date_start Start date in YYYY-MM-DD format
 * @apiBody {String} date_end End date in YYYY-MM-DD format
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} discount Created discount object
 * @apiSuccess {Number} discount.id Discount ID
 *
 * @apiError 404 Failed to create discount
 * @apiError 500 Internal server error
 */
const postDiscount = async (req, res) => {
  try {
    console.log("postDiscount in discount-controller");
    console.log(req.body);

    const result = await addDiscount(req.body);
    if (result) {
      console.log("added discount: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postDiscount in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /discounts/:id Update discount
 * @apiName PutDiscount
 * @apiGroup Discount
 *
 * @apiParam {Number} id Discount ID
 * @apiBody {Number} [discount] Multiplier for discount (e.g. 0.9 for 10% off)
 * @apiBody {String} [discount_code] Discount code used at checkout
 * @apiBody {String} [date_start] Start date in YYYY-MM-DD format
 * @apiBody {String} [date_end] End date in YYYY-MM-DD format
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} discount Updated discount object
 *
 * @apiError 404 Discount not found
 * @apiError 500 Internal server error
 */
const putDiscount = async (req, res) => {
  try {
    console.log("putDiscount in discount-controller");
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyDiscount(req.body, req.params.id);
    if (result) {
      console.log("return discount: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putDiscount in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /discounts/:id Delete discount
 * @apiName DeleteDiscount
 * @apiGroup Discount
 *
 * @apiParam {Number} id Discount ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Discount not found
 * @apiError 500 Internal server error
 */
const deleteDiscount = async (req, res) => {
  try {
    console.log("deleteDiscount in discount-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeDiscount(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteDiscount: discount not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteDiscount in discount-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /discounts/list Get discount list by IDs
 * @apiName GetDiscountList
 * @apiGroup Discount
 * @apiDescription Takes an array of discount IDs and returns corresponding discount objects
 *
 * @apiBody {Number[]} discounts Array of discount IDs
 *
 * @apiSuccess {Array} discounts Array of discount objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
 */
const getDiscountList = async (req, res) => {
  try {
    console.log("getDiscountList in discount-controller");

    if (req.body.discounts) {
      const discountArray = await Promise.all(
        req.body.discounts.map((id) => findDiscountById(id))
      );
      console.log("discounts found: ", discountArray);
      res.json(discountArray);
    } else {
      console.log("no id array in getDiscountList in discount-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getDiscountList in discount-controller");
    res.sendStatus(500);
  }
};

export {
  getDiscounts,
  getDiscountById,
  postDiscount,
  putDiscount,
  deleteDiscount,
  getDiscountList,
};
