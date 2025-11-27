'use strict';

/**
 * Middleware that filters non admin users, responding with 403 code.
 * Must be run AFTER authenticateToken middleware.
 * @param req
 * @param res
 * @param next
 */
const userIsAdmin = (req, res, next) => {

    try {
        if(res.locals.user.role === 'admin') {
            console.log(res.locals.user.username+' is admin');
            next();
        } else {
            console.log(res.locals.user+' is not admin');
            res.status(403).send({message: 'user is not authorized'});
        }

    } catch (err) {
        res.status(500).send({message: 'Error checking if user is admin'});
    }
};

export default userIsAdmin;