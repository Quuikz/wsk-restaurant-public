import React, {useState} from 'react';
import {
  useLanguageContext,
  useUserContext,
} from '../../../hooks/contextHooks.js';
import {useCurrentUser} from '../../../hooks/common/apiHooks.js';

/**
 * AvatarModal component - Modal dialog for changing user profile picture.
 *
 * Features:
 * - File input for selecting a new profile picture
 * - Real-time image preview
 * - Submit form to upload the new avatar
 * - Link to edit full profile
 * - Bilingual support (Finnish/English)
 * - Security notice displayed to users
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Function} props.onOpenEdit - Callback function to open profile edit modal
 * @returns {React.ReactElement|null} The rendered modal component, or null if not open
 */
const AvatarModal = ({isOpen, onClose, onOpenEdit}) => {
  if (!isOpen) {
    return null;
  }

  const [file, setFile] = useState(null);
  const {user, setUser} = useUserContext();
  const {finnish} = useLanguageContext();
  const {modifyUserAvatar} = useCurrentUser();

  /**
   * Handles the avatar modification API call.
   * Retrieves authentication token from localStorage, uploads the file,
   * and updates the user context with the response if successful.
   *
   * @async
   * @function doModifyUserAvatar
   * @returns {Promise<void>}
   * @throws {Error} Logs error to console if upload fails
   */
  const doModifyUserAvatar = async () => {
    const token = localStorage.getItem('token');

    try {
      const result = await modifyUserAvatar(file, token);
      console.log(result);
      if (result) {
        setUser(result);
      }
    } catch (error) {
      console.log('Error in doModifyUserAvatar', error);
    }
  };

  /**
   * Handles file input change event.
   * Updates the file state with the first selected file.
   *
   * @function handleFileChange
   * @param {Event} e - The change event from file input
   * @returns {void}
   */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /**
   * Handles form submission.
   * Prevents default form behavior and calls the modify avatar function.
   *
   * @function handleSubmit
   * @param {Event} e - The submit event
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    doModifyUserAvatar();
  };

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
                {finnish ? 'Vaihda profiilikuva' : 'Change profile picture'}
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
              {/* Modal body - profile picture */}
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.image ||
                      'https://placehold.co/200?text=' +
                        (finnish ? 'Valitse+kuva' : 'Select+picture')
                }
                alt="preview"
                className="w-30 h-30 object-cover rounded-full mb-2 mx-auto"
              />
              <div className="mb-5">
                <label
                  htmlFor="file"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  {finnish ? 'Valitse uusi kuva' : 'Select new picture'}
                </label>
                <input
                  name="profilePicture"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="rounded-lg bg-neutral-secondary-medium border border-2 text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full mb-3  bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md text-sm px-4 py-2.5 shadow focus:outline-none"
              >
                {finnish ? 'Vaihda kuva' : 'Change picture'}
              </button>
            </form>

            <div className="text-center">
              <h2 className="text-lg font-medium">
                |{' '}
                {finnish
                  ? 'Haluatko muokata profiilia?'
                  : 'Want to change profile?'}{' '}
                |
              </h2>
              <button
                type="button"
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium px-1 py-0.5 focus:outline-none"
                onClick={onOpenEdit}
              >
                {finnish ? 'Muokkaa profiilia' : 'Edit profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarModal;
