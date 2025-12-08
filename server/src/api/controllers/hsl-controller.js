"use strict";

import { getHslData } from "../models/hsl-model.js";

/**
 * @api {post} /hsl Get HSL data
 * @apiName GetHsl
 * @apiGroup HSL
 * @apiDescription Retrieves HSL (Helsinki Region Transport) data based on query parameters
 *
 * @apiQuery {String} query HSL query parameter (e.g., search term)
 * @apiParam {Object} body Request body with HSL filter options
 *
 * @apiSuccess {Object} data HSL data object
 *
 * @apiError 500 Internal server error
 */
const getHsl = async (req, res) => {
  console.log("getHsl in hsl-controller");

  const graphqlQuery = req.body.query || req.body;

  try {
    const result = await getHslData(graphqlQuery);

    if (result) {
      console.log("return HSL data in hsl-controller");
      res.json(result);
    } else {
      console.log("no HSL data found");
      res.status(200).send("no HSL data found");
    }
  } catch (error) {
    console.log("error in getHsl in hsl-controller");
    console.log(error);
    res.sendStatus(500);
  }
};

export { getHsl };
