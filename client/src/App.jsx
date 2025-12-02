import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';
import Layout from './components/Layout.jsx';

import Upload from './views/Upload';
//import Single from './views/Single';
import Login from './views/Login.jsx';
import {UserProvider} from './contexts/UserContext';
import Logout from './views/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
//import Register from './views/Register.jsx';

//Pages
import Contacts from './views/Contacts.jsx';
import Home from './views/Home';
import Profile from './views/Profile';
import ShoppingCart from './views/ShoppingCart.jsx';
import ShoppingCartModel from './views/ShoppingCartModel.jsx';
import ShoppingCart4 from './views/ShoppingCart4.jsx';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* Profile not protected */}
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  {' '}
                  <Upload />{' '}
                </ProtectedRoute>
              }
            />
            {/*<Route path="/single" element={<Single />} />*/}
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
            <Route path='/shoppingcart4' element={<ShoppingCart4 />} />
            <Route path='/shoppingcartmodel' element={<ShoppingCartModel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
