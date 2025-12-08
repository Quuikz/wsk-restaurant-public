'use strict';


import {
    listAllDiscounts,
    findDiscountById,
    addDiscount,
    modifyDiscount,
    removeDiscount
} from "../models/discount-model.js";


const getDiscounts = (req, res) => {
    console.log('getDiscounts in discount-controller')
    const user = res.locals.user;
    console.log('user authenticated:' + res.locals.user);


    listAllDiscounts().then(
        (result) => {
            if (result) {
                res.json(result);
            } else {
                console.log('no discounts found');
                res.status(200).send("no discounts found");
            }
        },

        (result) => {
            console.log('error in getDiscounts in discount-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const getDiscountById = (req, res) => {
    console.log('getDiscountById in discount-controller')
    console.log(req.params.id);
    const discount = findDiscountById(req.params.id);
    discount.then(
        (discount) => {
            if (discount) {
                console.log('return discount' + req.params.id)
                res.json(discount);

            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in getDiscountById in discount-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postDiscount = (req, res) => {
    console.log('postDiscount in discount-controller');
    console.log(req.body);

    const result = addDiscount(req.body);
    result.then(
        (result) => {
            if (result) {
                console.log('added discount: ' + result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in postDiscount in discount-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putDiscount = (req, res) => {
    console.log('putDiscount in discount-controller');
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyDiscount(req.body, req.params.id);
    result.then(
        (result) => {
            if (result) {
                console.log('return discount: ' + result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in putDiscount in discount-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteDiscount = (req, res) => {
    console.log('deleteDiscount in discount-controller');
    console.log(req.params.id);
    console.log('user authenticated:' + res.locals.user);


    let message = removeDiscount(req.params.id, res.locals.user);
    message.then(
        (message) => {
            if (message) {
                console.log(message);
                res.status(200).send(message);

            } else {
                console.log('deleteDiscount: discount not found');
                res.sendStatus(404);
            }
        },
        (message) => {
            console.log('error in deleteDiscount in discount-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}




export {
    getDiscounts,
    getDiscountById,
    postDiscount,
    putDiscount,
    deleteDiscount
};