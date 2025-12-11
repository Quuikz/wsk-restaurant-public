"use strict";

//imports
import jwt from "jsonwebtoken";

/**
 * Middleware, authenticates token in request header:  request.headers['authorization']
 * Calls next middleware only if token is valid.
 * Else returns response 403: {message: 'invalid token'}
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authenticateToken = (req, res, next) => {
  console.log("authenticateToken", req.headers.authorization);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);

  if (token == null) {
    console.log("token is null in authenticateToken");
    return res.sendStatus(401);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token ok in authenticateToken");
    console.log(res.locals.user);
    next();
  } catch (err) {
    console.log("invalid token");
    res.status(403).send({ message: "invalid token" });
  }
};

export default authenticateToken;
