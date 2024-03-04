import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AssignEmployee = ({ticketId, isAssigned}) => {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
        const res = await fetch('/api/employee/');
        const data = await res.json();
        setEmployeeData(data.employees);
    };
    fetchEmployees();
  }, []);

  const handleAssignEmployee = async(id) => {
    //  e.preventDefault();
     try{
      const res = await fetch(`/api/ticket/assign/${ticketId}/employee/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedTo : id})
      });
      const data = await res.json();
      if(data.success === false){
        toast.error(data.message);
      }else{
        toast.success(data.message);
        setTimeout(() => { window.location.reload()}, 2000);
      }
     }catch(err){
      toast.error("Something went wrong");
     };
  }

  const handleUnAssignEmployee = async(id) => {
    try{
      const res = await fetch(`/api/ticket/unassign/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedTo : id})
      });
      const data = await res.json();
      if(data.success === false){
        toast.error(data.message);
      }else{
        toast.success(data.message);
        setTimeout(() => { window.location.reload()}, 2000);
      }
    }catch(err){
      console.log("Something went wrong");
    }
  };

  // console.log(isAssigned);

  return (
    <div>
        {
          !isAssigned ?
          (
            <select
             className='p-1 text-xs font-medium uppercase tracking-wider
             text-red-800 bg-red-200 rounded-lg bg-opacity-50'
             onChange={(e) => { 
              handleAssignEmployee(e.target.value)
            }}>
                 <option>UnAssigned</option>
                 {
                  employeeData.map((employee) =>  (
                      <option className='bg-white' key={employee._id} value={employee._id}>{employee.employeeName}</option>
                  ))
                 }
            </select>
          ) : (
            <select
            className='p-1 text-xs font-medium uppercase tracking-wider
            text-green-800 bg-green-200 rounded-lg bg-opacity-50'
             onChange={(e) => { 
              handleUnAssignEmployee(e.target.value);
            }}>
                 <option >Assigned</option>
                 <option className='bg-white' value={ticketId}>UnAssign</option>
            </select>
          )
        }
    </div>
  )
}

export default AssignEmployee