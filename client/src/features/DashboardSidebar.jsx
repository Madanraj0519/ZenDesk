import { Link } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { GiMoneyStack } from "react-icons/gi";
import logo from "../images/zen-logo.png";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { VscCloseAll } from "react-icons/vsc";

function DashboardSidebar({handleToggleSidebar}) {

  const { currentUser } = useSelector((state) => state.user);

  const Admin = currentUser ? [
    {
      Name: "Employee List",
      links: "/dashboard/admin",
      child: (
        <>
          <GiMoneyStack />
        </>
      ),
    },
    {
      Name: "Ticket",
      links: "/dashboard/admin/ticket",
      child: (
        <>
          <FaCalendarAlt />
        </>
      ),
    },
    {
      Name: "Admin Profile",
      links: "/dashboard/admin/profile",
      child: (
        <>
          <FaUser />
        </>
      ),
    },
  ]
   : 
  [
    {
      Name: "Tickets",
      links: "/dashboard/employee/ticket",
      child: (
        <>
          <GiMoneyStack />
        </>
      ),
    },
    {
      Name: "Employee Profile",
      links: "/dashboard/employee/profile",
      child: (
        <>
          <FaUser />
        </>
      ),
    },
  ] 

  return (
    <div class="fixed left-0 top-0 w-60 h-full bg-green-700 p-4 z-50 sidebar-menu transition-transform">
    <div class="flex items-center pb-4 border-b border-b-gray-800">
        <img src={logo} alt="" class="w-8 h-8 rounded object-cover"/>
        <span class="text-xl font-bold text-white lowercase mt-1 ml-1">en Desk</span>
        <div className="ml-16 text-4xl cursor-pointer " onClick={handleToggleSidebar} ><VscCloseAll /></div>
    </div>
    <ul class="mt-4">
        {
            Admin?.map((admins, i) => (
            <li class="mb-1 group" onClick={handleToggleSidebar}>
            <Link to={admins?.links} 
            key={i} class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                <div class="mr-3 text-lg">{admins?.child}</div>
                <span class="text-base">{admins?.Name}</span>
            </Link>
            </li>
            ))
        }
    </ul>
 </div>
  );
}

export default DashboardSidebar;