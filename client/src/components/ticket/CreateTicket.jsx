import React, { useEffect, useState } from 'react';
import ticket from "../../images/ticket-logo.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTicket = () => {

    const [formData, setFormData] = useState({});
    const [adminData, setAdminData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        async function fetchAdmins(){
            const res = await fetch(`/api/auth/`);
            const data = await res.json();
            setAdminData(data.users);
        };
        fetchAdmins();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/ticket/create/${selectedValue}`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success === false) {
            toast.error(data.message);
            }else{
              toast.success(data.message);
            }
          }catch(err){
            toast.error("Something went wrong");
          }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id] : e.target.value,
        });
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-5xl mx-auto">
     <div className="flex justify-center items-center h-700 bg-slate-200 rounded-xl shadow-md p-8 w-full">
      <div className='md:flex justify-center w-full rounded-md'>
        <div className=' flex-col justify-center items-center bg-yellow-500 shadow-md shadow-gray-700 rounded-s px-8 pt-6 pb-8 mb-4 max-h-full md:w-96'>
          <img src={ticket} className='mt-10' />
          <p className="text-gray-200 font-bold text-xl md:text-2xl mb-3 mt-4 lg:mt-0 flex justify-center">
            Create Tickets
          </p>  
          <p className='text-gray-200 text-sm text-center mx-5'>Comment down your querys according to your Products</p>
        </div>
        <form
        onSubmit={handleSubmit}
        className="bg-zinc-50 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full w-full "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <!-- Username field --> */}
          <div className="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="username"
            >
              Select Company
            </label>
            <select value={selectedValue} className='border-transparent border-2 w-full focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 
                py-1 rounded-lg focus:outline-none focus:shadow-outline' onChange={(e) => setSelectedValue(e.target.value)}>
                 <option>Select Product</option>
                 {
                    adminData.map((admin) => (
                        <option value={admin._id}>{admin.userCompany}</option>
                    ))
                 }
            </select>
          </div>

          <div className="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="username"
            >
              Username
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="customerName"
              name="customerName"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          {/* <!-- Mobile field --> */}
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="mobile"
            >
              Mobile
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="tel"
              id="customerPhone"
              name="customerPhone"
              placeholder="9876543210"
              onChange={handleChange}
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="email"
            >
              Email
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              id="customerEmail"
              name="customerEmail"
              onChange={handleChange}
              placeholder="john.doe@example.com"
            />
          </div>

   
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="height"
            >
              Title
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="ticketTitle"
              name="ticketTitle"
              onChange={handleChange}
              placeholder="Enter your query"
            />
          </div>
         
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="health-issues"
            >
              Description
            </label>
            <textarea
              className="border-transparent border-2  focus:border-green-500 bg-zinc-200 text-gray-900 border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
              id="ticketDescription"
              type='text'
              name="ticketDescription"
              onChange={handleChange}
              placeholder="Describe briefly"
            ></textarea>
          </div>

        </div>
        {/* <!-- Submit button --> */}
        <div className="flex justify-center items-center">
          <button
            className="bg-green-700 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-green-800 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default CreateTicket