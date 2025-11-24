'use strict';

//TODO: KESKEN KORVAA LOCATION -> MEAL


import {
    listAllLocations,
    findLocationById,
    addLocation,
    modifyLocation,
    removeLocation,
} from "../models/location-model.js";

const getLocations = (req, res) => {
    console.log('getLocations in location-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);


    listAllLocations().then(
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

const getLocationById = (req, res) => {
    console.log('getLocationById in location-controller')
    console.log(req.params.id);
    const location = findLocationById(req.params.id);
    location.then(
        location => {
            if (location) {
                console.log('return location'+req.params.id)
                res.json(location);

            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getLocationById in location-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postLocation = (req, res) => {
    console.log('postLocation in location-controller');
    console.log(req.body);

    const result = addLocation(req.body);
    result.then(
        result => {
            if (result) {
                console.log('added location: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in postLocation in location-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putLocation = (req, res) => {
    console.log('putLocation in location-controller');
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyLocation(req.body, req.params.id);
    result.then(
        result => {
            if (result) {
                console.log('return location: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in putLocation in location-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteLocation = (req, res) => {
    console.log('deleteLocation in location-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let message = removeLocation(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.status(200).send(message);

            } else {
                console.log('deleteLocation: location not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteLocation in location-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

export {
    getLocations,
    getLocationById,
    postLocation,
    putLocation,
    deleteLocation,
};