import React, { useState } from 'react';
import {BsEyeSlash, BsEye} from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { PiArrowElbowDownLeftBold } from "react-icons/pi";



const SignUp = () => {

    const [progress, setProgress] = useState(14.2);
    const [stepCount, setStepCount] = useState(1);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);
    const [stepFour, setStepFour] = useState(false);
    const [stepFive, setStepFive] = useState(false);
    const [stepSix, setStepSix] = useState(false);
    const [stepSeven, setStepSeven] = useState(false);


    const handleStepOne = (value) => {
        setStepOne(!stepOne);
        setStepTwo(!stepTwo);
        handleProgress(value);
    }
    
    const handleStepTwo = (value) => {
        setStepTwo(!stepTwo);
        setStepThree(!stepThree);
        handleProgress(value);
    }
    
    const handleStepThree = (value) => {
        setStepThree(!stepThree);
        setStepFour(!stepFour);
        handleProgress(value);
    }

    const handleStepFour = (value) => {
        setStepFour(!stepFour);
        setStepFive(!stepFive);
        handleProgress(value);
    }

    const handleStepFive = (value) => {
        setStepFive(!stepFive);
        setStepSix(!stepSix);
        handleProgress(value);
    }

    const handleStepSix = (value) => {
        setStepSix(!stepSix);
        setStepSeven(!stepSeven);
        handleProgress(value);
    }

    const handleProgress = (value) => {
        if(value){
            if(progress < 100 || stepCount < 9){
                setProgress((prev) => prev + 14.2)
                setStepCount((count) => count + 1)
            }
        }else{
            if(progress > 0 || stepCount > 0){
                setProgress((prev) => prev - 14.2)
                setStepCount((count) => count - 1)
            }
        }
    }


  return (

    <>
        <div className="absolute top-0 flex justify-center items-center bg-color h-full w-full">
          <div className="fixed md:3/4 lg:w-2/5 h-484 border border-gray-300 shadow-md p-6 bg-white px-12 mt-2">
            <div className='text-center'>
                <h4 className='text-emerald-700'>Step {stepCount} of 7</h4>
                <div className='progress-container mt-2'>
                    <div className='progress-bar'>
                        <div className='progress-bar-fill' style={{width : `${progress}%`}}></div>
                    </div>
                </div>
            </div>
            <h1 className='text-xl pt-7 font-medium font-poppins text-emerald-900'>Start your free Zendesk trial</h1>

            {/* step : 1 */}
           { stepOne &&
            <>
            <div className="mt-6">
                <h1 className='text-base font-medium font-poppins text-emerald-900'>Let us start with your work email</h1>
                <input
                type="email"
                placeholder="Enter your Mail"
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <div className='flex justify-between items-start gap-4 bg-gray-100 p-4' >
                    <IoIosInformationCircle className='text-3xl text-emerald-900' />
                    <h1 className='text-emerald-700'>Use your work email to smoothly connect customer emails and existing apps, and also invite team members.</h1>
                 </div>
            </div>

            <div className='text-center w-full mt-4'>
              <button className='bg-emerald-900 w-full p-3 font-medium text-xl text-white' onClick={() => handleStepOne(true)}>Next</button>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
            </>
           }

           {/* step : 2*/}
           {
            stepTwo &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>Great, what is your first name?</h1>
             <input
             type="text"
             placeholder="Enter your Name"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepOne(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white' onClick={() => handleStepTwo(true)}>Next</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
        </div>
           }

        {/* step : 3 */}
          {
            stepThree &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>Thanks, what is your phone number?</h1>
             <input
             type="text"
             placeholder="Enter your phone number"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepTwo(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white' onClick={() => handleStepThree(true)}>Next</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
         </div>
         }

           {/* step : 4 */}
           {
            stepFour &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>What is your job title?</h1>
             <input
             type="text"
             placeholder="Enter your job title"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepThree(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white' onClick={() => handleStepFour(true)}>Next</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
          </div>
         }


         {/* step : 5 */}
         {
            stepFive &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>What company do you work for?</h1>
             <input
             type="text"
             placeholder="Enter your company name"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepFour(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white' onClick={() =>  handleStepFive(true)}>Next</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
          </div>
         }

         {/* step : 6 */}
         {
            stepSix &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>And how many employees are there at your office</h1>
             <input
             type="text"
             placeholder="Enter your company details"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepFive(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white' onClick={() => handleStepSix(true)}>Next</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
             </div>
         }


          {/* step : 7 */}
          {
            stepSeven &&
             <div className="mt-6">
             <h1 className='text-base font-medium font-poppins text-emerald-900'>Lastly, create a password:</h1>
             <input
             type="password"
             placeholder="Create a password"
             className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
              />
             <div className='text-center w-full mt-4'>
               <div className='flex gap-5'>
                 <button className='text-emerald-900 w-full p-2 font-medium text-xl border-2 border-emerald-900' onClick={() => handleStepSix(false)}>Back</button>
                 <button className='bg-emerald-900 w-full p-2 font-medium text-xl text-white'>Complete the trail Signup</button>
               </div>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter<PiArrowElbowDownLeftBold /></span></p>
            </div>
            <h1 className='text-sm font-poppins text-emerald-700 mt-2'>By clicking “Complete trial sign-up” you agree to the Data <span className='underline'>Deletion Policy</span>, <span className='underline'>Main Services Agreement</span> and <span className='underline'>Privacy Policy</span>.</h1>
            </div>
         }

           <h1 className='text-sm font-poppins text-emerald-700 mt-5'>By submitting my personal data, I consent to Zendesk collecting, 
            processing, and storing my information in accordance with the <span className='underline cursor-pointer'>Zendesk Privacy Notice</span>.</h1>
          </div>
        </div>
    </>

        
  )
}

export default SignUp