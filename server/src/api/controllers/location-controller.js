"use strict";

import {
  listAllLocations,
  findLocationById,
  addLocation,
  modifyLocation,
  removeLocation,
} from "../models/location-model.js";
import { listAllDiscounts } from "../models/discount-model.js";

/**
 * @api {get} /locations Get all locations
 * @apiName GetLocations
 * @apiGroup Location
 *
 * @apiSuccess {Object[]} locations Array of location objects (returns 200 and JSON array)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [ {"id":1,"name":"..."}, {...} ]
 *
 * @apiDescription If no locations are found the endpoint currently returns 200 with a plain text
 * message `"no locations found"` instead of an empty array.
 *
 * @apiError 500 Internal server error
 */
const getLocations = async (req, res) => {
  try {
    console.log("getLocations in location-controller");
    const user = res.locals.user;
    console.log("user authenticated:" + res.locals.user);

    const result = await listAllLocations();
    if (result) {
      return res.json(result);
    } else {
      console.log("no locations found");
      return res.status(200).send("no locations found");
    }
  } catch (error) {
    console.log("error in getLocations in location-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /locations/:id Get location by ID
 * @apiName GetLocationById
 * @apiGroup Location
 *
 * @apiParam {Number} id Location ID (path parameter)
 *
 * @apiSuccess {Object} location Location object (returns 200 and the location JSON)
 *
 * @apiError 404 Location not found (returns 404 when id does not exist)
 * @apiError 500 Internal server error
 */
const getLocationById = async (req, res) => {
  try {
    console.log("getLocationById in location-controller");
    console.log(req.params.id);
    const location = await findLocationById(req.params.id);
    if (location) {
      console.log("return location" + req.params.id);
      return res.json(location);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getLocationById in location-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /locations Create new location
 * @apiName PostLocation
 * @apiGroup Location
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiBody {String} name Location name
 * @apiBody {String} address Street address
 * @apiBody {String} email Contact email
 * @apiBody {String} phone Contact phone
 * @apiBody {Number} table_count Table count
 * @apiBody {String} [message] Optional description (note: model currently overwrites message)
 *
 * @apiSuccess {Object} location Created location object (returns 200 and the created object)
 *
 * @apiError 404 Failed to create location (returns 404 when insertion failed)
 * @apiError 500 Internal server error
 */
const postLocation = async (req, res) => {
  try {
    console.log("postLocation in location-controller");
    console.log(req.body);

    const result = await addLocation(req.body);
    if (result) {
      console.log("added location: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postLocation in location-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /locations/:id Update location
 * @apiName PutLocation
 * @apiGroup Location
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiParam {Number} id Location ID (path parameter)
 * @apiBody {String} [name] Location name
 * @apiBody {String} [address] Street address
 * @apiBody {String} [email] Contact email
 * @apiBody {String} [phone] Contact phone
 * @apiBody {Number} [table_count] Table count
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} location Updated location object (returns 200 and the updated object)
 *
 * @apiError 404 Location not found (returns 404 when id does not exist)
 * @apiError 500 Internal server error
 */
const putLocation = async (req, res) => {
  try {
    console.log("putLocation in location-controller");
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyLocation(req.body, req.params.id);
    if (result) {
      console.log("return location: " + result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putLocation in location-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /locations/:id Delete location
 * @apiName DeleteLocation
 * @apiGroup Location
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiParam {Number} id Location ID (path parameter)
 *
 * @apiSuccess {Boolean} success Returns `true` when the location was deleted (HTTP 200)
 *
 * @apiError 404 Location not found (returns 404 when id does not exist)
 * @apiError 500 Internal server error
 */
const deleteLocation = async (req, res) => {
  try {
    console.log("deleteLocation in location-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeLocation(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteLocation: location not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteLocation in location-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

export {
  getLocations,
  getLocationById,
  postLocation,
  putLocation,
  deleteLocation,
};
