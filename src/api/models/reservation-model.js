
//TODO: everything here

import {default_reservation} from "../../../database/datastructures.js";

const reservationArray = [
    {...default_reservation, id: 1},
    {...default_reservation, id: 2},
    {...default_reservation, id:3}
];

const listAllReservations = async () => {
    return reservationArray;
};

const findReservationById = async (id) => {
    return default_reservation;
};

const addReservation = async (reservation) => {
    return {text: 'addReservation hard coded response from reservation-model.js'};
};

const modifyReservation = async (reservation, reservationId, authorized_user) => {
    return {text: 'modifyReservation hard coded response from reservation-model.js'};
};

const removeReservation = async (reservationId, authorized_user) => {
    return {text: 'removeReservation hard coded response from reservation-model.js'};
};

const findReservationByUserId = async (userId) => {
    return [default_reservation,default_reservation,default_reservation];

}

const findReservationByLocation = async (locationId) => {
    return reservationArray;

}

export {
    listAllReservations,
    findReservationById,
    addReservation,
    modifyReservation,
    removeReservation,
    findReservationByUserId,
    findReservationByLocation
};
