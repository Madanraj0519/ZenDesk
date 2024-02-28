import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
       </Routes>
       <ToastContainer
          position="top-right"
          autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="colored"
           transition: Bounce />
           
    </BrowserRouter>
  )
}

export default App