'use strict';

/**
 * Middleware that changes id parameter into a Number type.
 * @param req
 * @param res
 * @param next
 */
const formatIdToNumber = (req, res, next) => {
    try {
        console.log('formatIdToNumber');
        if(req.params.id) {
            req.params.id = Number(req.params.id);
            console.log(req.params.id);
            next();

        } else {
            console.log();
            next();
        }

    } catch (error) {
        console.log(error);
        next();
    }
};

export default formatIdToNumber;