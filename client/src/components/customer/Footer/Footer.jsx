//Consider moving content of <footer> here, then import this into Layout
import React from 'react';
import {Link} from 'react-router';
import Logo from '../../../assets/Restauranto-Logo2.png';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

const Footer = () => {
  const {finnish} = useLanguageContext();

  return (
    <>
      {/*<footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800" >*/}
      <footer className="px-4 divide-y bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto container flex flex-col justify-between py-10 space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <Link
              to="/"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600">
                <img
                  src={Logo}
                  alt="Restauranto Logo"
                  className="w-auto mx-auto rounded-full"
                />
              </div>
              <span className="self-center text-2xl font-semibold">
                Restauranto
              </span>
            </Link>
          </div>

          {/*Services*/}
          <div className="grid grid-cols-2 text-sm px-4 gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-white">
                {finnish ? 'Palvelut' : 'Services'}
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/weeklist" className="hover:underline">
                    {finnish ? 'Viikon lista' : 'Week menu'}
                  </Link>
                </li>
                <li>
                  <Link to="/giftcards" className="hover:underline">
                    {finnish ? 'Lahjakortit' : 'Gift cards'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact section */}
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-white">
                {finnish ? 'Ota yhteyttä' : 'Contact us'}
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/contacts" className="hover:underline">
                    {finnish ? 'Sijainti' : 'Location'}
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="hover:underline">
                    {finnish ? 'Aukioloajat' : 'Opening hours'}
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="hover:underline">
                    {finnish ? 'Yhteystiedot' : 'Contact information'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social media */}
            <div className="space-y-3">
              <div className="uppercase text-white">
                {finnish ? 'Sosiaalinen media' : 'Social media'}
              </div>
              <div className="flex justify-start space-x-3">
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm4 7.278V4.5h-2.286c-2.1 0-3.428 1.6-3.428 3.889v1.667H8v2.777h2.286V19.5h2.857v-6.667h2.286L16 10.056h-2.857V8.944c0-1.11.572-1.666 1.714-1.666H16z" />
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://x.com/"
                  title="X (Twitter)"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm3.193 7c-1.586 0-2.872 1.243-2.872 2.777 0 .217.025.43.074.633a8.251 8.251 0 0 1-5.92-2.902c-.247.41-.389.887-.389 1.397 0 .963.507 1.813 1.278 2.311a2.94 2.94 0 0 1-1.301-.348v.036c0 1.345.99 2.467 2.304 2.723a2.98 2.98 0 0 1-1.298.047c.366 1.103 1.427 1.906 2.683 1.928a5.889 5.889 0 0 1-3.567 1.19c-.231 0-.46-.014-.685-.04A8.332 8.332 0 0 0 9.903 18c5.283 0 8.172-4.231 8.172-7.901 0-.12-.002-.24-.008-.36A5.714 5.714 0 0 0 19.5 8.302a5.869 5.869 0 0 1-1.65.437 2.8 2.8 0 0 0 1.263-1.536 5.87 5.87 0 0 1-1.824.674A2.915 2.915 0 0 0 15.193 7z" />
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/"
                  title="Instagram"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M12 0c6.6274 0 12 5.3726 12 12s-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0zm3.115 4.5h-6.23c-2.5536 0-4.281 1.6524-4.3805 4.1552L4.5 8.8851v6.1996c0 1.3004.4234 2.4193 1.2702 3.2359.7582.73 1.751 1.1212 2.8818 1.1734l.2633.006h6.1694c1.3004 0 2.389-.4234 3.1754-1.1794.762-.734 1.1817-1.7576 1.2343-2.948l.0056-.2577V8.8851c0-1.2702-.4234-2.3589-1.2097-3.1452-.7338-.762-1.7575-1.1817-2.9234-1.2343l-.252-.0056zM8.9152 5.8911h6.2299c.9072 0 1.6633.2722 2.2076.8166.4713.499.7647 1.1758.8103 1.9607l.0063.2167v6.2298c0 .9375-.3327 1.6936-.877 2.2077-.499.4713-1.176.7392-1.984.7806l-.2237.0057H8.9153c-.9072 0-1.6633-.2722-2.2076-.7863-.499-.499-.7693-1.1759-.8109-2.0073l-.0057-.2306V8.885c0-.9073.2722-1.6633.8166-2.2077.4712-.4713 1.1712-.7392 1.9834-.7806l.2242-.0057h6.2299-6.2299zM12 8.0988c-2.117 0-3.871 1.7238-3.871 3.871A3.8591 3.8591 0 0 0 12 15.8408c2.1472 0 3.871-1.7541 3.871-3.871 0-2.117-1.754-3.871-3.871-3.871zm0 1.3911c1.3609 0 2.4798 1.119 2.4798 2.4799 0 1.3608-1.119 2.4798-2.4798 2.4798-1.3609 0-2.4798-1.119-2.4798-2.4798 0-1.361 1.119-2.4799 2.4798-2.4799zm4.0222-2.3589a.877.877 0 1 0 0 1.754.877.877 0 0 0 0-1.754z" />
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/en/"
                  title="Tiktok"
                  className="flex items-center p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M12 0c6.6274 0 12 5.3726 12 12s-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0Zm3.1623 4h-2.7508v10.9209a2.3324 2.3324 0 0 1-3.0455 2.2209 2.3324 2.3324 0 0 1 1.4129-4.4459V9.8862a5.0812 5.0812 0 0 0-5.7481 5.5912 5.0805 5.0805 0 0 0 3.802 4.3668 5.0818 5.0818 0 0 0 5.423-2.0286c.5899-.8501.9062-1.86.9065-2.8947V9.3345A6.5666 6.5666 0 0 0 19 10.5614V7.83a3.796 3.796 0 0 1-2.0944-.6295 3.8188 3.8188 0 0 1-1.6852-2.5075 3.7856 3.7856 0 0 1-.058-.693Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-600">
          © 2025 RyhmaUno 1.{' '}
          {finnish
            ? 'Kaikki oikeudet pidätetään. Parempi uskoa.'
            : 'All rights reserved. You better believe so.'}
        </div>
      </footer>
    </>
  );
};

export default Footer;
