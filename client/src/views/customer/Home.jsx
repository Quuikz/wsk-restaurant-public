//Components
import Ordering from './Home/Ordering.jsx';
import Specials from './Home/Specials.jsx';

import {useLanguageContext} from '../../hooks/contextHooks.js';

import BannerPic from '../../assets/Banner1.webp';

const Home = () => {
  const {finnish} = useLanguageContext();
  const bannerFinnish = `Tervetuloa Restaurantoon! Tule maistamaan päivittäin vaihtuvat erikoisuutemme tai
   nauttimaan lounas runsaasta noutopöydästämme.`;

  const bannerEnglish = `Welcome to Restauranto! Come and taste our daily changing specials or
  enjoy a lunch from our abundant buffet.`;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Main banner */}
        <div className="grid grid-cols-2 bg-orange-50">
          <div className="text-center justify-center flex items-center">
            <h2 className="text-m sm:text-3xl lg:text-3xl font-bold p-auto  px-5">
              {finnish
                ? '“Restauranto on paikka, jossa hyvä ruoka ja hyvä fiilis kulkevat käsi kädessä – tule herkuttelemaan ja viihtymään.”'
                : '“Restauranto is a place where great food and good vibes go hand in hand – come enjoy, relax, and treat yourself.”'}
            </h2>
          </div>
          <img
            className="max-h-[60vh]"
            src={BannerPic}
            alt="Main page banner"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        {/* Main title and text below */}
        <div className="p-10 sm:p-15 lg:p-20 pb-30 text-center bg-orange-100">
          <h1 className="text-4xl font-bold">Restauranto</h1>
          <p className="mt-4 text-xl text-gray-600">
            {finnish ? bannerFinnish : bannerEnglish}
          </p>
        </div>

        {/* Daily Special title */}
        <div className="w-max text-center absolute left-1/2 transform -translate-x-1/2 translate-y-[-30%]">
          <h2 className="text-3xl font-medium">
            | {finnish ? 'Päivän Ateriat' : 'Meals of the Day'} |
          </h2>
          <p className="mt-2 ">
            {finnish
              ? 'Tutustu herkullisiin erikoisuuksiimme!'
              : 'Check out our delicious specials!'}
          </p>
        </div>

        {/* Daily Specials component */}
        <Specials />

        {/* Table ordering title */}
        <div className="w-max text-center absolute left-1/2 transform -translate-x-1/2 translate-y-[-30%]">
          <h2 className="text-3xl font-medium">
            | {finnish ? 'Varaa Pöytä' : 'Table reservation'} |
          </h2>
          <p className="mt-2 ">
            {finnish ? 'Varaa helposti tästä!' : 'Reserve your table here!'}
          </p>
        </div>

        {/* Table ordering component */}
        <Ordering id="orderTableSection" />
      </div>
    </>
  );
};

export default Home;
