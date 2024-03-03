import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { MdOutlineViewInAr } from "react-icons/md";
import ResolvedQuery from './ResolvedQuery';
import {useSelector} from "react-redux"
import { IoMdInformationCircle } from "react-icons/io";

const EmployeeTicket = () => {

  const itemsPerPage = 8;
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [ ticketData, setTicketData ] = useState([]);
  const [defaultData, setDefaultData ] = useState(undefined);
  const [isShow, setIsShow] = useState(false);

  const {currentEmployee} = useSelector((state) => state.employee);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;

  const currentPageData = ticketData.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    async function fetchEmployees() {
        const res = await fetch('/api/ticket/getTickets/employee');
        const data = await res.json();
        setTicketData(data.tickets);
    };

    fetchEmployees();
  }, []);

  // console.log(ticketData);

  const handleShowUpdate = (id) => {
    setIsShow(true);
    const data = ticketData.filter((data) => data._id === id);
    setDefaultData(data[0]);
  };

  // console.log(defaultData);

  return (
    <>
    <div className="p-5 h-screen mt-20 w-full md:max-w-7xl">
    <div className='flex justify-between items-center'>
       <div>
         <h1 className='text-2xl font-semibold'>Ticket List</h1>
         <h2 className='text-zinc-600'>Dashboard/Tickets belongs to {currentEmployee.restDetails.userName}</h2>
      </div>
      <div className=' relative flex gap-2'>
        {
          showInfo && ( <p className='border-2 absolute right-7 top-2 border-zinc-200 px-4 p-2 w-72 bg-green-600 rounded-md opacity-100 
          text-zinc-100 bg-transparent'>This filed shows the tickets that belong to the {currentEmployee.restDetails.userName}, if it not there, 
          then <Link to={'/create-ticket'}><span className='underline cursor-pointer'>create</span></Link> a custom tickets with the company name (or) ask your admin to assign tickets to you</p>)
        }
        <IoMdInformationCircle className='text-2xl text-green-600 cursor-pointer' onClick={() => setShowInfo(!showInfo)} />
       </div>
    </div>
     <div className='overflow-auto rounded-lg shadow-md'>
       <table className="w-full">
        <thead className='bg-slate-800 border-b-2 border-gray-700'>
          <tr>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Ticket_Id</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Email</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Phone</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Title</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Status</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">AssignedBy</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide"></th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {
            currentPageData.length > 0 ? (
              currentPageData.map((row, index) => (
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
                  <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.belongToAdmin.userName}</td>
                  <td className="border px-2 py-2 text-base cursor-pointer" onClick={() => handleShowUpdate(row._id)}><MdOutlineViewInAr className='text-3xl text-green-700' /></td>
                </tr>
              ))
            ) : (
              <h1 className='whitespace-nowrap flex items-center justify-end text-lg text-red-500'>No tickets found to this user</h1>
            )
          }
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
        <ResolvedQuery setIsShow={setIsShow} defaultData={defaultData} />
      )
    }
    </>
  )
}

export default EmployeeTicket