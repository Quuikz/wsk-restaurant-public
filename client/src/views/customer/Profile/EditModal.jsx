import React from 'react';
import useForm from '../../../hooks/formHooks.js';
import {useCurrentUser, useUser} from '../../../hooks/common/apiHooks.js';
import {
  useLanguageContext,
  useUserContext,
} from '../../../hooks/contextHooks.js';
import {useNavigate} from 'react-router';

/**
 * EditModal component - A modal dialog for editing user profile information
 * Allows users to modify their username and email. After successful modification,
 * the user is logged out and must sign in again with updated credentials.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls whether the modal is visible
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Function} props.onOpenAvatar - Callback function to open the avatar change modal
 * @returns {JSX.Element|null} Modal dialog for editing user info, or null if not open or no user
 */
const EditModal = ({isOpen, onClose, onOpenAvatar}) => {
  const {user, setUser} = useUserContext();
  const {finnish} = useLanguageContext();
  const {modifyUserInfo} = useCurrentUser();
  const {isUsernameTaken} = useUser();
  const navigate = useNavigate();

  if (!isOpen || !user) {
    return null;
  }

  /**
   * Handles the user information modification process
   * Validates username availability, updates user info, and logs out the user
   *
   * @async
   * @function doModifyUserInfo
   * @returns {Promise<void>}
   * @throws {Error} If modification fails or username is already taken
   */
  const doModifyUserInfo = async () => {
    const token = localStorage.getItem('token');
    try {
      //see if username is taken
      const taken = await isUsernameTaken(inputs.username);
      if (taken === false) {
        const result = await modifyUserInfo(inputs, token);
        console.log(result);

        if (result) {
          setUser(result);
          localStorage.removeItem('token');
          setUser(null);
          navigate('/');
        } else {
          console.log('Error: User not modified.');
          alert('Error: User not modified.');
        }
      } else {
        console.log('This username is already taken.');
        alert('This username is already taken.');
      }
    } catch (error) {
      console.log('Error in doRegister: ', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doModifyUserInfo, {
    username: user.username,
    email: user.email,
  });

  return (
    <>
      <div
        id="userinfomodify-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray/20 backdrop-blur-sm p-4"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
          {/* Modal content */}
          {/* Padding 4(1rem) or for md (for screens 768px>>) 1.5rem */}
          <div className="relative bg-neutral-primary-soft border-3 border-black rounded-2xl shadow-sm p-4 md:p-6 text-center text-black">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b pb-4 ">
              <h3 className="text-lg font-semibold pt-4 absolute left-1/2 transform -translate-x-1/2">
                {finnish ? 'Muokkaa Profiilia' : 'Edit Profile'}
              </h3>
              <button
                type="button"
                className="cursor-pointer text-black font-semibold bg-transparent hover:bg-gray-200 hover:text-black rounded-md text-sm w-9 h-9 ml-auto inline-flex justify-center items-center"
                onClick={onClose}
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <p>
              ❗
              {finnish
                ? 'Tietojen muokkauksen jälkeen sinun pitää kirjautua uudelleen.'
                : 'You must login again after changing your information.'}
            </p>
            <form onSubmit={handleSubmit} className="pt-4 md:pt-10">
              {/* Modal body - username */}
              <div className="mb-5">
                <label
                  htmlFor="registeruser"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Muokkaa käyttäjätunnusta' : 'Edit username'}
                </label>
                <input
                  name="username"
                  type="text"
                  id="registeruser"
                  onChange={handleInputChange}
                  autoComplete="username"
                  value={inputs.username}
                  className="rounded-lg bg-neutral-secondary-medium border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>

              {/* Modal body - email */}
              <div className="mb-5">
                <label
                  htmlFor="registeremail"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Muokkaa sähköpostia' : 'Edit email'}
                </label>
                <input
                  name="email"
                  type="email"
                  id="registeremail"
                  onChange={handleInputChange}
                  autoComplete="email"
                  value={inputs.email}
                  className="rounded-lg bg-neutral-secondary-medium border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full mb-3  bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md text-sm px-4 py-2.5 shadow focus:outline-none"
              >
                {finnish ? 'Muokkaa' : 'Edit'}
              </button>
            </form>

            <div className="text-center">
              <h2 className="text-lg font-medium">
                |{' '}
                {finnish
                  ? 'Haluatko vaihtaa profiilikuvan?'
                  : 'Want to change profile picture?'}{' '}
                |
              </h2>
              <button
                type="button"
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium px-1 py-0.5 focus:outline-none"
                onClick={onOpenAvatar}
              >
                {finnish ? 'Vaihda profiilikuva' : 'Change profile picture'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
