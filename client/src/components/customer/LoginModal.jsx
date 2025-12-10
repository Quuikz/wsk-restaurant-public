import React, {useState} from 'react';
import useForm from '../../hooks/formHooks.js';
import {useLanguageContext, useUserContext} from '../../hooks/contextHooks.js';
import { useAuthentication } from '../../hooks/apiHooks.js';


const LoginModal = ({isOpen, onClose, onOpenRegister}) => {
  if (!isOpen){
    return null;
  }

  const { postLogin } = useAuthentication();
  const {handleLogin} = useUserContext();
  const {finnish} = useLanguageContext();

  const initValues = {
    username: '',
    password: '',
  };



  const doLogin = async () => {
    try {
        //const response = await postLogin(inputs);
        //handleLogin(response);
        handleLogin(inputs);
        onClose();
    } catch (error) {
      console.log('Error in doLogin: ', error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    /*
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-full relative">
        <h2 className="text-lg font-semibold text-white mb-4">Kirjaudu sisään</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Sähköposti"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Salasana"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded"
          >
            Kirjaudu
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
    */

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
            <p>✅ {finnish ? 'Tietosi ovat turvassa.' : 'Your information is secure.'}</p>
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
              <h2 className="text-lg font-medium">| {finnish ? 'Oletko uusi asiakas?' : 'Are you a new customer?'} |</h2>
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
