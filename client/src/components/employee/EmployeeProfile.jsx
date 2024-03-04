import React, {useState} from 'react'
import {useDispatch, useSelector,} from "react-redux";
import {Navigate, useNavigate, Link} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEmployeeStart, updateEmployeeSuccess, 
         updateEmployeeFailure } from "../../redux/auth/employeeSlice";

const EmployeeProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({});
  const {currentEmployee} = useSelector((state) => state.employee);


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateEmployeeStart());
      const res = await fetch(`/api/employee/update/${currentEmployee.restDetails._id}`, {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(updatedData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateEmployeeFailure(data));
        toast.error(data.message);
      }else{
        dispatch(updateEmployeeSuccess(data));
        toast.success(data.message);
      }
    }catch(err){
      dispatch(updateEmployeeFailure(e));
      toast.error("Something went wrong");
    };
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id] : e.target.value,
    })
  };

  
  const userName = currentEmployee.restDetails.employeeName;
  const firstTwoLetter = userName.slice(0,2);

  return (
  <div className="flex flex-col h-screen ">
     <h1 className='text-2xl font-semibold mt-20'>Employee Profile</h1>
     <h2 className='text-zinc-600'>Dashboard/Update-Profile</h2>
    <div className="flex flex-col justify-center items-center mt-3">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-50 md:flex gap-10 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 mt-10 max-h-full"
      >
        <div className='flex-col justify-center items-center gap-5'>
          <div className='w-40 h-40 border-4 border-zinc-300 shadow-md mb-3 ml-3'>
            <h1 className='py-12 px-8 text-5xl h-full text-zinc-100 font-medium bg-red-500 uppercase'>{firstTwoLetter}</h1>
          </div>
          <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-blue-800 bg-blue-200 rounded-lg bg-opacity-50'>{currentEmployee.restDetails._id}</span>
        </div>
        <div>
          <h1 className='text-xl font-medium text-gray-500 mb-3'>Personal Information</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:ml-10">
          {/* <!-- Username field --> */}
          <div className="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 text-base font-bold"
              for="username"
            >
              Username
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              type="text" id="employeeName"
              name="employeeName" placeholder="John Doe"
              onChange={handleChange} defaultValue={currentEmployee.restDetails.employeeName}         
            />
          </div>

          {/* <!-- Mobile field --> */}
          <div class="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 text-base font-bold"
              for="mobile"
            >
              Mobile
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              type="tel"
              id="employeePhone"
              name="employeePhone"
              placeholder="9876543210"
              onChange={handleChange}
              defaultValue={currentEmployee.restDetails.employeePhone}
         
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 text-base font-bold"
              for="email"
            >
              Email
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              onChange={handleChange}
              placeholder="john.doe@example.com"
              defaultValue={currentEmployee.restDetails.employeeEmail}
            />
          </div>

   
          <div class="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 text-base font-bold"
              for="height"
            >
              Role
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              type="text"
              id="employeeRole"
              name="employeeRole"
              onChange={handleChange}
              placeholder="Software developer"
              defaultValue={currentEmployee.restDetails.employeeRole}
            />
          </div>

          {/* <!-- Submit button --> */}
          <div className="flex gap-5">
              <Link to={'/dashboard/admin'}>
              <button
               className="bg-zinc-400 hover:scale-110 duration-200 hover:bg-zinc-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >Cancel</button>
              </Link>
              <button
               className="bg-green-700 hover:scale-110 duration-200 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
              >Update</button>
            </div>         
        </div>

        <h1 className='text-xl font-medium text-gray-500 mt-5 mb-3'>Change Password</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-10">
            <div class="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 whitespace-nowrap text-base font-bold"
              for="health-issues"
            >
              Change password
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              id="employeePassword"
              type='text'
              name="employeePassword"
              placeholder="Enter your password"
            ></input>
            </div>
            
            <div class="md:flex justify-end items-center gap-4">
            <label
              class="block text-zinc-600 whitespace-nowrap text-base font-bold"
              for="health-issues"
            >
              Confirm password
            </label>
            <input
              className="w-full bg-transparent outline-none px-2 py-1 border-b-2 border-b-gray-400 text-gray-900 focus:border-b-blue-900"
              id="employeePassword"
              type='text'
              name="employeePassword"
              onChange={handleChange}
              placeholder="Enter your password"
            ></input>
            </div>
            {/* <!-- Submit button --> */}
            <div className="flex gap-5">
            <Link to={'/dashboard/admin'}>
              <button
               className="bg-zinc-400 hover:scale-110 duration-200 hover:bg-zinc-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >Cancel</button>
              </Link>
              <button
               className="bg-green-700 hover:scale-110 duration-200 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
             >Update</button>
            </div>
        </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default EmployeeProfile