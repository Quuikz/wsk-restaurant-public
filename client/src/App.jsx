import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';

//Layouts
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

//Contexts
import {UserProvider} from './contexts/UserContext';
import {CartProvider} from './contexts/ShoppingCartContext.jsx';
import {LanguageProvider} from "./contexts/LanguageContext.jsx";

//Route Protections
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';

//Pages
//All users
import Home from './views/customer/Home.jsx';
import Weeklist from './views/customer/Weeklist.jsx';
import Giftcards from './views/customer/Giftcards.jsx';
import Contacts from './views/customer/Contacts.jsx';

//Logged in users
import Profile from './views/customer/Profile.jsx';
import ShoppingCart from './views/customer/ShoppingCart.jsx';

//Admin
import Dashboard from './views/admin/Dashboard.jsx';
import Meals from './views/admin/Meals/Meals.jsx';
import AddMeal from './views/admin/Meals/AddMeal.jsx';
import Menus from './views/admin/Menus/Menus.jsx';
import Orders from './views/admin/Orders/Orders.jsx';
import GiftcardsAdmin from './views/admin/Giftcards/Giftcards.jsx';
import ReservationsAdmin from './views/admin/Reservations/Reservations.jsx';
import AddMenu from './views/admin/Menus/AddMenu.jsx';
import UsersAdminView from './views/admin/User/Users.jsx';
import DiscountsAdmin from './views/admin/Discounts/Discounts.jsx';


const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <CartProvider>
          <LanguageProvider>

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="/contacts" element={<Contacts />} />
              <Route path="/weeklist" element={<Weeklist />} />
              <Route path="/giftcards" element={<Giftcards />} />


              {/* Login required routes below! */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    {' '}
                    <Profile />{' '}
                  </ProtectedRoute>
                }
              />

                <Route
                path="/shoppingcart"
                element={
                  <ProtectedRoute>
                    {' '}
                    <ShoppingCart />{' '}
                  </ProtectedRoute>
                }
              />
            </Route>

            

            {/* Admin routes - TODO: protect the routes */}
            {/* example path: /admin/addmeal */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="meals" element={<Meals />} />
              <Route path="addmeal" element={<AddMeal />} />

              <Route path="menus" element={<Menus />} />
              <Route path="addmenus" element={<AddMenu />} />
              <Route path="orders" element={<Orders />} />
              <Route path="giftcards" element={<GiftcardsAdmin />} />
              <Route path="reservations" element={<ReservationsAdmin />} />
              <Route path="discounts" element={<DiscountsAdmin />} />
              <Route path="users" element={<UsersAdminView />} />
            </Route>
          </Routes>

          </LanguageProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
