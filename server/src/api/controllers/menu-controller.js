'use strict';

import bcrypt from 'bcrypt';

import {
    listAllMenus,
    findMenuById,
    addMenu,
    modifyMenu,
    removeMenu,
    findMenusByLocation,
    findMenusByDate,
    findMenusByWeek
} from "../models/menu-model.js";

const getMenus = (req, res) => {
    console.log('getMenus in menu-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);


    listAllMenus().then(
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

const getMenuById = (req, res) => {
    console.log('getMenuById in menu-controller')
    console.log(req.params.id);
    const menu = findMenuById(req.params.id);
    menu.then(
        menu => {
            if (menu) {
                console.log('return menu', req.params.id)
                res.json(menu);

            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getMenuById in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postMenu = (req, res) => {
    console.log('postMenu in menu-controller');
    console.log(req.body);

    const result = addMenu(req.body);
    result.then(
        result => {
            if (result) {
                console.log('added menu: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in postMenu in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putMenu = (req, res) => {
    console.log('putMenu in menu-controller');
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyMenu(req.body, req.params.id);
    result.then(
        result => {
            if (result) {
                console.log('return menu: ',result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in putMenu in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteMenu = (req, res) => {
    console.log('deleteMenu in menu-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let message = removeMenu(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.status(200).send(message);

            } else {
                console.log('deleteMenu: menu not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteMenu in menu-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

const getMenusByLocation = (req, res) => {
    console.log('getMenuByLocation in menu-controller')
    console.log(req.params.id);
    const menuArray = findMenusByLocation(req.params.id);
    menuArray.then(
        menuArray => {
            if (menuArray) {
                console.log('return menus for location '+req.params.id)
                res.json(menuArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getMenuByLocation in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
}

const getMenusByDate = (req, res) => {
    console.log('getMenuByDate in menu-controller')
    console.log(req.params.date);
    const menu = findMenusByDate(req.params.date);
    menu.then(
        menu => {
            if (menu) {
                console.log('return menus for date '+req.params.id)
                res.json(menu);

            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getMenuByLocation in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
}

/**
 * Responds with array of objects or 404 or 500 if not found
 * @param req
 * @param res
 */
const getMenusByWeek = (req, res) => {
    console.log('getMenuByWeek in menu-controller')
    console.log(req.params.date);
    const menu = findMenusByWeek(req.params.week);
    menu.then(
        menu => {
            if (menu) {
                console.log('return menus for date '+req.params.id)
                res.json(menu);

            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getMenuByLocation in menu-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
}





export {
    getMenus,
    getMenuById,
    postMenu,
    putMenu,
    deleteMenu,
    getMenusByLocation,
    getMenusByDate,
    getMenusByWeek
};