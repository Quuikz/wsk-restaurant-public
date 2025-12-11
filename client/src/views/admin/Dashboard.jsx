import { useEffect, useState } from "react";
import { useUser, useGiftcards, useReservations, useOrders } from "../../hooks/admin/apiHooks";
import { useMealCommon, useMenuCommon } from "../../hooks/common/apiHooks";



const Dashboard = () => {

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [totalMenus, setTotalMenus] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalReservations, setTotalReservations] = useState(0);
    const [totalGiftCards, setTotalGiftCards] = useState(0);

    const { getAllUsers } = useUser();
    const { getAllMeals } = useMealCommon();
    const { getAllMenuItems } = useMenuCommon();
    const { getAllOrders } = useOrders();
    const { getAllReservations } = useReservations();
    const { getAllGiftCards } = useGiftcards();



    const loadAllData = async () => {
        const token = localStorage.getItem('token');

        try{
            const usersData = await getAllUsers(token);
            const mealsData = await getAllMeals();
            const menusData = await getAllMenuItems();
            const ordersData = await getAllOrders(token);
            const reservationsData = await getAllReservations(token);
            const giftCardsData = await getAllGiftCards(token);

            setTotalUsers(usersData.length);
            setTotalMeals(mealsData.length);
            setTotalMenus(menusData.length);
            setTotalOrders(ordersData.length);
            setTotalReservations(reservationsData.length);
            setTotalGiftCards(giftCardsData.length);

        }
        catch(error){
            console.log('Error fetching data for dashboard: ', error.message);
        }
    }

    useEffect(() => {
        loadAllData();
    }, []);


    return (
        <>
        
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your restaurant data from here.</p>

      {/* Simple Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Meals</h2>
          <p className="text-3xl font-bold">{totalMeals}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Menus</h2>
          <p className="text-3xl font-bold">{totalMenus}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Orders done</h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Reservations done</h2>
          <p className="text-3xl font-bold">{totalReservations}</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Giftcards bought</h2>
          <p className="text-3xl font-bold">{totalGiftCards}</p>
        </div>

      </div>
      
    </div>
    </>
  );
}

export default Dashboard;