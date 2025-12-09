"use strict";

// TODO: user passwords must not be returned with responses!!!

import bcrypt from "bcrypt";

import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
  findUserByUsername,
} from "../models/user-model.js";

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Array} users Array of user objects
 *
 * @apiError 500 Internal server error
 */
const getUsers = async (req, res) => {
  try {
    console.log("getUsers in user-controller");
    const result = await listAllUsers();
    return res.json(result);
  } catch (error) {
    console.log("error in listAllUsers");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /users/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup User
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Object} user User object (without password)
 *
 * @apiError 404 User not found
 * @apiError 500 Internal server error
 */
const getUserById = async (req, res) => {
  try {
    console.log("getUserById in user-controller");
    console.log(req.params.id);
    const user = await findUserById(req.params.id);
    if (user) {
      console.log("return user: ", user);
      return res.json(user);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getUserById in user-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /users Create new user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiBody {String} username User's username
 * @apiBody {String} password User's password (will be hashed)
 * @apiBody {String} name User's full name
 * @apiBody {String} email User's email
 *
 * @apiSuccess {Object} user Created user object (without password)
 *
 * @apiError 404 Failed to create user
 * @apiError 500 Internal server error
 */
const postUser = async (req, res) => {
  try {
    console.log("postUser in user-controller");
    console.log(req.body);

    //Bcrypt password hash
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const user = await addUser(req.body);
    if (user) {
      console.log("added user: ", user);

      const userWithNoPassword = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        image: user.image,
        message: user.message,
      };

      return res.json(userWithNoPassword);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {put} /users/:id Update user
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id User ID
 * @apiBody {String} [username] User's username
 * @apiBody {String} [password] User's password (will be hashed)
 * @apiBody {String} [role] User role
 * @apiBody {String} [name] User's full name
 * @apiBody {String} [email] User's email
 * @apiBody {String} [image] User image filename
 * @apiBody {String} [message] Optional description
 *
 * @apiSuccess {Object} user Updated user object (without password)
 *
 * @apiError 404 User not found
 * @apiError 500 Internal server error
 */
const putUser = async (req, res) => {
  try {
    console.log("putUser in user-controller");
    console.log("user authorized:" + res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    const user = await modifyUser(req.body, req.params.id);
    if (user) {
      console.log("return user: ", user);
      const userWithNoPassword = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        image: user.image,
        message: user.message,
      };
      return res.json(userWithNoPassword);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in putUser in user-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError 404 User not found
 * @apiError 500 Internal server error
 */
const deleteUser = async (req, res) => {
  try {
    console.log("deleteUser in user-controller");
    console.log(req.params.id);
    console.log(res.locals.user);

    const message = await removeUser(req.params.id, res.locals.user);
    if (message) {
      console.log(message);
      return res.status(200).send(message);
    } else {
      console.log("deleteUser: user not found");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in deleteUser in user-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {get} /users/username/:username Get user by username
 * @apiName GetUserByUsername
 * @apiGroup User
 *
 * @apiParam {String} username User's username
 *
 * @apiSuccess {Object} user User object
 *
 * @apiError 404 User not found
 * @apiError 500 Internal server error
 */
const getUserByUsername = async (req, res) => {
  try {
    console.log("getUserByUsername in user-controller");
    console.log("username: ", req.params.username);

    const user = await findUserByUsername(req.params.username);
    if (user) {
      console.log("return user: ", user);
      return res.json(user);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log("error in getUserByUsername in user-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

/**
 * @api {post} /users/list Get user list by IDs
 * @apiName GetUserList
 * @apiGroup User
 * @apiDescription Takes an array of user IDs and returns corresponding user objects
 *
 * @apiBody {Number[]} users Array of user IDs
 *
 * @apiSuccess {Array} users Array of user objects
 *
 * @apiError 404 No ID array in request
 * @apiError 500 Internal server error
 */
const getUserList = async (req, res) => {
  try {
    console.log("getUserList in user-controller");

    if (req.body.users) {
      const userArray = await Promise.all(
        req.body.users.map((id) => findUserById(id))
      );
      console.log("users found: ", userArray);
      res.json(userArray);
    } else {
      console.log("no id array in getUserList in user-controller");
      res.status(404).send("No id array found in request.");
    }
  } catch (error) {
    console.log("error in getUserList in user-controller");
    res.sendStatus(500);
  }
};

/**
 * @api {get} /users/exists/:username is Username Taken
 * @apiName isUsernameTaken
 * @apiGroup User
 *
 * @apiParam {String} username User username
 *
 * @apiSuccess {boolean} boolean if username exists
 *
 * @apiError 404 User not found
 * @apiError 500 Internal server error
 */
const isUsernameTaken = async (req, res) => {
  try {
    console.log("isUsernameTaken in user-controller");
    console.log(req.params.username);
    const user = await findUserByUsername(req.params.username);
    if (user) {
      console.log("user found with name: ", req.params.username, user);
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    console.log("error in isUsernameTaken in user-controller");
    console.log(error);
    return res.sendStatus(500);
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getUserByUsername,
  getUserList,
  isUsernameTaken,
};
