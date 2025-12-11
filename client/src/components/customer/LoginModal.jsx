import React, {useState} from 'react';
import useForm from '../../hooks/formHooks.js';
import {useLanguageContext, useUserContext} from '../../hooks/contextHooks.js';
import {useAuthentication} from '../../hooks/common/apiHooks.js';

/**
 * LoginModal Component
 *
 * Modal dialog for user authentication. Provides a login form with username and password fields,
 * handles form submission, and manages user authentication state.
 * Includes a link to open the registration modal for new users.
 * Features bilingual support (Finnish/English) and responsive design.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Function} props.onOpenRegister - Callback function to open the registration modal
 * @returns {React.ReactElement|null} Modal component or null if not open
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * return (
 *   <LoginModal
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     onOpenRegister={() => openRegisterModal()}
 *   />
 * )
 */
const LoginModal = ({isOpen, onClose, onOpenRegister}) => {
  if (!isOpen) {
    return null;
  }

  const {postLogin} = useAuthentication();
  const {handleLogin} = useUserContext();
  const {finnish} = useLanguageContext();

  /**
   * Initial form values for the login form.
   * Contains empty strings for username and password fields.
   *
   * @type {Object}
   * @property {string} username - Username field initial value
   * @property {string} password - Password field initial value
   */
  const initValues = {
    username: '',
    password: '',
  };

  /**
   * Handles the login process when the form is submitted.
   * Validates credentials, updates user context, and closes the modal on success.
   * Logs errors to console if authentication fails.
   *
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Logs error message if login fails
   *
   * @example
   * await doLogin();
   * // Authenticates user and closes modal
   */
  const doLogin = async () => {
    try {
      handleLogin(inputs);
      onClose();
    } catch (error) {
      console.log('Error in doLogin: ', error.message);
    }
  };

  /**
   * Custom form hook managing form state and submission.
   * Provides input values, change handler, and submit handler.
   *
   * @type {Object}
   * @property {Object} inputs - Current form input values
   * @property {string} inputs.username - Current username value
   * @property {string} inputs.password - Current password value
   * @property {Function} handleInputChange - Handler for input field changes
   * @property {Function} handleSubmit - Handler for form submission
   */
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div
        id="login-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray/20 backdrop-blur-sm p-4"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
          {/* Modal content */}
          {/* Padding 4(1rem) or for md (for screens 768px>>) 1.5rem */}
          <div className="relative bg-neutral-primary-soft border-3 border-black rounded-2xl shadow-sm p-4 md:p-6 text-center text-black">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-semibold pt-4 absolute left-1/2 transform -translate-x-1/2">
                {finnish ? 'Kirjaudu sisään' : 'Login'}
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
              ✅{' '}
              {finnish
                ? 'Tietosi ovat turvassa.'
                : 'Your information is secure.'}
            </p>
            <form onSubmit={handleSubmit} className="pt-4 md:pt-10">
              {/* Modal body - username */}
              <div className="mb-5">
                <label
                  htmlFor="loginuser"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Käyttäjätunnus' : 'Username'}
                </label>
                <input
                  name="username"
                  type="text"
                  id="loginuser"
                  onChange={handleInputChange}
                  autoComplete="username"
                  value={inputs.username}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>
              {/* Modal body - password */}
              <div className="mb-10">
                <label
                  htmlFor="loginpassword"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Salasana' : 'Password'}
                </label>
                <input
                  name="password"
                  type="password"
                  id="loginpassword"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  value={inputs.password}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full mb-5 text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md text-sm px-4 py-2.5 shadow focus:outline-none"
              >
                {finnish ? 'Kirjaudu' : 'Login'}
              </button>
            </form>

            <div className="text-center">
              <h2 className="text-lg font-medium">
                | {finnish ? 'Oletko uusi asiakas?' : 'Are you a new customer?'}{' '}
                |
              </h2>
              <button
                type="button"
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium px-1 py-0.5 focus:outline-none"
                onClick={onOpenRegister}
              >
                {finnish ? 'Luo uusi tili' : 'Create new account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
