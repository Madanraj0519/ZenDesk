import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import { MdEditSquare } from "react-icons/md";

const EmployeeList = () => {

  const itemsPerPage = 7;
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
    <div className="p-5 h-screen mt-16 w-full md:max-w-7xl">
      <h1>Employee List</h1>
      <div className='flex justify-end'>
        <button 
         className="bg-green-800 mt-5 mb-3 hover:scale-110 duration-200 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsShow(true)}>Add Employee</button>
      </div>
    <div className='overflow-auto rounded-lg shadow-md'>
      <table className="w-full">
        <thead className='bg-slate-800 border-b-2 border-gray-700'>
          <tr>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide ">Id</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide ">Name</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Email</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Phone</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Role</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Created At</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide "></th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {currentPageData.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-zinc-100" : "bg-zinc-200"}`}>
              <td className="p-2 text-sm whitespace-nowrap text-blue-700">
              <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                  text-blue-800 bg-blue-200 rounded-lg bg-opacity-50'>{row._id}</span>
              </td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.employeeName}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.employeeEmail}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.employeePhone}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">{row.employeeRole}</td>
              <td className="p-2 text-sm whitespace-nowrap text-gray-900">
                <span className='p-1.5 text-xs font-medium uppercase tracking-wider
                text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>{row.createdAt}</span>
              </td>
              <td className="p-2 text-sm text-gray-900 cursor-pointer" onClick={() => handleShowUpdate(row._id)}><MdEditSquare className='text-3xl text-green-700' /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
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
