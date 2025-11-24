
//TODO: everything here

const listAllMenus = async () => {
    return {text: 'listAllMenus hard coded response from menu-model.js'};
};

const findMenuById = async (id) => {
    return {text: 'findMenuById hard coded response from menu-model.js'};
};

const addMenu = async (menu) => {
    return {text: 'addMenu hard coded response from menu-model.js'};
};

const modifyMenu = async (menu, menuId) => {
    return {text: 'modifyMenu hard coded response from menu-model.js'};
};

const removeMenu = async (menuId) => {
    return {text: 'removeMenu hard coded response from menu-model.js'};
};

const findMenusByLocation = async (locationId) => {
    return [{text: 'findMenuByLocation hard coded response from menu-model.js'}];

}

const findMenuByDate = async (date) => {
    return {text: 'findMenuByDate hard coded response from menu-model.js'};

}

export {
    listAllMenus,
    findMenuById,
    addMenu,
    modifyMenu,
    removeMenu,
    findMenusByLocation,
    findMenuByDate
};
