'use strict';

import bcrypt from 'bcrypt';

import {
    listAllOrders,
    findOrderById,
    addOrder,
    modifyOrder,
    removeOrder,
    findOrderByUserId,
    findOrderByLocation} from "../models/order-model.js";

const getOrders = (req, res) => {
    console.log('getOrders in order-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);

    //TODO: only admins can get all orders!

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

    //Bcrypt password hash
    req.body.password = bcrypt.hashSync(req.body.password, 10);

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
                res.sendStatus(200).send(message);
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

const getOrderByUserId = (req, res) => {
    console.log('getOrderByUserId in order-controller')
    console.log(req.params.id);
    const orderArray = findOrderByUserId(req.params.id);
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

const getOrderByLocation = (req, res) => {
    console.log('getOrderByLocation in order-controller')
    console.log(req.params.id);
    const orderArray = findOrderByLocation(req.params.id);
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


export {getOrders, getOrderById, postOrder, putOrder, deleteOrder, getOrderByUserId, getOrderByLocation};
