import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
// Pages
import Home from './pages/Home';
import Register from './pages/Register';

// components
import EmailVerify from './components/register/EmailVerify';


const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/register' element={<Register />} />
         <Route path='/email-verification' element={<EmailVerify />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App