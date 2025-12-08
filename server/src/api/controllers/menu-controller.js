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
 * @apiSuccess {Array} menus Array of menu objects
 *
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
 * @apiParam {Number} id Menu ID
 *
 * @apiSuccess {Object} menu Menu object
 *
 * @apiError 404 Menu not found
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
 * @apiParam {Object} body Menu object
 *
 * @apiSuccess {Object} menu Created menu object
 *
 * @apiError 404 Failed to create menu
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
 * @apiParam {Number} id Menu ID
 * @apiParam {Object} body Updated menu object
 *
 * @apiSuccess {Object} menu Updated menu object
 *
 * @apiError 404 Menu not found
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
 * @apiParam {Number} id Menu ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 Menu not found
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
 * @apiParam {String} date Date in YYYY-MM-DD format
 *
 * @apiSuccess {Array} menus Array of menus for the date
 *
 * @apiError 404 No menus found for date
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
 * @apiParam {String} week Week identifier (format varies)
 *
 * @apiSuccess {Array} menus Array of menus for the week
 *
 * @apiError 404 No menus found for week
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
 * @api {post} /menus/list Get menu list by IDs
 * @apiName GetMenuList
 * @apiGroup Menu
 * @apiDescription Takes an array of menu IDs and returns corresponding menu objects
 *
 * @apiParam {Array} menus Array of menu IDs
 *
 * @apiSuccess {Array} menus Array of menu objects
 *
 * @apiError 404 No ID array in request
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
