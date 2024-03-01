import React, {useState, useEffect} from 'react'

const AssignEmployee = ({ticketId, isAssigned}) => {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
        const res = await fetch('/api/employee/');
        const data = await res.json();
        setEmployeeData(data.employees);
        // console.log(data.employees);
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
        console.log(data.message);
      }
      console.log(data);
      setTimeout(() => { window.location.reload()}, 2000);
     }catch(err){
      console.log(data);
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
        console.log(data.message);
      }
      console.log(data);
      setTimeout(() => { window.location.reload()}, 2000);

    }catch(err){
      console.log(err);
    }
  };

  // console.log(isAssigned);

  return (
    <div>
        {
          !isAssigned ?
          (
            <select
             className='bg-zinc-100'
             onChange={(e) => { 
              handleAssignEmployee(e.target.value)
            }}>
                 <option value="Low">UnAssigned</option>
                 {
                  employeeData.map((employee) =>  (
                      <option key={employee._id} value={employee._id}>{employee.employeeName}</option>
                  ))
                 }
            </select>
          ) : (
            <select
            className='bg-zinc-100'
             onChange={(e) => { 
              handleUnAssignEmployee(e.target.value);
            }}>
                 <option>Assigned</option>
                 <option value={ticketId}>UnAssign</option>
            </select>
          )
        }
    </div>
  )
}

export default AssignEmployee