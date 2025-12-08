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
            console.log(req.params);
            //TODO: this...
            if(req.params.id) req.params.id = Number(req.params.type);
            if(req.params.username) req.params.username = String(req.params.username);
            //if(req.params.password) req.params.password = String(req.params.password);
            if(req.params.week) req.params.week = Number(req.params.week);


            console.log(req.params);
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
* date - date? string?

* */