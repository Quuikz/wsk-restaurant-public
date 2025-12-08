'use strict';

import bcrypt from 'bcrypt';

import {
    listAllOrders,
    findOrderById,
    addOrder,
    modifyOrder,
    removeOrder,
    findOrdersByUserId,
    findOrdersByTimestamp
} from "../models/order-model.js";

const getOrders = (req, res) => {
    console.log('getOrders in order-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);

    //TODO: only admins can get all orders!

    //TODO: error handling here see: discount-controller
    listAllOrders().then(
        result => {
            res.json(result);
        },

        (result) => {
            console.log('error in listAllUsers');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const getOrderById = (req, res) => {
    console.log('getOrderById in order-controller')
    console.log(req.params.id);
    const order = findOrderById(req.params.id);
    order.then(
        order => {
            if (order) {
                console.log('return order'+req.params.id)
                res.json(order);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getOrderById in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postOrder = (req, res) => {
    console.log('postOrder in order-controller');
    console.log(req.body);

    const result = addOrder(req.body);
    result.then(
        result => {
            if (result) {
                console.log('added order: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in postOrder in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putOrder = (req, res) => {
    console.log('putOrder in order-controller');
    console.log('user authenticated:' +res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyOrder(req.body, req.params.id, res.locals.user);
    result.then(
        result => {
            if (result) {
                console.log('return order: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in putOrder in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteOrder = (req, res) => {
    console.log('deleteOrder in order-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let message = removeOrder(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.status(200).send(message);
            } else {
                console.log('deleteOrder: order not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteOrder in order-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

const getOrdersByUserId = (req, res) => {
    console.log('getOrderByUserId in order-controller')
    console.log(req.params.id);
    const orderArray = findOrdersByUserId(req.params.id);
    orderArray.then(
        orderArray => {
            if (orderArray) {
                console.log('return orders for user '+req.params.id)
                res.json(orderArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getOrderByUserId in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );

}

const getOrdersByLocation = (req, res) => {
    console.log('getOrderByLocation in order-controller')
    console.log(req.params.id);
    const orderArray = findOrdersByLocation(req.params.id);
    orderArray.then(
        orderArray => {
            if (orderArray) {
                console.log('return orders for location '+req.params.id)
                res.json(orderArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getOrderByLocation in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
}

const getOrdersByDate = (req, res) => {
    console.log('getOrderByDate in order-controller')
    console.log(req.params.date);
    const orderArray = findOrdersByTimestamp(req.params.date);
    orderArray.then(
        orderArray => {
            if (orderArray) {
                console.log('return orders for date '+req.params.date)
                res.json(orderArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getOrderByLocation in order-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );

}

/**
 * Takes an array if id numbers from request.body and returns a corresponding array of objects.
 * @param req
 * @param res
 */
const getOrderList = async (req, res) => {
    try {
        console.log('getOrderList in order-controller')

        if (req.body.orders) {
            const orderArray = await Promise.all( req.body.orders.map( id => findOrderById(id) ));
            console.log('orders found: ', orderArray);
            res.json(orderArray);

        } else {
            console.log('no id array in getOrderList in order-controller');
            res.status(404).send('No id array found in request.');
        }

    } catch (error) {
        console.log('error in getOrderList in order-controller');
        res.sendStatus(500);
    }
}


export {
    getOrders, 
    getOrderById,
    postOrder,
    putOrder,
    deleteOrder,
    getOrdersByUserId,
    getOrdersByLocation,
    getOrdersByDate,
    getOrderList
};
