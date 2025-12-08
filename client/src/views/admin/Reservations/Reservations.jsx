import { useEffect, useState } from "react";
import { useReservations } from "../../../hooks/admin/apiHooks";
import ReservationRow from "../../../components/admin/ReservationRow";


const ReservationsAdmin = () => {

    const { getAllReservations } = useReservations();
    const [ reservations, setReservations ] = useState([]);

    const loadAllReservations = async () => {
        const token = localStorage.getItem('token');
        if(!token){
            return;
        }

        try{
            const reservationsData = await getAllReservations(token);
            //console.log(reservationsData);
            setReservations(reservationsData);
        }
        catch(error){
            console.log('Error in loadAllReservations: ', error);
        }
    }

    useEffect(() => {
        loadAllReservations();
    }, []);

    return(
        <>
        <h1>Reservations</h1>

        <li className="grid grid-cols-7 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Table (customer count)</span>
            <span>Grill (customer count)</span>
            <span>date</span>
            <span>Order</span>
            <span>User</span>
            <span>Redeemed</span>
        </li>

        <ul>
            {reservations.map((reservation) => (
                <ReservationRow 
                    key={reservation.id}
                    reservation={reservation}
                />
            ))}
        </ul>


        </>
    );


}

export default ReservationsAdmin;