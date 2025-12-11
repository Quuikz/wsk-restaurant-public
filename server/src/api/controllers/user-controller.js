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
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiDescription Returns an array of all users. This endpoint is protected
 * and requires an admin token (router applies `authenticateToken` and
 * `userIsAdmin`). Note: controller currently returns full user objects; do
 * not rely on passwords being omitted unless the controller strips them.
 *
 * @apiSuccess (200) {Object[]} users Array of user objects
 *
 * @apiError (401) Unauthorized Invalid or missing token / not admin
 * @apiError (500) Internal server error
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
 * @apiHeader {String} Authorization Bearer token (user or admin)
 * @apiParam {Number} id User ID
 * @apiDescription Returns a user object for the specified id. The router
 * applies `authenticateToken` and `filterByUserIdOrAdmin` so only the user or
 * an admin may fetch this resource. The controller responds with the full
 * user record as returned by the model. Note: passwords should not be
 * exposed; the controller currently returns the model result unchanged.
 *
 * @apiSuccess (200) {Object} user User object
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (403) Forbidden User not allowed to access this resource
 * @apiError (404) User not found
 * @apiError (500) Internal server error
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
 * @apiBody {String} password User's password (will be hashed by controller)
 * @apiBody {String} name User's full name
 * @apiBody {String} email User's email
 * @apiDescription Creates a new user. The router applies image upload and
 * scaling middleware for file uploads, and `formatBodyTypes`. The controller
 * hashes the password before calling the model and returns a user object with
 * the password removed. On failure the controller returns 404 (legacy
 * behavior) or 500 on server error.
 *
 * @apiSuccess (200) {Object} user Created user object (password omitted)
 *
 * @apiError (400) Bad Request Invalid payload
 * @apiError (404) Failed to create user
 * @apiError (500) Internal server error
 */
const postUser = async (req, res) => {
  try {
    console.log("postUser in user-controller");
    console.log(req.body);

    //see if username is taken
    const checkUser = await findUserByUsername(req.body.username);
    if (checkUser) {
      console.log("existing user found with name: ", req.body.username);
      return res.status(400).send('username already taken');
    }

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
 * @apiHeader {String} Authorization Bearer token (user or admin)
 * @apiParam {Number} id User ID
 * @apiBody {String} [username] User's username
 * @apiBody {String} [password] User's password (will be hashed by controller)
 * @apiBody {String} [role] User role
 * @apiBody {String} [name] User's full name
 * @apiBody {String} [email] User's email
 * @apiBody {String} [image] User image filename
 * @apiBody {String} [message] Optional description
 * @apiDescription Updates a user. The router applies `authenticateToken`,
 * `filterByUserIdOrAdmin`, image upload/scaling middleware, and `formatBodyTypes`.
 * On success the updated user (without password) is returned. If the user is
 * not found the controller returns 404.
 *
 * @apiSuccess (200) {Object} user Updated user object (password omitted)
 *
 * @apiError (400) Bad Request Invalid payload
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (403) Forbidden User not allowed to modify this resource
 * @apiError (404) User not found
 * @apiError (500) Internal server error
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
 * @apiHeader {String} Authorization Bearer token (user or admin)
 * @apiParam {Number} id User ID
 * @apiDescription Deletes a user. The router applies `authenticateToken` and
 * `filterByUserIdOrAdmin` so only the user or an admin may delete. On success
 * the controller returns HTTP 200 with a textual message; if not found it
 * returns 404.
 *
 * @apiSuccess (200) {String} message Success message
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (403) Forbidden User not allowed to delete this user
 * @apiError (404) User not found
 * @apiError (500) Internal server error
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
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiParam {String} username User's username
 * @apiDescription Admin-only endpoint (router applies `authenticateToken` and
 * `userIsAdmin`) to return a user object by username. Returns 404 if not
 * found.
 *
 * @apiSuccess (200) {Object} user User object
 *
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (403) Forbidden Not an admin
 * @apiError (404) User not found
 * @apiError (500) Internal server error
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
 * @api {post} /users/list/id Get user list by IDs
 * @apiName GetUserList
 * @apiGroup User
 * @apiDescription Takes an array of user IDs in the request body under
 * `users` and returns the corresponding user objects. The router restricts
 * this endpoint to authenticated admins.
 *
 * @apiHeader {String} Authorization Bearer token (admin)
 * @apiBody {Number[]} users Array of user IDs
 *
 * @apiSuccess (200) {Object[]} users Array of user objects
 *
 * @apiError (400) Bad Request Invalid body
 * @apiError (401) Unauthorized Invalid or missing token
 * @apiError (404) No ID array in request
 * @apiError (500) Internal server error
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
 * @api {get} /users/username/exists/:username is Username Taken
 * @apiName isUsernameTaken
 * @apiGroup User
 *
 * @apiParam {String} username User username
 * @apiDescription Returns a boolean true/false indicating whether the
 * username exists. This endpoint is public (router applies only
 * `formatParamTypes`).
 *
 * @apiSuccess (200) {Boolean} exists true if username exists, false otherwise
 *
 * @apiError (500) Internal server error
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
