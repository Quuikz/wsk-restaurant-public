'use strict';

/**
 * Middleware that changes id parameter INSIDE request.body into a Number type.
 * Has to run AFTER Multer.
 * @param req
 * @param res
 * @param next
 */

//TODO: validate inputs more ?


const formatBodyTypes = (req, res, next) => {
    try {
        console.log('formatBodyTypes');
        if(req.body) {

            if (req.body.id) {req.body.id = Number(req.body.id);}


            next();

        } else {
            console.log('no request.body');
           next();
        }

    } catch (error) {
        console.log(error);
        next();
    }
};

export default formatBodyTypes;