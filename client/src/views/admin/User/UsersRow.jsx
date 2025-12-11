

const UsersRow = ({user, onModify}) => {

    return (

    <li className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">

    {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{user.id}</p>
      <p className="text-lg font-semibold text-gray-900">{user.username}</p>
      <p className="text-lg font-semibold text-gray-900">{user.role}</p>
      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
      <p className="text-lg font-semibold text-gray-900">{user.deleted ? 'Inactive' : 'Active'}</p>

      <button
          onClick={onModify}
          className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
        >Action
      </button>
    </li>

  );

}

export default UsersRow;