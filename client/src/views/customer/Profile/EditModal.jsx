import React from 'react';
import useForm from '../../../hooks/formHooks.js';
import {useUser} from '../../../hooks/BackupOfOldAssignments/apiHooks.js';
import {useAuthentication} from '../../../hooks/apiHooks.js';

const EditModal = ({isOpen, onClose, onOpenAvatar}) => {
  if (!isOpen) {
    return null;
  }

  //const { postLogin } = useAuthentication();
  const {postRegister} = useAuthentication();

  const initValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const doRegister = async () => {
    //Do bunch of logic like pw matching, empty inputs and such.
    try {
      const result = await postRegister(inputs);

      console.log(result);
    } catch (error) {
      console.log('Error in doRegister', error);
    }
  };

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
                Muokkaa profiilia
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
            <p>✅ Tietosi ovat turvassa.</p>
            <form onSubmit={handleSubmit} className="pt-4 md:pt-10">
              {/* Modal body - username */}
              <div className="mb-5">
                <label
                  htmlFor="registeruser"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Käyttäjätunnus
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
                  Sähköposti
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
                  Salasana
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
                  Vahvista salasana
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
                Muokkaa
              </button>
            </form>

            <div className="text-center">
              <h2 className="text-lg font-medium">
                | Haluatko vaihtaa profiilikuvaa? |
              </h2>
              <button
                type="button"
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium px-1 py-0.5 focus:outline-none"
                onClick={onOpenAvatar}
              >
                Vaihda profiilikuvaa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
