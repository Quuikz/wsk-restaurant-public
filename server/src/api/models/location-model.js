'use strict';

//import
import promisePool from "../../utils/database.js";

//default datastructure
const default_location = {
    id : 0,
    name: "default name",
    address : "default address",
    email : "default email",
    phone : "default phone",
    table_count : 10,
    message: 'default location'
}

/**
 *
 * @return {Promise<[{id: number, target_meal: number, cost_override: number, location_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, location_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, location_code: string, date_start: string, date_end: string, message: string}]|boolean>}
 * array of all objects or false if error
 */
const listAllLocations = async () => {
    try {
        console.log('listAllLocations in location-model');
        const [locationArray] = await promisePool.query('SELECT * FROM locations');
        //console.log('locationArray:', locationArray);
        return locationArray;

    } catch (error) {
        console.log('error in listAllLocations in location-model');
        console.log(error);
        return false;
    }
};

/**
 *
 * @param id
 * @return {Promise<*|boolean>}
 * first object that has the id or false if not found or error
 */
const findLocationById = async (id) => {
    try {
        console.log('findLocationById in location-model');
        const query = promisePool.format('SELECT * FROM locations where id = ?', id);
        const [locationArray] = await promisePool.execute(query);


        if (locationArray.length > 0) {
            return locationArray[0];

        } else if (locationArray.length > 1) {
            console.log('location table has multiple locations with same id!');
            return locationArray[0];
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
 * @return {Promise<{location: *}|boolean>}
 * object added to database or false if fails
 */
const addLocation = async (location) => {
    try {
        console.log('addLocation in location-model');

        //default location values overridden by location
        const newLocation = {...default_location, ...location, message: "new location added by location-model"};

        //sql statement
        const sql =  `INSERT INTO locations (name, address, email, phone, table_count, message)
                      VALUES (?,?,?,?,?,?)`;
        console.log(sql);

        //sql parameters
        const params = [
            newLocation.name,
            newLocation.address,
            newLocation.email,
            newLocation.phone,
            newLocation.table_count,
            newLocation.message
        ];
        console.log(params);

        //execute sql
        const rows = await promisePool.execute(sql, params);
        console.log('rows', rows);

        //return added location
        if (rows[0].affectedRows === 0) {
            console.log('Location not added');
            return false;

        } else {
            console.log('Location added');
            return  findLocationById(rows[0].insertId);
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 * Modifies a location by id.
 *
 * @param location location object, only fields given will be updated
 * @param locationId number
 * @return {Promise<*|boolean>}
 * modified location or false if error or not found
 */
const modifyLocation = async (location, locationId) => {
    try {
        console.log('modifyLocation: ', locationId, location);

        //get previous location
        const previousLocation = await findLocationById(locationId);

        //abort if not found
        if (!previousLocation) {
            return false;
        }

        //previous location values overridden by new location
        const updatedLocation = {...previousLocation, ...location, message: "location modified by location-model"};

        //sql statement
        const sql = `UPDATE locations SET name = ?, address = ?, email = ?, phone = ?, table_count = ?, message = ?
                     WHERE locations.id = ?`;
        console.log(sql);

        //sql parameters
        const params = [
            updatedLocation.name,
            updatedLocation.address,
            updatedLocation.email,
            updatedLocation.phone,
            updatedLocation.table_count,
            updatedLocation.message,
            locationId
        ];
        console.log(params);

        //execute sql
        const rows = await promisePool.execute(sql, params);
        console.log('rows', rows);

        //return modified location of false if no affected rows
        if (rows[0].affectedRows !== 0) {
            console.log('return modified location id: ',locationId);
            return findLocationById(locationId);

        } else {
            console.log('Location not modified');
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param locationId number
 * @return {Promise<boolean>} false if not found
 */
const removeLocation = async (locationId) => {
    try {
        // Prepare delete statement and execute
        const sql = "DELETE FROM locations WHERE id = ?";
        const params = [locationId];
        const [rows] = await promisePool.execute(sql, params);
        // console.log("rows", rows);

        if (rows.affectedRows === 0) {
            console.log("Location not found or not removed");
            return false;
        } else {
            console.log('location removed');
            return true;
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
