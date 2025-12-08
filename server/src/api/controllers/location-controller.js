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
 * @apiSuccess {Array} locations Array of location objects
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
 * @apiParam {Number} id Location ID
 *
 * @apiSuccess {Object} location Location object
 *
 * @apiError 404 Location not found
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
 * @apiParam {Object} body Location object
 *
 * @apiSuccess {Object} location Created location object
 *
 * @apiError 404 Failed to create location
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
 * @apiParam {Number} id Location ID
 * @apiParam {Object} body Updated location object
 *
 * @apiSuccess {Object} location Updated location object
 *
 * @apiError 404 Location not found
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
 * @apiParam {Number} id Location ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Location not found
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
