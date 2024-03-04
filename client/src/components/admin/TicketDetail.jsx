import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TicketDetail = ({defaultData, setIsShow}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50  bg-opacity-90 flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <div className="relative lg:w-3/5 h-700 rounded-xl shadow-md p-8 overflow-y-scroll md:overflow-y-hidden">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={() => setIsShow(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
        <div className='md:flex justify-between gap-5'>
          <form className="bg-zinc-50 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full">
             <p className="text-gray-900 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
               Ticket Detail
             </p>
             <div className="grid grid-cols-1 gap-6">

          <div className='md:flex justify-between items-center gap-3'>
            <div>
            <span className='p-1.5 text-xs font-medium uppercase tracking-wider
             text-blue-800 bg-blue-200 rounded-lg bg-opacity-50'>{defaultData._id}</span>
            </div>
            <div className='p-1.5 text-xs font-medium uppercase tracking-wider
             text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>Created At : {defaultData.createdAt} </div>
          </div>

          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="health-issues"
            >
              Status : 
            </label>
            <h2 className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50
             ${ defaultData.ticketStatus === "Resolved" ? "text-green-800 bg-green-200"
            : defaultData.ticketStatus === "Rejected" ? "text-red-800 bg-red-200" : "text-gray-800 bg-gray-200"}`}
              >{defaultData.ticketStatus}</h2>
          </div>

          {/* <!-- Username field --> */}
          <div className="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="username"
            >
              Username :
            </label>
            <input
              className="w-full rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              type="text"
              id="employeeName"
              name="employeeName"
              placeholder="John Doe"
              defaultValue={defaultData.customerName}
              disabled
            />
          </div>

          {/* <!-- Mobile field --> */}
          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="mobile"
            >
              Mobile : 
            </label>
            <input
              className="w-full rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              type="tel"
              id="employeePhone"
              name="employeePhone"
              placeholder="9876543210"
              disabled
              defaultValue={defaultData.customerPhone}
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="email"
            >
              Email : 
            </label>
            <input
              className="w-full  rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              defaultValue={defaultData.customerEmail}
              placeholder="john.doe@example.com"
              disabled
            />
          </div>
         
          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="health-issues"
            >
              Ticket Title : 
            </label>
            <input
              className="w-full rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              id="employeePassword"
              type='text'
              name="employeePassword"
              defaultValue={defaultData.ticketTitle}
              placeholder="Enter your password"
              disabled
            ></input>
          </div>

          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="health-issues"
            >
              Ticket Description : 
            </label>
            <p className='w-full rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900'>{defaultData.ticketDescription}</p>
          </div>

             </div>
          </form>
          <div>

           {
            defaultData.isAssigned && (
              <form className="bg-zinc-50 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full">
             <p className="text-gray-900 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
                  Assigned To</p>
           <div className="grid grid-cols-1 gap-6">

          <div className='md:flex justify-between items-center gap-2'>
            <div>
            <span className='p-1.5 text-xs font-medium uppercase tracking-wider
             text-blue-800 bg-blue-200 rounded-lg bg-opacity-50'>{defaultData.assignedTo._id}</span>
            </div>
          </div>
            {/* <!-- Username field --> */}
          <div className="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="username"
            >
              Username :
            </label>
            <input
              className="w-full rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              type="text"
              id="employeeName"
              name="employeeName"
              placeholder="John Doe"
              defaultValue={defaultData.assignedTo.employeeName}
              disabled
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="md:flex justify-end items-center gap-2">
            <label
              class="block text-gray-700 text-lg whitespace-nowrap font-bold"
              for="email"
            >
              Email : 
            </label>
            <input
              className="w-full  rounded-md outline-none px-2 py-1 border-b-2 text-base border-white text-gray-900"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              defaultValue={defaultData.assignedTo.employeeEmail}
              placeholder="john.doe@example.com"
              disabled
            />
          </div>

        </div>
          </form>
            )
           }
          </div>
        </div>
      </div>
      </div>
  )
}

export default TicketDetail