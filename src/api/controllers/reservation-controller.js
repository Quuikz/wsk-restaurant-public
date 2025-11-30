'use strict';

import bcrypt from 'bcrypt';

import {
    listAllReservations,
    findReservationById,
    addReservation,
    modifyReservation,
    removeReservation,
    findReservationByUserId,
    findReservationByLocation
} from "../models/reservation-model.js";

const getReservations = (req, res) => {
    console.log('getReservations in reservation-controller')
    const user = res.locals.user;
    console.log('user authenticated:' +res.locals.user);

    //TODO: only admins can get all reservations!

    listAllReservations().then(
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

const getReservationById = (req, res) => {

    //TODO: user should be allowed to access only their own reservations
    console.log('getReservationById in reservation-controller')
    console.log(req.params.id);
    const reservation = findReservationById(req.params.id);
    reservation.then(
        reservation => {
            if (reservation) {
                console.log('return reservation'+req.params.id)
                res.json(reservation);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getReservationById in reservation-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postReservation = (req, res) => {
    console.log('postReservation in reservation-controller');
    console.log(req.body);

    const result = addReservation(req.body);
    result.then(
        result => {
            if (result) {
                console.log('added reservation: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in postReservation in reservation-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putReservation = (req, res) => {

    //TODO: user should be allowed to access only their own reservations

    console.log('putReservation in reservation-controller');
    console.log('user authenticated:' +res.locals.user);
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyReservation(req.body, req.params.id, res.locals.user);
    result.then(
        result => {
            if (result) {
                console.log('return reservation: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in putReservation in reservation-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteReservation = (req, res) => {
    //TODO: user should be allowed to access only their own reservations

    console.log('deleteReservation in reservation-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let message = removeReservation(req.params.id, res.locals.user);
    message.then(
        message => {
            if (message) {
                console.log(message);
                res.sendStatus(200).send(message);
            } else {
                console.log('deleteReservation: reservation not found');
                res.sendStatus(404);
            }
        },
        message => {
            console.log('error in deleteReservation in reservation-controller');
            console.log(message);
            res.sendStatus(500);
        }
    );
}

const getReservationByUserId = (req, res) => {
    //filterByUserIdOrAdmin filter unauthorized users
    console.log('getReservationByUserId in reservation-controller')
    console.log(req.params.id);
    const reservationArray = findReservationByUserId(req.params.id);
    reservationArray.then(
        reservationArray => {
            if (reservationArray) {
                console.log('return reservations for user '+req.params.id)
                res.json(reservationArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getReservationByUserId in reservation-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );

}

const getReservationByLocation = (req, res) => {


    console.log('getReservationByLocation in reservation-controller')
    console.log(req.params.id);
    const reservationArray = findReservationByLocation(req.params.id);
    reservationArray.then(
        reservationArray => {
            if (reservationArray) {
                console.log('return reservations for location '+req.params.id)
                res.json(reservationArray);
            } else {
                res.sendStatus(404);
            }
        },
        result => {
            console.log('error in getReservationByLocation in reservation-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );

}


export {
    getReservations,
    getReservationById,
    postReservation,
    putReservation,
    deleteReservation,
    getReservationByUserId,
    getReservationByLocation
};
