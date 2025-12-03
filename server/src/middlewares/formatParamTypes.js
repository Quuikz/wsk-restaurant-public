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
            //TODO: this...
            req.params.id = Number(req.params.type);
            req.params.username = String(req.params.username);
            req.params.password = String(req.params.password);


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