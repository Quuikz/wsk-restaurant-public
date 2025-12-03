
//TODO: everything here

//example datastructure
import {default_location} from "../../../../database/datastructures.js";

//placeholder table
const locations = [
    {...default_location, id: 1, name :"Restauranto 1", message: "location number 1 in location model"},
    {...default_location, id: 2, name :"Restauranto 2", message: "location number 2 in location model"},
    {...default_location, id: 3, name :"Restauranto 3", message: "location number 3 in location model"},
];

/**
 *
 * @return {Promise<[{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string},{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string},{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}]|boolean>}
 * array of all objects or false if error
 */
const listAllLocations = async () => {
    try {
        return locations;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return {Promise<{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|boolean>}
 * first object that has the id or false if not found or error
 */
const findLocationById = async (id) => {
    try {
        const resultArray = locations.filter(location => location.id === Number(id));
        if (resultArray.length > 0) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param location
 * @return {Promise<{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|{id: number, name: string, address: string, email: string, phone: string, table_count: number, message: string}|boolean>}
 * object added to array/database or false if fails
 */
const addLocation = async (location) => {
    try {
        locations.push(location);
        return locations[locations.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param location
 * @param locationId
 * @return {Promise<*|boolean>}
 * location or false if error or not found
 */
const modifyLocation = async (location, locationId) => {
    try {
        console.log('modifyLocation: ',locationId, location);
        const index = locations.findIndex( (d) => {
            console.log(d.id, locationId);
            return  d.id === Number(locationId);  //Has to be number!
        } );


        if (index >= 0) {
            console.log('found at:'+index);
            locations.splice(index,1, {...locations[index], ...location });
            return locations[index];

        } else {
            console.log('not found: ',locationId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param locationId
 * @return {Promise<boolean>}
 * boolean whether id found and removed
 */
const removeLocation = async (locationId) => {
    try {
        const index = locations.findIndex(location => location.id === Number(locationId));
        if (index >= 0) {
            locations.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


export {
    listAllLocations,
    findLocationById,
    addLocation,
    modifyLocation,
    removeLocation,
};
