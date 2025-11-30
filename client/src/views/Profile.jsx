//Components
import Ordering from './Home/Ordering.jsx';
import Specials from './Home/Specials.jsx';

const Profile = () => {
  return (
    <>
      <div className=" mx-auto">
        {/* Profile title */}
        <div className="text-center w-full bg-orange-50 pt-20">
          <h2 className="text-3xl font-medium">| Profiili |</h2>
          <p className="mt-2 ">Tarkista tiedot ja muokkaa halutessa!</p>
        </div>

        <div className=" p-20 pb-30  bg-orange-100">
          <div className="p-5 bg-orange-50">
            <div className="grid grid-cols-3 gap-4">
              {/* User profile */}
              <div className="col-span-1">
                <div className="flex items-center gap-4 pb-2 border-b">
                  <img
                    src="https://placehold.co/50x50"
                    alt="User profile"
                    className="rounded-full "
                  />
                  <h2 className="text-lg font-medium">Käyttäjätunnus</h2>
                </div>
                <p className="pt-3">Sähköposti: </p>
                <p className="pt-3">Käyttäjän nimi: </p>

                {/* !!! Make edit modal */}
                <button className="mt-4 text-sm text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none">
                  Muokkaa profiilia
                </button>
              </div>

              {/* Purchase history */}
              <div className="col-span-2 flex flex-col  border-l pl-4">
                <div className="flex items-center gap-4 pb-4 border-b mt-3">
                  <h2 className="text-lg font-medium">Ostoshirstoria</h2>
                </div>
                <div className="overflow-y-auto h-31 border">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">Tilauspäivä</th>
                        <th className="px-4 py-2 border">Tuote</th>
                        <th className="px-4 py-2 border">Määrä</th>
                        <th className="px-4 py-2 border">Hinta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example row */}
                      <tr>
                        <td className="px-4 py-2 border text-center">
                          2024-01-15
                        </td>
                        <td className="px-4 py-2 border text-center">
                          Grillipöytä varaus
                        </td>
                        <td className="px-4 py-2 border text-center">2</td>
                        <td className="px-4 py-2 border text-center">45.00€</td>
                      </tr>
                      {/* More rows can be added here */}
                    </tbody>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border text-center">
                          2024-01-15
                        </td>
                        <td className="px-4 py-2 border text-center">
                          Grillipöytä varaus
                        </td>
                        <td className="px-4 py-2 border text-center">2</td>
                        <td className="px-4 py-2 border text-center">45.00€</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border text-center">
                          2024-01-15
                        </td>
                        <td className="px-4 py-2 border text-center">
                          Grillipöytä varaus
                        </td>
                        <td className="px-4 py-2 border text-center">2</td>
                        <td className="px-4 py-2 border text-center">45.00€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
