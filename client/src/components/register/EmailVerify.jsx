import React from 'react'
import gmail from "../../images/gmail.png";
import hotmail from "../../images/hotmail.png";
import yahoo from "../../images/yahoo.png";
import cloud from "../../images/cloud.png";

const EmailVerify = () => {
  return (
    <div className="absolute top-0 flex justify-center items-center bg-color h-full w-full">
    <div className="fixed md:3/4 lg:w-2/5 h-484 border border-gray-300 shadow-md p-6 bg-white px-12 mt-2">
      <h1 className='text-2xl pt-7 font-medium font-poppins text-emerald-900 text-center'>Great, now please verify your email</h1>
      <div className="mt-6">
          <h1 className='text-base font-normal text-center font-poppins text-emerald-900'>Once verified, you will be able to access wewe9373.zendesk.com and start your free trial.</h1>
          <div className='grid grid-cols-2 gap-10 mt-5'>
            <button className='flex items-center justify-center gap-2 border-2 border-emerald-900 p-1'>
                <img src={gmail} className='w-10 h-10' />
                <h2 className='text-lg text-emerald-900 font-normal'>Open Gmail</h2>
            </button>
            <button className='flex items-center justify-center gap-2 border-2 border-emerald-900 p-1'>
                <img src={hotmail} className='w-10 h-10' />
                <h2 className='text-lg text-emerald-900 font-normal'>Open Gmail</h2>
            </button>
            <button className='flex items-center justify-center gap-2 border-2 border-emerald-900 p-1'>
                <img src={yahoo} className='w-10 h-10' />
                <h2 className='text-lg text-emerald-900 font-normal'>Open Gmail</h2>
            </button>
            <button className='flex items-center justify-center gap-2 border-2 border-emerald-900 p-1'>
                <img src={cloud} className='w-10 h-10' />
                <h2 className='text-lg text-emerald-900 font-normal'>Open Gmail</h2>
            </button>
          </div>
              <h1 className='text-emerald-700 mt-2 text-center'>Did not receive an email? Check your spam folder or resend email.</h1>
      </div> 
    </div>
  </div>
  )
}

export default EmailVerify