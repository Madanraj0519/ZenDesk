import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInEmployeeStart, signInEmployeeSuccess, signInEmployeeFailure} from "../../redux/auth/employeeSlice"

const EmployeeSignIn = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentEmployee } = useSelector((state) => state.employee);

    // console.log(currentEmployee);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            dispatch(signInEmployeeStart());
            const res = await fetch('/api/employee/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
            const data = await res.json();
            // console.log(data);
            if(data.success === false){
                dispatch(signInEmployeeFailure(data));
                // toast.error(data.message);
                console.log(data.message);
            }else{
                navigate('/dashboard/employee/profile');
                dispatch(signInEmployeeSuccess(data));
                // toast.success(data.message);
              }
        }catch(err){
            dispatch(signInFailure(err));
            // toast.error("Something went wrong");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    };

  return (
    <div className="absolute top-0 flex justify-center items-center bg-color h-full w-full">
          <div className="fixed md:3/4 lg:w-2/5 h-484 border border-gray-300 shadow-md p-6 bg-white px-12 mt-2">
        <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <h1 className='text-base font-medium font-poppins text-emerald-900'>Employee Login</h1>
                <input
                type="email"
                placeholder="Enter your Mail"
                id='employeeEmail'
                onChange={handleChange}
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <input
                type="password"
                placeholder="Enter your password"
                id='employeePassword'
                onChange={handleChange}
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <div className='flex justify-between items-start gap-4 bg-gray-100 p-4' >
                    <h1 className='text-emerald-700'>Use your work email to smoothly connect customer emails and existing apps, and also invite team members.</h1>
                 </div>
            </div>

            <div className='text-center w-full mt-4'>
              <button className='bg-emerald-900 w-full p-3 font-medium text-xl text-white' type='submit'>Next</button>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter</span></p>
            </div>
        </form>
           <h1 className='text-sm font-poppins text-emerald-700 mt-5'>By submitting my personal data, I consent to Zendesk collecting, 
            processing, and storing my information in accordance with the <span className='underline cursor-pointer'>Zendesk Privacy Notice</span>.</h1>
      </div>
    </div>
  )
}

export default EmployeeSignIn;