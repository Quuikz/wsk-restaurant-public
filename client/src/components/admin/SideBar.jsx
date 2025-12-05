import React from "react";
import { Link } from "react-router";

const SideBar = () => {

    return(
    <div className="w-64 bg-gray-900 text-white h-screen p-5 fixed">

      <nav className="space-y-4">
        <Link to="/admin/meals" className="block hover:text-gray-300">Meals</Link>
        <Link to="/admin/add-meal" className="block hover:text-gray-300">Add Meal</Link>
        <Link to="/giftcards" className="block hover:text-gray-300">Gift Cards</Link>
        <Link to="/add-giftcard" className="block hover:text-gray-300">Add Gift Card</Link>
      </nav>
    </div>
  )



}

export default SideBar;