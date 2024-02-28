import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import AdminBoard from './pages/AdminBoard';
import AdminProfile from './pages/AdminProfile';

// components
import AdminPrivateRoute from './features/AdminPrivateRoute';
import EmailVerify from './components/register/EmailVerify';



const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path='/verify-email' element={<VerifyEmail />} />

         <Route element={<AdminPrivateRoute />}>
            <Route path='/dashboard/admin' element={<AdminBoard />} />
            <Route path='/dashboard/admin/profile' element={<AdminProfile />} />
         </Route>

         {/* <Route path='/email-verification' element={<EmailVerify />} /> */}
       </Routes>
    </BrowserRouter>
  )
}

export default App