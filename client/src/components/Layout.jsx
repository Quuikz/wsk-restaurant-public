import React, {useEffect, useState, useRef} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks.js';

//Components
import Footer from './customer/Footer/Footer.jsx';
import HeaderNV from './customer/Header/HeaderNV.jsx';

const Layout = () => {
  const {handleAutoLogin} = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  useEffect(() => {
    // Burger closed on window click outside
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    /*
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>


          {user && (
            <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            </>
          )}

          {!user && (
            <li>
              <Link to="/login">Login/Register</Link>
              </li>
          )}

        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
    */

    <>
      <HeaderNV />
      <main className="pt-22  bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_12px)] bg-[#2c5c42]">
        {/* Adds little space so header wont take space from pages. */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
