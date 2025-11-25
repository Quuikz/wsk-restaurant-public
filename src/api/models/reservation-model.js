
//TODO: everything here

//example datastructure
import {default_reservation} from "../../../database/datastructures.js";

//placeholder table
const reservations = [default_reservation, default_reservation, default_reservation];


const listAllReservations = async () => {
    return [
        {text: 'listAllReservations hard coded response from reservation-model.js'},
        ...reservations
    ];
};

const findReservationById = async (id) => {
    return {text: 'findReservationById hard coded response from reservation-model.js',...default_reservation};
};

const addReservation = async (reservation) => {
    reservations.push(reservation);
    return {text: 'addReservation hard coded response from reservation-model.js',
        ...reservations[reservations.length-1]
    }
};

const modifyReservation = async (reservation, reservationId) => {
    return {text: 'modifyReservation hard coded response from reservation-model.js',...default_reservation};
};

const removeReservation = async (reservationId) => {
    reservations.splice(reservationId, 1);
    return {text: 'removeReservation hard coded response from reservation-model.js'};
};

const findReservationByUserId = async (userId) => {
    return {text: 'findReservationByUserId hard coded response from reservation-model.js'};
};

const findReservationByLocation = async (locationId) => {
    return {text: 'findReservationByLocation hard coded response from reservation-model.js'};
};

const findReservationByDate = async (date) => {
    return {text: 'findReservationByDate hard coded response from reservation-model.js'};
};



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
