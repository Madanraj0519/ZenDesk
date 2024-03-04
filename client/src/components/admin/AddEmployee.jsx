import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = ({setIsShow}) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id] : e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await fetch('/api/employee/create', {
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
          setTimeout(() => {window.location.reload()}, 2000);
        }
      }catch(err){
        toast.error("Something went wrong");
      }
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50  bg-opacity-90 flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <div className="relative lg:w-3/5 h-700 bg-slate-300 rounded-xl shadow-md p-8">
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
            <form
        onSubmit={handleSubmit}
        className="bg-zinc-50 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full"
      >
        <p className="text-gray-900 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
          Add Employee
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <!-- Username field --> */}
          <div className="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="username"
            >
              Username
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="employeeName"
              name="employeeName"
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
              className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="tel"
              id="employeePhone"
              name="employeePhone"
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
              className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              onChange={handleChange}
              placeholder="john.doe@example.com"
            />
          </div>

   
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="height"
            >
              Role
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="employeeRole"
              name="employeeRole"
              onChange={handleChange}
              placeholder="Software developer"
            />
          </div>
         
          <div class="col-span-1">
            <label
              class="block text-zinc-600 text-sm font-bold mb-3"
              for="health-issues"
            >
              create password
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              id="employeePassword"
              type='text'
              name="employeePassword"
              onChange={handleChange}
              placeholder="Enter your password"
            ></input>
          </div>

        </div>
        {/* <!-- Submit button --> */}
        <div className="flex justify-end items-center">
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
  )
}

export default AddEmployee