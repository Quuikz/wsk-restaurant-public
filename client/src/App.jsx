

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login.jsx';
import {UserProvider} from './contexts/UserContext';
import Logout from './views/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
//import Register from './views/Register.jsx';

const App = () => {
  return (
     <BrowserRouter basename={import.meta.env.BASE_URL}>
       <UserProvider>
        <Routes>
         <Route element={<Layout />}>
           <Route path="/" element={<Home />} />

           <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>}/>
           <Route path="/upload" element={<ProtectedRoute> <Upload /> </ProtectedRoute>} />
           <Route path="/single" element={<Single />} />
           <Route path="/login" element={<Login />}/>
           <Route path="/logout" element={<Logout />} /> 
         </Route>
       </Routes>
       </UserProvider>
     </BrowserRouter>
   );
    
};

export default App;