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
 * @apiDescription Returns an array of all discount objects stored in the system.
 *
 * @apiSuccess {Object[]} discounts Array of discount objects
 * @apiSuccess {Number} discounts.id Discount ID
 * @apiSuccess {Number} discounts.discount Multiplier applied to original price (e.g. 0.9)
 * @apiSuccess {String} discounts.discount_code Code that triggers the discount at checkout
 * @apiSuccess {String} discounts.date_start Start date in YYYY-MM-DD format
 * @apiSuccess {String} discounts.date_end End date in YYYY-MM-DD format
 * @apiSuccess {String} discounts.message Optional description or note
 *
 * @apiError 400 Bad Request - Invalid request parameters
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
 * @apiDescription Returns a single discount object matching the provided ID.
 *
 * @apiParam (Path) {Number} id Discount ID
 *
 * @apiSuccess {Number} id Discount ID
 * @apiSuccess {Number} discount Multiplier applied to original price (e.g. 0.9)
 * @apiSuccess {String} discount_code Code that triggers the discount at checkout
 * @apiSuccess {String} date_start Start date in YYYY-MM-DD format
 * @apiSuccess {String} date_end End date in YYYY-MM-DD format
 * @apiSuccess {String} message Optional description or note
 *
 * @apiError 400 Bad Request - Invalid ID parameter
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
 * @apiDescription Create a new discount. Requires admin authorization.
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 *
 * @apiBody {Number} discount Multiplier for discount (e.g. 0.9 for 10% off)
 * @apiBody {String} discount_code Discount code used at checkout
 * @apiBody {String} date_start Start date in YYYY-MM-DD format
 * @apiBody {String} date_end End date in YYYY-MM-DD format
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess (201) {Number} id ID of created discount
 * @apiSuccess {Number} discount Multiplier applied to original price (e.g. 0.9)
 * @apiSuccess {String} discount_code Discount code
 * @apiSuccess {String} date_start Start date
 * @apiSuccess {String} date_end End date
 * @apiSuccess {String} message Description set on the discount
 *
 * @apiError 400 Bad Request - Invalid request body or missing required fields
 * @apiError 401 Unauthorized - Missing or invalid authentication token
 * @apiError 403 Forbidden - Insufficient permissions (admin required)
 * @apiError 500 Internal server error
 */
const postDiscount = async (req, res) => {
  try {
    console.log("postDiscount in discount-controller");
    console.log(req.body);

    const result = await addDiscount(req.body);
    if (result) {
      console.log("added discount:", result);
      return res.status(201).json(result);
    } else {
      return res.status(400).send("Failed to create discount");
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
 * @apiDescription Update fields of an existing discount. Requires admin authorization.
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam (Path) {Number} id Discount ID
 *
 * @apiBody {Number} [discount] Multiplier for discount (e.g. 0.9 for 10% off)
 * @apiBody {String} [discount_code] Discount code used at checkout
 * @apiBody {String} [date_start] Start date in YYYY-MM-DD format
 * @apiBody {String} [date_end] End date in YYYY-MM-DD format
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Number} id Discount ID
 * @apiSuccess {Number} discount Multiplier applied to original price
 * @apiSuccess {String} discount_code Discount code
 * @apiSuccess {String} date_start Start date
 * @apiSuccess {String} date_end End date
 * @apiSuccess {String} message Description or note
 *
 * @apiError 400 Bad Request - Invalid ID or request body
 * @apiError 401 Unauthorized - Missing or invalid authentication token
 * @apiError 403 Forbidden - Insufficient permissions (admin required)
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
 * @apiDescription Remove a discount by ID. Requires admin authorization.
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam (Path) {Number} id Discount ID
 *
 * @apiSuccess {Boolean} success true when delete succeeds
 * @apiSuccess {String} [message] Optional text message (may be implementation-dependent)
 *
 * @apiError 400 Bad Request - Invalid ID parameter
 * @apiError 401 Unauthorized - Missing or invalid authentication token
 * @apiError 403 Forbidden - Insufficient permissions (admin required)
 * @apiError 404 Discount not found
 * @apiError 500 Internal server error
 */
const deleteDiscount = async (req, res) => {
  try {
    console.log("deleteDiscount in discount-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const removed = await removeDiscount(req.params.id);
    if (removed) {
      console.log('discount removed');
      return res.status(200).json({ success: true, message: 'Discount removed' });
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
 * @api {post} /discounts/list/id Get discount list by IDs
 * @apiName GetDiscountList
 * @apiGroup Discount
 * @apiDescription Takes an array of discount IDs and returns corresponding discount objects.
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiBody {Number[]} discounts Array of discount IDs
 *
 * @apiSuccess {Object[]} discounts Array of discount objects
 * @apiSuccess {Number} discounts.id Discount ID
 * @apiSuccess {Number} discounts.discount Multiplier applied to original price
 * @apiSuccess {String} discounts.discount_code Discount code
 * @apiSuccess {String} discounts.date_start Start date
 * @apiSuccess {String} discounts.date_end End date
 * @apiSuccess {String} discounts.message Optional description
 *
 * @apiError 400 Bad Request - No ID array or invalid body in request
 * @apiError 401 Unauthorized - Missing or invalid authentication token
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



const validateDiscount = async (req, res) => {
  try {
    console.log("validateDiscount in discount-controller:", req.params.code);
    if (!req.params.code){
      res.json(false);
    }

    //all discounts
    const discountArray = await listAllDiscounts();

    if (!discountArray) {
      res.status(500).send("No discount array");
    }

    //get date .toISOString()
    const currentDate = new Date(Date.now());
    console.log('current date:', currentDate);

    //filter discounts
    const validDiscounts = discountArray.filter(
      (discount) => {
        const start = new Date(discount.date_start);
        const end = new Date(discount.date_end);
        console.log(start, end, currentDate, discount.discount_code );

/*      console.log((start <= currentDate))
        console.log((end >= currentDate))
        console.log((discount.discount_code == req.params.code))*/

        return (start < currentDate)
          && (end > currentDate)
          && (discount.discount_code == req.params.code);
      });

    if (validDiscounts.length > 0) {
      console.log('found valid discounts:',validDiscounts);
        return res.json(true);
    } else {
      console.log('no valid discounts found');
      return res.json(false);
    }


  } catch (error) {
    console.log(error);

  }
}






export {
  getDiscounts,
  getDiscountById,
  postDiscount,
  putDiscount,
  deleteDiscount,
  getDiscountList,
  validateDiscount
};
