import React, { useState } from 'react';
import {useDispatch, useSelector,} from "react-redux"
import {updateUserStart, updateUserSuccess, updateUserFailure,
        deleteUserStart, deleteUserSuccess, deleteUserFailure,
        signOut} from "../../redux/auth/userSlice";
import {Navigate, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = await currentUser;
    // console.log(user.restDetails);
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser.restDetails._id}`, {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data));
        toast.error(data.message);
        console.log(data.message);
      }
      dispatch(updateUserSuccess(data));
      toast.success(data.message);
    }catch(e){
      dispatch(updateUserFailure(e));
      toast.error("Something went wrong");
      console.log(e);
    };

    // console.log(currentUser);
  };

  const handleDeleteAccount = async() => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.restDetails._id}`, {
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure());
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/register');
      toast.error(data.message);
    }catch(err){
      dispatch(deleteUserFailure(err));
      toast.error("Something went wrong");
    }
  }

  const handleSignOut = async() => {
    try{
      await fetch('/api/auth/signout');
      // localStorage.removeItem('token');
      dispatch(signOut());
      toast.warning("Singed out")
    }catch(err){
      console.log(err);
    }
  };



  return (
    <div className="flex flex-col justify-center items-center h-screen mt-20">
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
              id="userName"
              name="userName"
              placeholder="John Doe"
              onChange={handleChange}
              defaultValue={currentUser.restDetails.userName}
            
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
              id="userPhone"
              name="userPhone"
              placeholder="9876543210"
              onChange={handleChange}
              defaultValue={currentUser.restDetails.userPhone}
         
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
              id="userEmail"
              name="userEmail"
              onChange={handleChange}
              placeholder="john.doe@example.com"
              defaultValue={currentUser.restDetails.userEmail}
            />
          </div>

   
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="height"
            >
              Job
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="userJob"
              name="userJob"
              onChange={handleChange}
              placeholder="Software developer"
              defaultValue={currentUser.restDetails.userJob}
            />
          </div>

    
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="weight"
            >
              Company
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="userCompany"
              name="userCompany"
              onChange={handleChange}
              placeholder="Teenofes"
              defaultValue={currentUser.restDetails.userCompany}
            />
          </div>

        
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="blood-group"
            >
                No of employees
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="userEmployees"
              name="userEmployees"
              onChange={handleChange}
              placeholder="24"
              defaultValue={currentUser.restDetails.userEmployees}
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
              id="userPassword"
              type='text'
              name="userPassword"
              onChange={handleChange}
              placeholder="Enter your password"
            ></input>
          </div>

        </div>
        {/* <!-- Submit button --> */}
        <div className="flex justify-center items-center">
          <button
            className="bg-green-800 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
      <div>
        <button onClick={handleDeleteAccount} className='cursor-pointer'>Delete account</button>
        <button onClick={handleSignOut} className='cursor-pointer'>Sign out</button>
      </div>
    </div>
  </div>
  )
}

export default Profile