"use strict";

import bcrypt from "bcrypt";

import {
  listAllMenus,
  findMenuById,
  addMenu,
  modifyMenu,
  removeMenu,
  findMenusByDate,
  findMenusByWeek,
} from "../models/menu-model.js";

/**
 * @api {get} /menus Get all menus
 * @apiName GetMenus
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menus Array of menu objects (returns 200 and JSON array)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [ {"id":1,"date":"2025-12-06","meals":[1,2,3]}, {...} ]
 *
 * @apiNote When no menus exist the implementation returns an empty array.
 * @apiError 500 Internal server error
 */
const getMenus = async (req, res) => {
  try {
    console.log("getMenus in menu-controller");
    const user = res.locals.user;
    console.log("user authenticated:" + res.locals.user);

    const result = await listAllMenus();
    return res.json(result);
  } catch (error) {
    console.log("error in listAllUsers");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /menus/:id Get menu by ID
 * @apiName GetMenuById
 * @apiGroup Menu
 *
 * @apiParam {Number} id Menu ID (path parameter)
 *
 * @apiSuccess {Object} menu Menu object (returns 200 and the menu JSON)
 *
 * @apiError 404 Menu not found (returns 404 when id does not exist)
 * @apiError 500 Internal server error
 */
const getMenuById = async (req, res) => {
  try {
    console.log("getMenuById in menu-controller");
    console.log(req.params.id);
    const menu = await findMenuById(req.params.id);
    if (menu) {
      console.log("return menu", req.params.id);
      return res.json(menu);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getMenuById in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /menus Create new menu
 * @apiName PostMenu
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiBody {String} date Menu date (YYYY-MM-DD)
 * @apiBody {Number} week Week number
 * @apiBody {Number} special_meal ID of special meal
 * @apiBody {Number[]} meals Array of meal IDs
 * @apiBody {String} [image] Optional menu image filename
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} menu Created menu object (returns 200 and the created object)
 *
 * @apiError 400 Bad request (e.g., invalid body)
 * @apiError 404 Failed to create menu (database insert did not affect rows)
 * @apiError 500 Internal server error
 */
const postMenu = async (req, res) => {
  try {
    console.log("postMenu in menu-controller");
    console.log(req.body);

    const result = await addMenu(req.body);
    if (result) {
      console.log("added menu: ", result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in postMenu in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /menus/:id Update menu
 * @apiName PutMenu
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiParam {Number} id Menu ID (path parameter)
 * @apiBody {String} [date] Menu date (YYYY-MM-DD)
 * @apiBody {Number} [week] Week number
 * @apiBody {Number} [special_meal] ID of special meal
 * @apiBody {Number[]} [meals] Array of meal IDs
 * @apiBody {String} [image] Optional menu image filename
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} menu Updated menu object (returns 200 and the updated object)
 *
 * @apiError 400 Bad request (e.g., invalid body)
 * @apiError 404 Menu not found (returns 404 when update didn't affect rows)
 * @apiError 500 Internal server error
 */
const putMenu = async (req, res) => {
  try {
    console.log("putMenu in menu-controller");
    console.log(req.body);
    console.log(req.params.id);

    const result = await modifyMenu(req.body, req.params.id);
    if (result) {
      console.log("return menu: ", result);
      return res.json(result);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putMenu in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /menus/:id Delete menu
 * @apiName DeleteMenu
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token (admin required)
 * @apiParam {Number} id Menu ID (path parameter)
 *
 * @apiSuccess {Boolean} success Returns `true` when the menu was deleted (HTTP 200)
 *
 * @apiError 404 Menu not found (returns 404 when id does not exist)
 * @apiError 500 Internal server error
 */
const deleteMenu = async (req, res) => {
  try {
    console.log("deleteMenu in menu-controller");
    console.log(req.params.id);
    console.log("user authenticated:" + res.locals.user);

    const message = await removeMenu(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteMenu: menu not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteMenu in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /menus/date/:date Get menus by date
 * @apiName GetMenusByDate
 * @apiGroup Menu
 *
 * @apiParam {String} date Date in YYYY-MM-DD format (path parameter)
 *
 * @apiSuccess {Object[]} menus Array of menus for the date (returns 200 and array; may be empty)
 *
 * @apiError 500 Internal server error
 */
const getMenusByDate = async (req, res) => {
  try {
    console.log("getMenuByDate in menu-controller");
    console.log(req.params.date);
    const menu = await findMenusByDate(req.params.date);
    if (menu) {
      console.log("return menus for date " + req.params.id);
      return res.json(menu);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getMenuByLocation in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /menus/week/:week Get menus by week
 * @apiName GetMenusByWeek
 * @apiGroup Menu
 * @apiDescription Returns array of menus for a specific week
 *
 * @apiParam {String|Number} week Week identifier (path parameter)
 *
 * @apiSuccess {Object[]} menus Array of menus for the week (returns 200 and array; may be empty)
 *
 * @apiError 500 Internal server error
 */
const getMenusByWeek = async (req, res) => {
  try {
    console.log("getMenuByWeek in menu-controller");
    console.log(req.params.date);
    const menu = await findMenusByWeek(req.params.week);
    if (menu) {
      console.log("return menus for date " + req.params.id);
      return res.json(menu);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getMenuByLocation in menu-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /menus/list/id Get menu list by IDs
 * @apiName GetMenuList
 * @apiGroup Menu
 * @apiDescription Takes an array of menu IDs and returns corresponding menu objects
 *
 * @apiHeader {String} Authorization Bearer token (required)
 * @apiBody {Number[]} menus Array of menu IDs (JSON body)
 *
 * @apiSuccess {Object[]} menus Array of menu objects (returns 200 and array)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [ {"id":1,"date":"...","meals":[1,2]}, null ]
 *
 * @apiNote When an id is not found the implementation returns `false`/`null` for that position.
 * @apiError 400 No ID array in request (controller currently returns 404 with message for missing `menus`)
 * @apiError 500 Internal server error
 */
const getMenuList = async (req, res) => {
  try {
    console.log("getMenuList in menu-controller");

    if (req.body.menus) {
      const menuArray = await Promise.all(
        req.body.menus.map((id) => findMenuById(id))
      );
      console.log("menus found: ", menuArray);
      res.json(menuArray);
    } else {
      console.log("no id array in getMenuList in menu-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getMenuList in menu-controller");
    res.sendStatus(500);
  }
};

export {
  getMenus,
  getMenuById,
  postMenu,
  putMenu,
  deleteMenu,
  getMenusByDate,
  getMenusByWeek,
  getMenuList,
};
