import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';

//Layouts
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

//import Upload from './views/Upload';
import Upload from './views/customer/Upload.jsx';
//import Single from './views/Single';
import Login from './views/customer/Login.jsx';
import {UserProvider} from './contexts/UserContext';
//import Logout from './views/Logout.jsx';
import Logout from './views/customer/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
//import Register from './views/Register.jsx';

//Pages
//All users
import Contacts from './views/customer/Contacts.jsx';
import Home from './views/customer/Home.jsx';

import ShoppingCart from './views/customer/ShoppingCart.jsx';
import Weeklist from './views/customer/Weeklist.jsx';
import Giftcards from './views/customer/Giftcards.jsx';

//Logged in users
import Profile from './views/customer/Profile.jsx';

//Admin
import Dashboard from './views/admin/Dashboard.jsx';
import Meals from './views/admin/Meals/Meals.jsx';
import AddMeal from './views/admin/Meals/AddMeal.jsx';





const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />


            {/*<Route path="/single" element={<Single />} />*/}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/weeklist" element={<Weeklist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/giftcards" element={<Giftcards />} />

            {/* Login required routes below! */}
            {/* An example of protectedroute based on course assignments */}
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  {' '}
                  <Upload />{' '}
                </ProtectedRoute>
              }
            />
          </Route>
          

          {/* Admin routes - TODO: protect the routes */}
          {/* example path: /admin/addmeal */}
          <Route
            path="/admin"
            element={
                <AdminLayout />
                
            }>
            <Route index element={<Dashboard />} />
            <Route path="meals" element={<Meals />} />
            <Route path="addmeal" element={<AddMeal />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>

    
  );


};

export default App;
