import React, {useState} from 'react'
import {useDispatch, useSelector,} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEmployeeStart, updateEmployeeSuccess, 
         updateEmployeeFailure, employeeSignOut  } from "../../redux/auth/employeeSlice";

const EmployeeProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({});
  const {currentEmployee} = useSelector((state) => state.employee);

  // console.log("currentEmployee :", currentEmployee.restDetails);

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
        console.log(data.message);
      }
      dispatch(updateEmployeeSuccess(data));
      toast.success(data.message);
    }catch(err){
      dispatch(updateEmployeeFailure(e));
      toast.error("Something went wrong");
      console.log(e);
    };
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id] : e.target.value,
    })
  };

  const handleSignOut = async() => {
    try{
      await fetch('/api/employee/employee-signout');
      dispatch(employeeSignOut());
      toast.warning("Singed out")
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full"
      >
        <p className="text-gray-200 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
          Update Profile 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <!-- Username field --> */}
          <div className="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="username"
            >
              Username
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="employeeName"
              name="employeeName"
              placeholder="John Doe"
              onChange={handleChange}
              defaultValue={currentEmployee.restDetails.employeeName}
            
            />
          </div>

          {/* <!-- Mobile field --> */}
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="mobile"
            >
              Mobile
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="tel"
              id="employeePhone"
              name="employeePhone"
              placeholder="9876543210"
              onChange={handleChange}
              defaultValue={currentEmployee.restDetails.employeePhone}
         
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="email"
            >
              Email
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              onChange={handleChange}
              placeholder="john.doe@example.com"
              defaultValue={currentEmployee.restDetails.employeeEmail}
            />
          </div>

   
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="height"
            >
              Role
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="employeeRole"
              name="employeeRole"
              onChange={handleChange}
              placeholder="Software developer"
              defaultValue={currentEmployee.restDetails.employeeRole}
            />
          </div>
         
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="health-issues"
            >
              Change password
            </label>
            <input
              className="border-transparent border-2  focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
              id="employeePassword"
              type='text'
              name="employeePassword"
              onChange={handleChange}
              placeholder="Enter your password"
            ></input>
          </div>

        </div>
        {/* <!-- Submit button --> */}
        <div className="flex justify-center items-center">
          <button
            className="bg-green-700 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-green-800 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
      <div>
        {/* <button onClick={handleDeleteAccount} className='cursor-pointer'>Delete account</button> */}
        <button onClick={handleSignOut} className='cursor-pointer'>Sign out</button>
      </div>
    </div>
    </div>
  )
}

export default EmployeeProfile