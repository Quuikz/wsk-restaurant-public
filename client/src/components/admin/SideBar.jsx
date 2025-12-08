import React from "react";
import { Link } from "react-router";

const SideBar = () => {

    return(
    <div className="w-64 bg-gray-900 text-white h-screen p-5 fixed">

      <nav className="space-y-4">
        <Link to="/admin/meals" className="block hover:text-gray-300">Meals</Link>
        <Link to="/admin/addmeal" className="block hover:text-gray-300">Add Meal</Link>
        <Link to="/admin/menus" className="block hover:text-gray-300">Menus</Link>
        <Link to="/admin/addmenus" className="block hover:text-gray-300">Add Menu</Link>
        <Link to="/admin/orders" className="block hover:text-gray-300">Orders</Link>
        <Link to="/admin/giftcards" className="block hover:text-gray-300">Gift Cards</Link>
        <Link to="/admin/reservations" className="block hover:text-gray-300">Reservations</Link>
        <Link to="/admin/users" className="block hover:text-gray-300">Users</Link>
      </nav>
    </div>
  )



}

export default SideBar;