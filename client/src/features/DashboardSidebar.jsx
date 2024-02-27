import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaAddressCard,
  FaCalendarAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import logo from "../images/zen-logo.png";

function DashboardSidebar() {
  const navigate = useNavigate();

  const Admin = [
    {
      Name: "Register User",
      links: "/dashboard/admin/profile",
      child: (
        <>
          <FaUser />
        </>
      ),
    },
    {
      Name: "Fees Details",
      links: "/admin/fees-details",
      child: (
        <>
          <GiMoneyStack />
        </>
      ),
    },
    {
      Name: "Attendance",
      links: "/admin/get/attendance",
      child: (
        <>
          <FaCalendarAlt />
        </>
      ),
    },
    {
      Name: "Clients",
      links: "/admin/all/clients",
      child: (
        <>
          <TiGroup />
        </>
      ),
    },
   
  ];

  return (
    <section className="flex w-full">
      <div className="bg-green-400 min-h-screen duration-500 text-gray-100 px-4 flex flex-col items-center">
        <div className="flex justify-center items-start h-full w-24">
          <div className="flex flex-col gap-6 lg:gap-7 relative mt-5 w-full">
            {Admin?.map((admins, i) => (
             <div className="">
                 <Link
                to={admins?.links}
                className="group flex justify-center items-center text-sm gap-3.5 font-medium p-2 hover:bg-white hover:text-orange-400 rounded-md scale-110 duration-200"
                key={i}
              >
                <div className="text-3xl  flex items-center justify-center w-full">{admins?.child}</div>
              </Link>
             </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardSidebar;