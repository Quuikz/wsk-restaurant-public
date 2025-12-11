import {useLanguageContext} from '../../../hooks/contextHooks';

/**
 * Modal component for admin pages to confirm deletion actions in the admin panel.
 */
const AdminDeletionModal = ({isOpen, onClose, message, onConfirm}) => {
  //Determines the language for texts.
  const {finnish} = useLanguageContext();

  // Prevents render if the modal is closed.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">
            {finnish ? 'Vahvistus' : 'Confirmation'}
          </h2>
          <p className="mb-6">{message}</p>

          <div className="flex justify-between gap-2">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {finnish ? 'Poista' : 'Delete'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              {finnish ? 'Peruuta' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeletionModal;
