import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import { MdEditSquare } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

const EmployeeList = () => {

  const itemsPerPage = 7;
  const [showInfo, setShowInfo] = useState(false);
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
    };

    fetchEmployees();
  }, []);

  const handleShowUpdate = (id) => {
    setShowUpdate(true);
    const data = employeeData.filter((data) => data._id === id);
    setDefaultData(data[0]);
  }


  return (
    <>
  <div className="p-5 h-screen mt-16 w-full md:max-w-7xl">
    <div className='flex justify-between items-center'>
       <div>
         <h1 className='text-2xl font-semibold'>Employee List</h1>
         <h2 className='text-zinc-600'>Dashboard/Add-Employee</h2>
      </div>
      <div className=' relative flex gap-2'>
        {
          showInfo && ( <p className='border-2 absolute right-7 top-2 border-zinc-200 px-4 p-2 w-64 bg-green-600 rounded-md opacity-100 
          text-zinc-100'>This filed show the employee lists, If it has a no employees then add new employees</p>)
        }
        <IoMdInformationCircle className='text-2xl text-green-600 cursor-pointer' onClick={() => setShowInfo(!showInfo)} />
       </div>
    </div>
      <div className='flex justify-end'>
        <button 
         className="bg-green-800 mt-2 mb-2 hover:scale-110 duration-200 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsShow(true)}>Add Employee</button>
      </div>
    <div className='overflow-auto rounded-lg shadow-md'>
      <table className="w-full">
        <thead className='bg-slate-800 border-b-2 border-gray-700'>
          <tr>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide ">Employee_Id</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide ">Name</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Email</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Phone</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Role</th>
            <th className="p-3 w-24  text-sm font-semibold text-center tracking-wide ">Created At</th>
            <th className="p-3 w-24 text-sm font-semibold text-center tracking-wide "></th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
         {
          currentPageData.length > 0 ? 
            (currentPageData.map((row, index) => (
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
            ))
          ) : (
            <h1 className='whitespace-nowrap flex items-center justify-end text-lg text-red-500'>You Need to add your Employees</h1>
          )
         }
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
