'use strict';

//TODO: formats all params like formatIdToNumber

/**
 * Middleware. Formats request.params to correct types.
 * @param req
 * @param res
 * @param next
 */
const formatParamTypes = (req, res, next) => {
    try {
        console.log('formatParamTypes');
        if(req.params) {
            console.log('request.params found TODO: this middleware does nothing'); //TODO: this...

            next();
        } else {
            console.log('no request.params');

            next();
        }

    } catch (error) {
        console.log(error);
        next();
    }
};

export default formatParamTypes;

/*TODO: all parameter that need to be formatted:
* date - date
* username - string
* *
*
* */