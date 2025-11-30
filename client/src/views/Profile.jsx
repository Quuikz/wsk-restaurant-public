//Components
import Ordering from './Home/Ordering.jsx';
import Specials from './Home/Specials.jsx';

const Profile = () => {
  return (
    <>
      <div className=" mx-auto">
        {/* Daily Special title */}
        <div className="text-center w-full bg-orange-50 pt-20">
          <h2 className="text-3xl font-medium">| Profiili |</h2>
          <p className="mt-2 ">Tarkista tiedot ja muokkaa halutessa!</p>
        </div>

        {/* User profile */}
        <div className=" p-20 pb-30  bg-orange-100">
          <div className="p-5 bg-orange-50">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-4 border-">
                  <img
                    src="https://placehold.co/50x50"
                    alt="User profile"
                    className="rounded-full "
                  />
                  <p>Käyttäjätunnus</p>
                </div>
                <button className="mt-4 text-sm text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none">
                  Muokkaa profiilia
                </button>
              </div>

              <div className="col-span-2 flex flex-col justify-center border-l">
                <h2 className="text-lg font-medium"> Ostohistoria</h2>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold">Restauranto</h1>
          <p className="mt-4 text-xl text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam non
            sapiente iste enim esse asperiores debitis excepturi nostrum porro,
            eum unde omnis veniam voluptatum at vero adipisci aut? Sequi, sed.
          </p>
        </div>

        {/* Purchase history */}

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

export default Profile;
