
//TODO: everything here

//example datastructure
import {default_location} from "../../../database/datastructures.js";

//placeholder table
const locations = [default_location, default_location, default_location];


const listAllLocations = async () => {
    return [
        {text: 'listAllLocations hard coded response from location-model.js'},
        ...locations
    ];
};

const findLocationById = async (id) => {
    return {text: 'findLocationById hard coded response from location-model.js',...default_location};
};

const addLocation = async (location) => {
    locations.push(location);
    return {text: 'addLocation hard coded response from location-model.js',
        ...locations[locations.length-1]
    }
};

const modifyLocation = async (location, locationId) => {
    return {text: 'modifyLocation hard coded response from location-model.js',...default_location};
};

const removeLocation = async (locationId) => {
    locations.splice(locationId, 1);
    return {text: 'removeLocation hard coded response from location-model.js'};
};


export {
    listAllLocations,
    findLocationById,
    addLocation,
    modifyLocation,
    removeLocation,
};
