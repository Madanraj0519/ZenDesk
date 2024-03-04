import React from "react";
import {useDispatch, useSelector,} from "react-redux"
import logo from "../images/zen-logo.png";
import { FaBarsProgress } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { IoLogInOutline } from "react-icons/io5";
import { signOut } from "../redux/auth/userSlice";
import { employeeSignOut } from "../redux/auth/employeeSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardHeader({ showSidebar, handleToggleSidebar }) {

  const dispatch = useDispatch();
  const { currentUser} = useSelector((state) => state.user);
  const {currentEmployee} = useSelector((state) => state.employee);

  const handleUserSignOut = async() => {
    try{
      await fetch('/api/auth/signout');
      dispatch(signOut());
      toast.warning("Singed out")
    }catch(err){
      toast.error(err.message);
    }
  };

  const handleEmployeeSignOut = async() => {
    try{
      await fetch('/api/employee/employee-signout');
      dispatch(employeeSignOut());
      toast.warning("Singed out")
    }catch(err){
      toast.error(err.message);
    }
  };

  return (
    <header className="flex justify-between items-center fixed w-full px-4 py-2  bg-green-700  h-16">
      <div className="flex items-center">
      <div className="cursor-pointer mr-4"  onClick={handleToggleSidebar}>
          {showSidebar ? (
            <FiX className="text-white h-7 w-7 cursor-pointer" />
          ) : (
            <FaBarsProgress className="text-white h-7 w-7 cursor-pointer" />
          )}
      </div>
        <img
            src={logo}
            alt="Gym logo"
            className="mr-0 -ml-4 h-8 lg:h-10 lg:mr-6 hidden md:block"
        />
      </div>

      {
        currentUser ? (
          <div className="text-4xl text-zinc-100 cursor-pointer" onClick={handleUserSignOut}>
            <IoLogInOutline />
          </div>
        ) : (
          <div className="text-4xl text-zinc-100 cursor-pointer" onClick={handleEmployeeSignOut}>
            <IoLogInOutline />
          </div>
        )
      }
      
    </header>
  );
}

export default DashboardHeader;