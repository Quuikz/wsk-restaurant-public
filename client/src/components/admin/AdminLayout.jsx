import React from "react";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const AdminLayout = () => {


    return(
        <>
      <TopBar />
      <SideBar />
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>

      {/*<Footer />*/}
    </>


    );

}

export default AdminLayout;