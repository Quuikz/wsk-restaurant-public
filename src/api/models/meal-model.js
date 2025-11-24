
//TODO: everything here

//TODO: KESKEN KORVAA LOCATION -> MEAL

//example datastructure
import {default_meal} from "../../../database/datastructures.js";

const listAllLocations = async () => {
    return [
        {text: 'listAllLocations hard coded response from location-model.js'},
        {...default_meal},
        {...default_meal},
        {...default_meal},
    ];
};

const findLocationById = async (id) => {
    return {text: 'findLocationById hard coded response from location-model.js', ...default_meal};
};

const addLocation = async (location) => {
    return {text: 'addLocation hard coded response from location-model.js', ...default_meal};
};

const modifyLocation = async (location, locationId) => {
    return {text: 'modifyLocation hard coded response from location-model.js', ...default_meal};
};

const removeLocation = async (locationId) => {
    return {text: 'removeLocation hard coded response from location-model.js', ...default_meal};
};


export {
    listAllLocations,
    findLocationById,
    addLocation,
    modifyLocation,
    removeLocation,
};
