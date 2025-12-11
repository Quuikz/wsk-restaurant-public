import React from 'react';
import {Outlet} from 'react-router';
import SideBar from './SideBar';
import TopBar from './TopBar';

/**
 * AdminLayout component for the admin.
 * Render:
 *  - Top bar.
 *  - Side navigation bar.
 *  - Main content area.
 *
 * Uses the React's <Outlet /> to render nested routes inside the main content area.
 * @returns
 */
const AdminLayout = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
