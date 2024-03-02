import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineViewInAr } from "react-icons/md";
import AssignEmployee from './AssignEmployee';
import {useSelector} from "react-redux"

const TicketList = () => {

  const itemsPerPage = 9;
 
  const [ticketData, setTicketData] = useState([]);
  const [selectEmployee, setSelectEmployee] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [defaultData, setDefaultData] = useState(undefined);

  const { currentUser} = useSelector((state) => state.user);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;

  const currentPageData = ticketData.slice(offset, offset + itemsPerPage);


  useEffect(() => {

    async function fetchTickets() {
        const res = await fetch('/api/ticket/');
        const data = await res.json();
        setTicketData(data.tickets);
        // console.log(data);
    };
    fetchTickets();

  }, []);

  const handleShowUpdate = (id) => {
    setIsShow(true);
    const data = ticketData.filter((data) => data._id === id);
    setDefaultData(data[0]);
    // console.log(data[0]);
  }

  const handleDelete = async(id) => {
    try{
      const res = await fetch(`/api/ticket/delete/${id}`, {
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        // toast.error(data.message);
        console.log(data.message);
      }
      // toast.warning(data.message);
      console.log(data.message);
      setTimeout(() => { window.location.reload()}, 2000);
    }catch(err){
      // toast.error(err.message);
      console.log(err.message);
    }
  };

  console.log(defaultData);

  return (
    <>
    <div className="p-5 h-screen mt-20 w-full md:max-w-7xl">
     <h1 className='text-2xl font-semibold'>Ticket List</h1>
     <h2 className='text-zinc-600'>Dashboard/Tickets belongs to {currentUser.restDetails.userCompany}</h2>
      <div className='overflow-auto rounded-lg shadow-md'>
       <table className="w-full">
        <thead className='bg-slate-800 border-b-2 border-gray-700'>
          <tr>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Ticket Id</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Email</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Phone</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Title</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Status</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Assign</th>
            <th className="p-3 w-12 text-sm font-semibold text-center tracking-wide"></th>
            <th className="p-3 w-12 text-sm font-semibold text-center tracking-wide"></th>   
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {currentPageData.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-zinc-100" : "bg-zinc-200"}`}>
              <td className="p-2 text-sm whitespace-nowrap text-blue-700">
              <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-blue-800 bg-blue-200 rounded-lg bg-opacity-50'>{row._id}</span>
              </td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.customerEmail}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.customerPhone}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.ticketTitle}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{
                row.ticketStatus === "Resolved" ? ( 
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-green-800 bg-green-200 rounded-lg bg-opacity-50'>{row.ticketStatus}</span>
                ) : row.ticketStatus === "Rejected" ? (
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-red-800 bg-red-200 rounded-lg bg-opacity-50'>{row.ticketStatus}</span>
                ) : (
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-gray-900 bg-gray-200 rounded-lg bg-opacity-50'>{row.ticketStatus}</span>
                )
                }
              </td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">
                 <AssignEmployee ticketId={row._id} isAssigned={row.isAssigned} />
              </td>
              <td className="p-2 text-sm text-gray-900 cursor-pointer" 
              onClick={() => handleShowUpdate(row._id)}><MdOutlineViewInAr className='text-2xl text-green-700' /></td>
              <td className="p-2text-sm text-gray-900 cursor-pointer
              " onClick={() => handleDelete(row._id)}><MdDeleteForever className='text-2xl text-red-700' /></td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>
      
     <div className='pagination'>
     <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={Math.ceil(ticketData.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"paginationContainer"}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        activeClassName={"activePagination"}
      />
     </div>
    </div>


    {
      isShow && (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50  bg-opacity-90 flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <div className="relative lg:w-3/5 h-700 rounded-xl shadow-md p-8">
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
             </div>
            </div>
      </div>
     </div>
      )
    }
   </>
  );
};

export default TicketList;
