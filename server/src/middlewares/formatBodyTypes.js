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

            if (req.body.id) { req.body.id = Number(req.body.id);}
            if (req.body.meals) {
                if (!Array.isArray(req.body.meals)) {
                    console.log('request.body.meals is not an array');
                    req.body.meals = req.body.meals
                        .replace("[", "")
                        .replace("]","")
                        .split(",");
                    req.body.meals.forEach( n=>Number(n) );
                }
            }


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