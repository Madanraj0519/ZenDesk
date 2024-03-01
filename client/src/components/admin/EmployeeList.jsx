import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import { MdEditSquare } from "react-icons/md";

const EmployeeList = () => {

  const itemsPerPage = 6;
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [defaultData, setDefaultData] = useState(undefined);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;

  const currentPageData = employeeData.slice(offset, offset + itemsPerPage);


  useEffect(() => {
    async function fetchEmployees() {
        const res = await fetch('/api/employee/');
        const data = await res.json();
        setEmployeeData(data.employees);
        // console.log(data.employees);
    };

    fetchEmployees();
  }, []);

  const handleShowUpdate = (id) => {
    setShowUpdate(true);
    const data = employeeData.filter((data) => data._id === id);
    setDefaultData(data[0]);
  }

  // console.log(defaultData);


  return (
    <>
    <div className="overflow-x-auto px-4 mt-20 h-screen w-full md:max-w-6xl">
      <div className='flex justify-end'>
        <button 
         className="bg-green-800 mt-5 mb-3 hover:scale-110 duration-200 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsShow(true)}>Add Employee</button>
      </div>
      <table className="table-auto w-full rounded-md">
        <thead>
          <tr className='bg-slate-800'>
            <th className="px-4 py-2 text-lg">Id</th>
            <th className="px-4 py-2 text-lg">Name</th>
            <th className="px-4 py-2 text-lg">Email</th>
            <th className="px-4 py-2 text-lg">Phone</th>
            <th className="px-4 py-2 text-lg">Role</th>
            <th className="px-4 py-2 text-lg">Created At</th>
            <th className="px-4 py-2 text-lg"></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, index) => (
            <tr key={index} className='bg-zinc-100'>
              <td className="border px-4 py-2 text-base">{row._id}</td>
              <td className="border px-4 py-2 text-base">{row.employeeName}</td>
              <td className="border px-4 py-2 text-base">{row.employeeEmail}</td>
              <td className="border px-4 py-2 text-base">{row.employeePhone}</td>
              <td className="border px-4 py-2 text-base">{row.employeeRole}</td>
              <td className="border px-4 py-2 text-base">{row.createdAt}</td>
              <td className="border px-4 py-2 text-base cursor-pointer" onClick={() => handleShowUpdate(row._id)}><MdEditSquare className='text-3xl text-green-700' /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
     <div className='pagination'>
     <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={Math.ceil(employeeData.length / itemsPerPage)}
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
            <AddEmployee setIsShow={setIsShow}/>
        )
    }

{
        showUpdate && (
          <EditEmployee 
             defaultData={defaultData} 
             setShowUpdate={setShowUpdate} />
        )
    }
   </>
  );
};

export default EmployeeList;
