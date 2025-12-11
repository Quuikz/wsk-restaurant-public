import React from 'react';
import useForm from '../../hooks/formHooks';
import {useAuthentication} from '../../hooks/common/apiHooks.js';
import {useLanguageContext} from '../../hooks/contextHooks.js';

/**
 * RegisterModal Component
 *
 * Modal dialog for user registration. Provides a registration form with username, email,
 * password, and password confirmation fields. Handles form submission and user account creation.
 * Includes a link to open the login modal for existing users.
 * Features bilingual support (Finnish/English) and responsive design.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Function} props.onOpenLogin - Callback function to open the login modal
 * @returns {React.ReactElement|null} Modal component or null if not open
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * return (
 *   <RegisterModal
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     onOpenLogin={() => openLoginModal()}
 *   />
 * )
 */

const RegisterModal = ({isOpen, onClose, onOpenLogin}) => {
  if (!isOpen) {
    return null;
  }

  const {postRegister} = useAuthentication();
  const {finnish} = useLanguageContext();

  /**
   * Initial form values for the registration form.
   * Contains empty strings for all required fields.
   *
   * @type {Object}
   * @property {string} username - Username field initial value
   * @property {string} email - Email field initial value
   * @property {string} password - Password field initial value
   * @property {string} confirmPassword - Password confirmation field initial value
   */
  const initValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  /**
   * Handles the registration process when the form is submitted.
   *
   * TODO: Implement validation logic:
   * - Verify password and confirmPassword match
   * - Check for empty input fields
   * - Validate email format
   * - Enforce password strength requirements
   *
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Logs error message if registration fails
   *
   * @example
   * await doRegister();
   * // Creates new user account and logs result
   */
  const doRegister = async () => {
    try {
      const result = await postRegister(inputs);

      console.log(result);
    } catch (error) {
      console.log('Error in doRegister', error);
    }
  };

  /**
   * Custom form hook managing form state and submission.
   * Provides input values, change handler, and submit handler.
   *
   * @type {Object}
   * @property {Object} inputs - Current form input values
   * @property {string} inputs.username - Current username value
   * @property {string} inputs.email - Current email value
   * @property {string} inputs.password - Current password value
   * @property {string} inputs.confirmPassword - Current password confirmation value
   * @property {Function} handleInputChange - Handler for input field changes
   * @property {Function} handleSubmit - Handler for form submission
   */
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <div
        id="register-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray/20 backdrop-blur-sm p-4"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
          {/* Modal content */}
          {/* Padding 4(1rem) or for md (for screens 768px>>) 1.5rem */}
          <div className="relative bg-neutral-primary-soft border-3 border-black rounded-2xl shadow-sm p-4 md:p-6 text-center text-black">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b pb-4 ">
              <h3 className="text-lg font-semibold pt-4 absolute left-1/2 transform -translate-x-1/2">
                {finnish ? 'Rekisteröidy' : 'Register'}
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
                : 'Your infromation is secure.'}
            </p>
            <form onSubmit={handleSubmit} className="pt-4 md:pt-10">
              {/* Modal body - username */}
              <div className="mb-5">
                <label
                  htmlFor="registeruser"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Käyttäjätunnus' : 'Username'}
                </label>
                <input
                  name="username"
                  type="text"
                  id="registeruser"
                  onChange={handleInputChange}
                  autoComplete="username"
                  value={inputs.username}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>

              {/* Modal body - email */}
              <div className="mb-5">
                <label
                  htmlFor="registeremail"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Sähköposti' : 'Email'}
                </label>
                <input
                  name="email"
                  type="email"
                  id="registeremail"
                  onChange={handleInputChange}
                  autoComplete="email"
                  value={inputs.email}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>

              {/* Modal body - password */}
              <div className="mb-5">
                <label
                  htmlFor="registerpassword"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Salasana' : 'Password'}
                </label>
                <input
                  name="password"
                  type="password"
                  id="registerpassword"
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  value={inputs.password}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Vahvista Salasana' : 'Confirm Password'}
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  id="confirmpassword"
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  value={inputs.confirmPassword}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full mb-3  bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md text-sm px-4 py-2.5 shadow focus:outline-none"
              >
                {finnish ? 'Rekisteröidy' : 'Register'}
              </button>
            </form>

            <div className="text-center">
              <h2 className="text-lg font-medium">
                |{' '}
                {finnish ? 'Onko sinulla jo tili?' : 'Already have an account?'}{' '}
                |
              </h2>
              <button
                type="button"
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium px-1 py-0.5 focus:outline-none"
                onClick={onOpenLogin}
              >
                {finnish ? 'Kirjaudu tililläsi' : 'Login with your account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
