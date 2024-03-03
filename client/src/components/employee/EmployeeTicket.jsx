import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { MdOutlineViewInAr } from "react-icons/md";
import ResolvedQuery from './ResolvedQuery';
import {useSelector} from "react-redux"


const EmployeeTicket = () => {

  const itemsPerPage = 8;
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
     <h1 className='text-2xl font-semibold'>Ticket List</h1>
      <h2 className='text-zinc-600'>Dashboard/Tickets Assigned to {currentEmployee.restDetails.employeeName}</h2>
     <div className='overflow-auto rounded-lg shadow-md'>
       <table className="w-full">
        <thead className='bg-slate-800 border-b-2 border-gray-700'>
          <tr>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Id</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Email</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Phone</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Title</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">Status</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide">AssignedBy</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide"></th>
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
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.belongToAdmin.userName}</td>
              <td className="border px-2 py-2 text-base cursor-pointer" onClick={() => handleShowUpdate(row._id)}><MdOutlineViewInAr className='text-3xl text-green-700' /></td>
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
        <ResolvedQuery setIsShow={setIsShow} defaultData={defaultData} />
      )
    }
    </>
  )
}

export default EmployeeTicket