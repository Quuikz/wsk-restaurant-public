
//TODO: everything here

const listAllUsers = async () => {
    return {text: 'listAllUsers hard coded response from user-model.js'};
};

const findUserById = async (id) => {
    return [{text: 'findUserById hard coded response from user-model.js'}];
};

const addUser = async (user) => {
    return {text: 'addUser hard coded response from user-model.js'};
};

const modifyUser = async (user, userId, authorized_user) => {
    return {text: 'modifyUser hard coded response from user-model.js'};
};

const removeUser = async (userId, authorized_user) => {
    return {text: 'removeUser hard coded response from user-model.js'};
};

const findUserByUsername = async (username) => {
    return [{text: 'findUserByUsername hard coded response from user-model.js'}];

}

export {listAllUsers, findUserById, addUser, modifyUser, removeUser, findUserByUsername};
