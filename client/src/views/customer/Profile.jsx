import React, {useEffect, useState} from 'react';
//Modals
import EditModal from './Profile/EditModal.jsx';
import AvatarModal from './Profile/AvatarModal.jsx';

import { useUser } from '../../hooks/apiHooks.js';
import { useUserContext } from '../../hooks/contextHooks.js';

const Profile = () => {
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAvatarModal, setDisplayAvatarModal] = useState(false);
  //const {user} = useUserContext();

  const { getUserByToken } = useUser();
  const [user, setUser] = useState(null);

  console.log("PROFILE RENDER");
  useEffect(() => {
    console.log("USE EFFECT RUN");
    const token = localStorage.getItem('token');
    if(!token){
      console.log('No token found');
      return;
    }

    const getUserData = async () => {
      const userData = await getUserByToken(token);
      setUser(userData.user);
  
    };
    getUserData();

  }, []);


  return (
    <>
      <div className="max-w-7xl mx-auto">
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
                  <button onClick={() => setDisplayAvatarModal(true)}>
                    <img
                      src="https://placehold.co/50x50"
                      alt="User profile"
                      className="rounded-full "
                    />
                  </button>

                  <h2 className="text-lg font-medium">Käyttäjä profiili</h2>
                </div>

              {user ? (
                <div>
                <p className="pt-3">Nimi: {user.username}</p>
                <p className="pt-1">Sähköposti: {user.email}</p>
                <p className="pt-1">Käyttäjän ID: {user.id}</p>
                </div>
              ) : (
                <div className="max-w-7xl mx-auto text-center pt-20">
                  <h2 className="text-2xl font-medium">Ladataan profiilia...</h2>
                </div>
              )}
                

                <div className="grid grid-cols-2 gap-5">
                  <button
                    className="mt-4 text-sm text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none"
                    onClick={() => setDisplayEditModal(true)}
                  >
                    Muokkaa profiilia
                  </button>
                  <button
                    className="mt-4 text-sm text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none"
                    onClick={() => null}
                  >
                    Kirjaudu ulos
                  </button>
                </div>
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
        {displayEditModal && (
          <EditModal
            isOpen={displayEditModal}
            onClose={() => setDisplayEditModal(false)}
            onOpenAvatar={() => {
              setDisplayEditModal(false);
              setDisplayAvatarModal(true);
            }}
          />
        )}

        {displayAvatarModal && (
          <AvatarModal
            isOpen={displayAvatarModal}
            onClose={() => setDisplayAvatarModal(false)}
            onOpenEdit={() => {
              setDisplayAvatarModal(false);
              setDisplayEditModal(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
