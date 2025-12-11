import {useLanguageContext} from '../hooks/contextHooks.js';

const AlertModal = ({isOpen, onClose, message}) => {
  if (!isOpen) {
    return null;
  }

  const {finnish} = useLanguageContext();

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
              <h2 className="text-lg font-semibold pt-4 absolute left-1/2 transform -translate-x-1/2">
                {finnish ? 'Huomio!' : 'Attention!'}
              </h2>

              <button
                type="button"
                className="cursor-pointer text-black font-semibold bg-transparent hover:bg-gray-200 hover:text-black rounded-md text-sm w-9 h-9 ml-auto inline-flex justify-center items-center"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            <p className="mt-4">{message}</p>
            <button
              onClick={onClose}
              className="cursor-pointer w-full mt-5 text-black bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-indigo-400 font-medium rounded-md text-sm px-4 py-2.5 shadow focus:outline-none"
            >
              {finnish ? 'Ymmärrän' : 'I understand'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;
