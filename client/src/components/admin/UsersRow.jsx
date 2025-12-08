

const UsersRow = ({user}) => {

    return (

    <li className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">

    {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{user.id}</p>
      <p className="text-lg font-semibold text-gray-900">{user.username}</p>
      <p className="text-lg font-semibold text-gray-900">{user.role}</p>
      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
      <p className="text-lg font-semibold text-gray-900">{user.deleted ? 'Active' : 'Inactive'}</p>
    </li>

  );

}

export default UsersRow;