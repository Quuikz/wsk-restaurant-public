'use strict';

/**
 * Middleware that changes id parameter into a Number type.
 * @param req
 * @param res
 * @param next
 */
const formatIdToNumber = (req, res, next) => {
    try {
        if(req.params.id) {
            console.log();
            next();
        } else {
            console.log();
            next();
        }

    } catch (err) {

    }
};

export default formatIdToNumber;