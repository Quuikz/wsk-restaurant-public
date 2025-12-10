//import {findUserByUsername} from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function for getting user
import { findUserByUsername } from "../models/user-model.js";

/**
 * @api {post} /auth/login Login user
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} username User's username
 * @apiBody {String} password User's password
 *
 * @apiSuccess {Object} user User object (without password)
 * @apiSuccess {String} token JWT access token (expires in 24h)
 *
 * @apiError 401 Incorrect password
 * @apiError 403 User not found
 * @apiError 404 Missing username in request
 * @apiError 500 Internal server error
 */
const login = async (req, res) => {
  try {
    console.log("login in auth-controller");
    console.log("user name: " + req.body.username);

    if (req.body.username !== undefined) {
      try {
        const user = await findUserByUsername(req.body.username);

        if (user) {
          console.log("user found in auth-controller-login: ", user);

          if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log("password correct");

            //create token
            const userWithNoPassword = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              role: user.role,
              image : user.image,
              message : user.message
            };

            const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
              expiresIn: "24h",
            });

            //respond with user and token
            return res.json({ user: userWithNoPassword, token });
          } else {
            console.log("password incorrect");
            return res.sendStatus(401);
          }
        } else {
          console.log("user is null in auth-controller-login");
          return res.sendStatus(403);
        }
      } catch (error) {
        console.log("error in login in auth-controller");
        console.log(error);
        return res.sendStatus(500);
      }
    } else {
      console.log("undefined input in auth-controller");
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

/**
 * @api {get} /auth/validate Validate token
 * @apiName ValidateToken
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message "token ok"
 * @apiSuccess {Object} user The authenticated user object
 *
 * @apiError 401 Unauthorized or invalid token
 */
const validateToken = async (req, res) => {
  console.log("validateToken", res.locals.user);
  if (res.locals.user) {
    res.json({ message: "token ok", user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { login, validateToken };
