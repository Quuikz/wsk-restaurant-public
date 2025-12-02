import React, {useEffect, useState, useRef} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks.js';

//Components
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    handleAutoLogin();

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
      <Header />
      <main className="pt-22 bg-emerald-600">
        {/* Adds little space so header wont take space from pages. */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
