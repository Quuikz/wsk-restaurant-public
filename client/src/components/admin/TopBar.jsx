import React from "react";
import { Link } from "react-router";

/**
 * Top Bar component for the admin panel.
 * Renders a fixed bar at the top with a centered and clickable 'Admin Panel' link that redirects to main Dashboard.
 * 
 * @returns The Top Bar with navigation link to main Dashboard.
 */
const TopBar = () => {

    return(
    <div className="w-full h-16 bg-gray-800 fixed top-0 left-0 text-white flex items-center px-6 z-50">
      <Link
            to='/admin'
            className="text-xl font-bold absolute left-1/2 -translate-x-1/2 "   
        >Admin Panel
        </Link>
    </div>
  );

}

export default TopBar;