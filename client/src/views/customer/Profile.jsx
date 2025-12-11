import React, {useEffect, useState} from 'react';
//Modals
import EditModal from './Profile/EditModal.jsx';
import AvatarModal from './Profile/AvatarModal.jsx';

import {useUser} from '../../hooks/apiHooks.js';
import {useLanguageContext, useUserContext} from '../../hooks/contextHooks.js';
import ShoppingHistory from './Profile/ShoppingHistory.jsx';
import AlertDeletionModal from '../../components/customer/AlertDeletionModal.jsx';

const Profile = () => {
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayAvatarModal, setDisplayAvatarModal] = useState(false);
  const [displayAlertDeleteModal, setDisplayAlertDeleteModal] = useState(false);
  const [message, setMessage] = useState('');
  const {user, setUser, handleLogout} = useUserContext();
  const {getUserByToken} = useUser();

  //language
  const {finnish} = useLanguageContext();

  //Set server URL
  let SERVER_URL = import.meta.env.VITE_SERVER_URL;
  if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
    SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  }
  const userImages = SERVER_URL + '/images/users/';

  //console.log('PROFILE RENDER', user ? user : 'no user');

  useEffect(() => {
    //console.log('USE EFFECT RUN');
    const token = localStorage.getItem('token');
    if (!token) {
      //console.log('No token found');
      return;
    }

    const getUserData = async () => {
      const userData = await getUserByToken(token);
      if (userData.user) {
        setUser(userData.user);
      }
    };
    getUserData();
  }, []);

  const handleAskDeleteUser = () => {
    setMessage(
      finnish
        ? 'Oletko varma, että haluat poistaa tilisi?'
        : 'Are you sure you want to delete your account?',
    );
    setDisplayAlertDeleteModal(true);

    console.log('User was asked about deletion!');
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Profile title */}
        <div className="text-center w-full bg-orange-100 lg:bg-orange-50 pt-20">
          <h2 className="text-3xl font-medium">
            | {finnish ? 'Profiili' : 'Profile'} |
          </h2>
          <p className="mt-2 "></p>{' '}
          {finnish
            ? 'Tarkista tiedot ja muokkaa halutessa!'
            : 'Check and change your info!'}
        </div>

        <div className=" lg:p-20 lg:pt-20 pb-30 bg-orange-100">
          <div className="p-5 bg-orange-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* User profile */}
              <div className="col-span-1">
                <div className="flex items-center gap-4 pb-2 border-b">
                  <button onClick={() => setDisplayAvatarModal(true)}>
                    <img
                      src={
                        user
                          ? userImages + user.image
                          : userImages + 'placeholder.jpg'
                      }
                      alt="User profile"
                      className="rounded-full "
                    />
                  </button>

                  <h2 className="text-lg font-medium">
                    {finnish ? 'Käyttäjäprofiili' : 'User profile'}
                  </h2>
                </div>

                {user ? (
                  <div>
                    <p className="pt-3">
                      {finnish ? 'Nimi:' : 'Name:'} {user.username}
                    </p>
                    <p className="pt-1">
                      {finnish ? 'Sähköposti:' : 'Email:'} {user.email}
                    </p>
                    <p className="pt-1">
                      {finnish ? 'Käyttäjän ID:' : 'User ID:'} {user.id}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-7xl mx-auto text-center pt-20">
                    <h2 className="text-2xl font-medium">
                      {finnish ? 'Ladataan profiilia...' : 'Loading profile...'}
                    </h2>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-5">
                  <button
                    className="mt-4 text-sm text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none"
                    onClick={() => setDisplayEditModal(true)}
                  >
                    {finnish ? 'Muokkaa profiilia' : 'Edit profile'}
                  </button>
                  <button
                    className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md px-4 py-2.5 shadow focus:outline-none"
                    onClick={() => handleAskDeleteUser()}
                  >
                    {finnish ? 'Poista tili' : 'Delete your account'}
                  </button>
                </div>
              </div>

              {/* Purchase history */}
              <div className="col-span-2 flex flex-col  border-l pl-4">
                <div className="flex items-center gap-4 pb-4 border-b mt-3">
                  <h2 className="text-2xl font-medium">
                    {finnish ? 'Ostoshistoria' : 'Purchase history'}
                  </h2>
                </div>
                <div className="overflow-y-auto h-64 border">
                  <table className="min-w-full table-auto">
                    <thead></thead>

                    <ShoppingHistory />
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

        {displayAlertDeleteModal && (
          <AlertDeletionModal
            isOpen={displayAlertDeleteModal}
            onClose={() => setDisplayAlertDeleteModal(false)}
            message={message}
          />
        )}
      </div>
    </>
  );
};

/*
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

                    */

export default Profile;
