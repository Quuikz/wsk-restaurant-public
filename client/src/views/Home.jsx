//Components
import Ordering from './Home/Ordering.jsx';
import Specials from './Home/Specials.jsx';


const Home = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 relative">
        {/* Main banner */}
        <div>
          <img src="https://placehold.co/1920x750" alt="Main page banner" />
        </div>
        {/* Main title and text below */}
        <div className=" p-20 pb-30 text-center bg-orange-100">
          <h1 className="text-4xl font-bold">Restauranto</h1>
          <p className="mt-4 text-xl text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam non
            sapiente iste enim esse asperiores debitis excepturi nostrum porro,
            eum unde omnis veniam voluptatum at vero adipisci aut? Sequi, sed.
          </p>
        </div>

        {/* Daily Special title */}
        <div className="text-center absolute w-full translate-y-[-30%]">
          <h2 className="text-3xl font-medium">| Grilliruoka |</h2>
          <p className="mt-2 ">Tutustu herkullisiin erikoisuuksiimme!</p>
        </div>

        {/* Daily Specials component */}
        <Specials />

        {/* Table ordering title */}
        <div className="text-center absolute w-full translate-y-[-30%]">
          <h2 className="text-3xl font-medium">| Varaa Pöytä |</h2>
          <p className="mt-2 ">Varaa pöytä helposti tästä!</p>
        </div>

        {/* Table ordering component */}
        <Ordering />
      </div>
    </>
  );
};

export default Home;
