import React from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {


    return(
        <>
      {/* TODO: Create different header + footer for admin, then uncomment */}
      {/*<Header />*/}
      <main className="pt-22 bg-gray-200">
        {/* Adds little space so header wont take space from pages. */}
        <Outlet />
      </main>

      {/*<Footer />*/}
    </>


    );

}

export default AdminLayout;