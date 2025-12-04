'use strict';

/**
 * Middleware for endpoints that use user id.
 * Permits user whose authenticated id matches the request or admins.
 * Responds to unauthorized requests with 403 code.
 * Must be run AFTER authenticateToken middleware.
 * @param req
 * @param res
 * @param next
 */
const filterByUserIdOrAdmin = (req, res, next) => {

    try {
        if(res.locals.user.role === 'admin') {
            console.log(res.locals.user.username + ' is admin');
            next();

        } else if (res.locals.user.id === req.params.id) {
            console.log(res.locals.user.username + 'authorized by filterByUserIdOrAdmin');
            next();

        } else {
            console.log(res.locals.user.username + ' is not authorized for id:' + req.params.id);
            res.status(403).send({message: 'user is not authorized'});
        }

    } catch (err) {
        res.status(500).send({message: 'Error checking if user is authorized'});
    }
};

export default filterByUserIdOrAdmin;