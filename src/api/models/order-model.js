
//TODO: everything here

const listAllOrders = async () => {
    return {text: 'listAllOrders hard coded response from order-model.js'};
};

const findOrderById = async (id) => {
    return [{text: 'findOrderById hard coded response from order-model.js'}];
};

const addOrder = async (order) => {
    return {text: 'addOrder hard coded response from order-model.js'};
};

const modifyOrder = async (order, orderId, authorized_user) => {
    return {text: 'modifyOrder hard coded response from order-model.js'};
};

const removeOrder = async (orderId, authorized_user) => {
    return {text: 'removeOrder hard coded response from order-model.js'};
};

const findOrderByUserId = async (userId) => {
    return [{text: 'findOrderByUserId hard coded response from order-model.js'}];

}

const findOrderByLocation = async (locationId) => {
    return [{text: 'findOrderByLocation hard coded response from order-model.js'}];

}

export {listAllOrders, findOrderById, addOrder, modifyOrder, removeOrder, findOrderByUserId, findOrderByLocation};
