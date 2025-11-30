//TODO: everything here

import {default_reservation} from "../../../../database/datastructures.js";

const reservations = [
    {...default_reservation, id: 1},
    {...default_reservation, id: 2},
    {...default_reservation, id:3}
];

const listAllReservations = async () => {
    return reservations;
};

const findReservationById = async (id) => {
    return default_reservation;
};

const addReservation = async (reservation) => {
    reservationArray.push(reservation);
    return {...reservations[reservations.length-1], message: 'addReservation hard coded response from reservation-model.js' }
};

const modifyReservation = async (reservation, reservationId, authorized_user) => {
    return {text: 'modifyReservation hard coded response from reservation-model.js'};
};

const removeReservation = async (reservationId, authorized_user) => {
    return {text: 'removeReservation hard coded response from reservation-model.js'};
};

const findReservationByUserId = async (userId) => {
    return reservations;

}

const findReservationByLocation = async (locationId) => {
    return reservations;
};

const findReservationByDate = async (date) => {
    return reservations;


}

export {
    listAllReservations,
    findReservationById,
    addReservation,
    modifyReservation,
    removeReservation,
    findReservationByUserId,
    findReservationByLocation,
    findReservationByDate
};
