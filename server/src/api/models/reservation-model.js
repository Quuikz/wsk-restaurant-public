//TODO: everything here
//example datastructure
import {default_reservation} from "../../../../database/datastructures.js";

const reservations = [
    {...default_reservation, id: 1, message: "reservation number 1 in reservation model"},
    {...default_reservation, id: 2, message: "reservation number 2 in reservation model"},
    {...default_reservation, id: 3, message: "reservation number 3 in reservation model"},
];

/**
 *
 * @return
 * array of all objects or false if error
 */
const listAllReservations = async () => {
    try {
        return reservations;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return
 * first object that has the id or false if not found or error
 */
const findReservationById = async (id) => {
    try {
        const resultArray = reservations.filter(reservation => reservation.id === Number(id));
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
 * @param reservation
 * @return
 * object added to array/database or false if fails
 */
const addReservation = async (reservation) => {
    try {
        reservations.push(reservation);
        return reservations[reservations.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 *
 * @param reservation reservation object
 * @param reservationId number
 * @return {Promise<*|boolean>}
 * reservation or false if error or not found
 */
const modifyReservation = async (reservation, reservationId) => {
    try {
        console.log('modifyReservation: ',reservationId, reservation);
        const index = reservations.findIndex( (d) => {
            console.log(d.id, reservationId);
            return  d.id === Number(reservationId);  //Has to be number!
        } );


        if (index >= 0) {
            console.log('found at:'+index);
            reservations.splice(index,1, {...reservations[index], ...reservation });
            return reservations[index];

        } else {
            console.log('not found: ',reservationId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param reservationId number
 * @return {Promise<boolean>} false if not found
 */
const removeReservation = async (reservationId) => {
    try {
        const index = reservations.findIndex(reservation => reservation.id === Number(reservationId));
        if (index >= 0) {
            reservations.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

};

const findReservationsByUserId = async (userId) => {
    try {
        const resultArray = reservations.filter(reservation => reservation.user === Number(userId));
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}


/**
 * @param locationId
 * @return
 * array filtered by id given or false if error

 */
const findReservationsByLocation = async (locationId) => {
    try {
        const resultArray = reservations.filter(reservation => reservation.location === Number(locationId));
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * @param date
 * @return
 * array filtered by id given or false if error

 */
const findReservationsByDate = async (date) => {
    try {
        const resultArray = reservations.filter(reservation => reservation.date === date);
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    listAllReservations,
    findReservationById,
    addReservation,
    modifyReservation,
    removeReservation,
    findReservationsByUserId,
    findReservationsByLocation,
    findReservationsByDate
};
