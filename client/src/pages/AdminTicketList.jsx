import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../features/DashboardHeader";
import DashboardSidebar from "../features/DashboardSidebar";
import EmployeeList from "../components/admin/EmployeeList";
import TicketList from "../components/admin/TicketList";

function AdminBoard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader
      showSidebar={showSidebar}
      handleToggleSidebar={handleToggleSidebar}
       />
    {showSidebar && (
      <div className="fixed top-0 left-0 h-screen mt-16  text-white z-50">
        <DashboardSidebar handleToggleSidebar={handleToggleSidebar} />
      </div>
    )}
    <div
      className={
        showSidebar
          ? "fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-40"
          : ""
      }
      onClick={handleCloseSidebar}
    ></div>
    <div className={showSidebar ? "filter blur-sm" : ""}>
      <div className="flex flex-col justify-center items-center bg-slate-200  w-full">
        <TicketList />
      </div>
    </div>
  </div>
  );
}

export default AdminBoard;