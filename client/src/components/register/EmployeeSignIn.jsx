import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { signInEmployeeStart, signInEmployeeSuccess, signInEmployeeFailure} from "../../redux/auth/employeeSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeSignIn = () => {

    const [eyeOpen, setEyeOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentEmployee } = useSelector((state) => state.employee);

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
            if(data.success === false){
                dispatch(signInEmployeeFailure(data));
                toast.error(data.message);
            }else{
                navigate('/dashboard/employee/ticket');
                dispatch(signInEmployeeSuccess(data));
                toast.success(data.message);
              }
        }catch(err){
            dispatch(signInFailure(err));
            toast.error("Something went wrong");
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
                 <div className='flex relative'>
                    <input
                    type={eyeOpen ? "text" : "password"}
                    placeholder="Create a password"
                    id='employeePassword'
                    onChange={handleChange}
                    className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                    />
                    <div
                      onClick={() => setEyeOpen(!eyeOpen)}
                      className="absolute right-0 mr-3 cursor-pointer text-zinc-500 text-2xl mt-4">
                        {eyeOpen ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </div>
                 </div>
                 <div className='flex justify-between items-start gap-4 bg-gray-100 p-4' >
                    <h1 className='text-emerald-700'>Use your work email to smoothly connect customer emails and existing apps, and also invite team members.</h1>
                 </div>
            </div>

            <div className='text-center w-full mt-4'>
              <button className='bg-emerald-900 w-full p-3 font-medium text-xl text-white' type='submit'>Next</button>
            </div>
        </form>
           <h1 className='text-sm font-poppins text-emerald-700 mt-5'>By submitting my personal data, I consent to Zendesk collecting, 
            processing, and storing my information in accordance with the <span className='underline cursor-pointer'>Zendesk Privacy Notice</span>.</h1>
      </div>
    </div>
  )
}

export default EmployeeSignIn;