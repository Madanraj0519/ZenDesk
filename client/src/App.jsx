import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components
import AdminPrivateRoute from './features/AdminPrivateRoute';
import EmployeePrivateRoute from './features/EmployeePrivateRoute';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import AdminBoard from './pages/AdminBoard';
import AdminProfile from './pages/AdminProfile';
import AdminTicketList from './pages/AdminTicketList';
import CreateTicketPage from './pages/CreateTicketPage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import EmployeeTicketList from './pages/EmployeeTicketList';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path='/admin-login' element={<AdminLogin />} />
         <Route path='/employee-login' element={<EmployeeLogin />} />
         <Route path='/create-ticket' element={<CreateTicketPage />} />
         <Route path='/verify-email' element={<VerifyEmail />} />

         <Route element={<AdminPrivateRoute />}>
            <Route path='/dashboard/admin' element={<AdminBoard />} />
            <Route path='/dashboard/admin/profile' element={<AdminProfile />} />
            <Route path='/dashboard/admin/ticket' element={<AdminTicketList />} />
         </Route>

         <Route element={<EmployeePrivateRoute />}>
            <Route path='/dashboard/employee/profile' element={<EmployeeProfilePage />} />
            <Route path='/dashboard/employee/ticket' element={<EmployeeTicketList />} />
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