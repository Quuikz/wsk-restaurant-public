//Consider moving content of <header> here, then import this into Layout
import React, {useEffect, useState, useRef, useContext} from 'react';
import {Link, useNavigate, useLocation} from 'react-router';
import {
  useLanguageContext,
  useShoppingCartContext,
  useUserContext,
} from '../../../hooks/contextHooks.js';
import {ShoppingCartContext} from '../../../contexts/ShoppingCartContext.jsx';

import LoginModal from '../LoginModal.jsx';
import RegisterModal from '../RegisterModal.jsx';
import Logo from '../../../assets/Restauranto-Logo2.webp';

const HeaderNV = () => {
  //const {user, handleAutoLogin} = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, handleLogout} = useUserContext();
  const {finnish, handleLanguageToggle} = useLanguageContext();
  const {cart} = useContext(ShoppingCartContext);

  /**
   *
   *


  /**
   * Iterates over the array
   *
   *
   * result: single value
   */
  const cartItemCount =
    cart.reservations.length ||
    0 +
      cart.gift_cards.reduce(
        (acc, currentGiftCard) => acc + currentGiftCard.quantity,
        0,
      ) ||
    0;

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to Table ordering section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({top, behavior: 'smooth'});
    setMenuOpen(false);
  };

  // Check if on home page, if yes scroll, if not navigate to home and scroll
  const handleReserveClick = (e) => {
    e?.preventDefault();
    setMenuOpen(false);
    const targetId = 'orderTableSection';
    if (location.pathname === '/') {
      scrollToSection(targetId);
    } else {
      // Not scrolling to section here. Needs to be done after navigation
      // in Ordering component's useEffect
      navigate('/', {state: {scrollTo: targetId}});
    }
  };

  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);

  useEffect(() => {
    //handleAutoLogin();

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
    <header className="fixed w-full z-50">
      <nav className="relative">
        {/* NavBar */}
        <div className=" bg-gray-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            {/* NavBar items */}
            <div className="relative flex h-22  items-center justify-between">
              {/* Week menu button */}
              <div className="absolute hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/weeklist"
                    aria-current="page"
                    className="rounded-md hover:bg-white/5 bg-gray-900 px-3 py-2 text-lg font-medium text-white "
                  >
                    🍽️&nbsp;&nbsp;{finnish ? 'Viikon lista' : 'Week menu'}
                  </Link>
                </div>
              </div>

              {/* -- Logo -- */}
              <div className="flex sm:absolute lg:absolute left-1/2 transform sm:-translate-x-1/2 lg:-translate-x-1/2 sm:translate-y-11 lg:translate-y-11 items-center ">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Restauranto Logo"
                    className="h-16 sm:h-20 lg:h-20 w-auto mx-auto rounded-full"
                  />
                </Link>
              </div>

              {/* -- Shopping cart -- */}
              <div className="absolute inset-y-0 right-16 flex items-center ">
                <Link to="/shoppingcart">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 in-aria-expanded:hidden text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    {/* Red Notification on shoppingcart when items in cart */}
                    {cartItemCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs text-white font-bold leading-none bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        !
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              {/* -- Burger button -- */}
              <div
                className="absolute inset-y-0 right-0 flex items-center"
                ref={menuRef}
              >
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6 in-aria-expanded:hidden"
                  >
                    <path
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6 not-in-aria-expanded:hidden"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* -- Burger menu items -- */}
                <div className="absolute right-0 top-20 z-50">
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-50 divide-y divide-white/10 rounded-b-md overflow-hidden bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10">
                      <div className="py-1">
                        <Link
                          to="/"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          {finnish ? 'Pääsivu' : 'Home page'}
                        </Link>
                        <Link
                          to="/weeklist"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          {finnish ? 'Viikon lista' : 'Week menu'}
                        </Link>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/giftcards"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          {finnish ? 'Lahjakortit' : 'Gift cards'}
                        </Link>
                        <a
                          href="/#orderTableSection"
                          onClick={handleReserveClick}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          {finnish ? 'Varaa pöytä' : 'Table reservation'}
                        </a>
                      </div>
                      <div className="py-1">
                        <button
                          //to="/language"
                          onClick={handleLanguageToggle}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          {finnish ? '🇬🇧 English' : 'FI - Finnish'}
                        </button>
                        <button
                          to="#"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          🌙 &nbsp;&nbsp; {finnish ? 'Pimeä tila' : 'Dark mode'}
                        </button>
                      </div>
                      {/* TODO: Conditional rendering to show either Login/Account settings?*/}

                      {user ? (
                        <div className="py-1 ">
                          <Link
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5  focus:bg-white/5 focus:text-white focus:outline-hidden"
                          >
                            👤 &nbsp;&nbsp;{user.username}
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                          >
                            🚪 &nbsp;&nbsp;
                            {finnish ? 'Kirjaudu ulos' : 'Logout'}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDisplayLoginModal(true)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 focus:bg-white/5 focus:text-white focus:outline-hidden"
                        >
                          🔒 &nbsp;&nbsp;{finnish ? 'Kirjaudu sisään' : 'Login'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/*<LoginModal isOpen={displayLoginModal} onClose={() => setDisplayLoginModal(false)} />*/}

      {displayLoginModal && (
        <LoginModal
          isOpen={displayLoginModal}
          onClose={() => setDisplayLoginModal(false)}
          onOpenRegister={() => {
            setDisplayLoginModal(false);
            setDisplayRegisterModal(true);
          }}
        />
      )}

      {displayRegisterModal && (
        <RegisterModal
          isOpen={displayRegisterModal}
          onClose={() => setDisplayRegisterModal(false)}
          onOpenLogin={() => {
            setDisplayRegisterModal(false);
            setDisplayLoginModal(true);
          }}
        />
      )}
    </header>
  );
};

export default HeaderNV;
