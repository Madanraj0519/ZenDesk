import React from 'react'

const SignIn = () => {
  return (
    <div className="absolute top-0 flex justify-center items-center bg-color h-full w-full">
          <div className="fixed md:3/4 lg:w-2/5 h-484 border border-gray-300 shadow-md p-6 bg-white px-12 mt-2">
         
            <div className="mt-6">
                <h1 className='text-base font-medium font-poppins text-emerald-900'>Let us start with your work email</h1>
                <input
                type="email"
                placeholder="Enter your Mail"
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <input
                type="email"
                placeholder="Enter your Mail"
                className="border mt-2 border-gray-300 px-4 py-2 w-full mb-4 outline-emerald-900"
                 />
                 <div className='flex justify-between items-start gap-4 bg-gray-100 p-4' >
                    <h1 className='text-emerald-700'>Use your work email to smoothly connect customer emails and existing apps, and also invite team members.</h1>
                 </div>
            </div>

            <div className='text-center w-full mt-4'>
              <button className='bg-emerald-900 w-full p-3 font-medium text-xl text-white'>Next</button>
              <p className='mt-2 text-emerald-700 flex gap-2 justify-end text-lg'>or Press <span className='font-medium text-emerald-900 flex'>Enter</span></p>
            </div>
           <h1 className='text-sm font-poppins text-emerald-700 mt-5'>By submitting my personal data, I consent to Zendesk collecting, 
            processing, and storing my information in accordance with the <span className='underline cursor-pointer'>Zendesk Privacy Notice</span>.</h1>
          </div>
        </div>
  )
}

export default SignIn