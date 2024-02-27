import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../images/zen-logo.png";

function DashboardHeader({ showSidebar, handleToggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="flex justify-between items-center px-4 py-2  bg-green-800  h-16">
      <div className="flex items-center">
      <div className="cursor-pointer mr-4 md:hidden" onClick={handleToggleSidebar}>
          {!showSidebar ? (
            <FiX className="text-white h-7 w-7" />
          ) : (
            <FiMenu className="text-white h-7 w-7" />
          )}
        </div>
        <img
            src={logo}
            alt="Gym logo"
            className="mr-0 ml-0 h-8 lg:h-14 lg:mr-6 hidden md:block"
        />
      </div>
      <div className="border-2 rounded-full m-2 p-4 ">
       <h1>User</h1>
      </div>
    </header>
  );
}

export default DashboardHeader;