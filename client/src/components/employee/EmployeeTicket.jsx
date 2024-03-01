import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { MdOutlineViewInAr } from "react-icons/md";
import ResolvedQuery from './ResolvedQuery';


const EmployeeTicket = () => {

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [ ticketData, setTicketData ] = useState([]);
  const [defaultData, setDefaultData ] = useState(undefined);
  const [isShow, setIsShow] = useState(false);

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

  console.log(defaultData);

  return (
    <>
    <div className="overflow-x-auto px-4 mt-20 h-screen">
      <table className="table-auto w-full rounded-md">
        <thead>
          <tr className='bg-slate-800'>
            <th className="px-4 py-2 text-lg">Id</th>
            <th className="px-4 py-2 text-lg">Email</th>
            <th className="px-4 py-2 text-lg">Phone</th>
            <th className="px-4 py-2 text-lg">Title</th>
            <th className="px-4 py-2 text-lg">Status</th>
            <th className="px-4 py-2 text-lg">AssignedBy</th>
            <th className="px-4 py-2 text-lg"></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, index) => (
            <tr key={index} className='bg-zinc-100'>
              <td className="border px-4 py-2 text-base">{row._id}</td>
              <td className="border px-4 py-2 text-base">{row.customerEmail}</td>
              <td className="border px-4 py-2 text-base">{row.customerPhone}</td>
              <td className="border px-4 py-2 text-base">{row.ticketTitle}</td>
              <td className="border px-4 py-2 text-base">{row.ticketStatus}</td>
              <td className="border px-4 py-2 text-base">{row.belongToAdmin.userName}</td>
              <td className="border px-4 py-2 text-base cursor-pointer" onClick={() => handleShowUpdate(row._id)}><MdOutlineViewInAr className='text-3xl text-green-700' /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
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