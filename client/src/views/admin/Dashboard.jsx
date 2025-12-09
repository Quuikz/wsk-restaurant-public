

const Dashboard = () => {

    return (
        <>
        
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your restaurant data from here.</p>

      {/* Simple Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Meals</h2>
          <p className="text-3xl font-bold">42</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Active Gift Cards</h2>
          <p className="text-3xl font-bold">17</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
          <p className="text-3xl font-bold">6</p>
        </div>

      </div>
    </div>
    </>
  );
}

export default Dashboard;