import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../../redux/auth/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector( state => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value });
  };

  const handleSubmit = async(e) => {
    console.log(formData);
    e.preventDefault();  /* this will prevent refreshing the page when we submit the form*/ 

    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data));
      }else{
        navigate('/');
        dispatch(signInSuccess(data));
      }
    }catch(e){
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="absolute top-0 flex justify-center items-center bg-color h-full w-full">
          <div className="fixed md:3/4 lg:w-2/5 h-484 border border-gray-300 shadow-md p-6 bg-white px-12 mt-2">
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <h1 className='text-base font-medium font-poppins text-emerald-900'>Let us start with your work email</h1>
                <input
                type="email"
                placeholder="Enter your Mail"
                id='userEmail'
                onChange={handleChange}
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <input
                type="password"
                placeholder="Enter your password"
                id='userPassword'
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

export default SignIn