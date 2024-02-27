import React from 'react'

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-20">
    <div className="flex justify-center items-center">
      <form
        // onSubmit={handleSubmit}
        className="bg-slate-800 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full"
      >
        <p className="text-gray-200 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
          Update Profile 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <!-- Username field --> */}
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="username"
            >
              Username
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          {/* <!-- Mobile field --> */}
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="mobile"
            >
              Mobile
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="tel"
              id="mobile"
              name="mobile"
             
              placeholder="9876543210"
              required
            />
          </div>

          {/* <!-- Email field --> */}
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="email"
            >
              Email
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
         
              placeholder="john.doe@example.com"
              required
            />
          </div>

   
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="height"
            >
              Job
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="height"
              name="height"
         
              placeholder="Software developer"
            />
          </div>

    
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="weight"
            >
              Company
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="weight"
              name="weight"
          
              placeholder="Teenofes"
            />
          </div>

        
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="blood-group"
            >
                No of employees
            </label>
            <input
              className="border-transparent border-2 w-full focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              id="bloodGroup"
              name="bloodGroup"
        
              placeholder="24"
            />
          </div>

         
          <div class="col-span-1">
            <label
              class="block text-gray-200 text-sm font-bold mb-3"
              for="health-issues"
            >
              Change password
            </label>
            <input
              className="border-transparent border-2  focus:border-green-500 bg-slate-700 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
              id="healthIssues"
              type='text'
              name="healthIssues"
              placeholder="Enter your password"
            ></input>
          </div>

        </div>
        {/* <!-- Submit button --> */}
        <div className="flex justify-center items-center">
          <button
            className="bg-green-500 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-green-400 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Profile